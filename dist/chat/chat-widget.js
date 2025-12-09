console.log("🔥 chat-widget.js: script executing…");

document.addEventListener("readystatechange", () => {
  console.log("🔥 readystatechange:", document.readyState);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOMContentLoaded FIRED");
});

(function () {

  // ----------------------------
  // QUICK HELPERS
  // ----------------------------
  const qs  = (s, sc) => (sc || document).querySelector(s);
  const qsa = (s, sc) => (sc || document).querySelectorAll(s);

  let sessionId = null;
  let sessionRef = null;
  let unsubMessages = null;

  // ⭐ GLOBAL STORE FOR PANEL ELEMENT
  let chatPanelEl = null;

  function waitForFirebase() {
    return new Promise((resolve) => {
      const check = () => {
        if (window.firebase && window.firebase.apps && window.firebase.apps.length > 0) {
          console.log("🔥 Firebase is ready");
          resolve();
        } else {
          console.warn("⏳ Waiting for Firebase...");
          setTimeout(check, 50);
        }
      };
      check();
    });
  }

  // =============================================================
  // GLOBAL UNREAD WATCHER — FIXED WITH RETRY LOOP
  // =============================================================
  function watchUnread() {
    if (!sessionRef) {
      console.log("❌ watchUnread aborted: no sessionRef");
      return;
    }

    console.log("🔵 watchUnread starting…");

    let attempts = 0;
    const maxAttempts = 40; // retry for 2 seconds

    function tryAttach() {
      const badge = qs('[data-chat="unread-badge"]');

      console.log("🔍 Trying to attach unread watcher → badge =", badge);

      if (!badge) {
        attempts++;
        if (attempts < maxAttempts) {
          return setTimeout(tryAttach, 50);
        } else {
          console.error("❌ watchUnread failed: badge never appeared in DOM");
          return;
        }
      }

      console.log("✅ Badge found! Attaching unread snapshot listener…");

      sessionRef.onSnapshot((snap) => {
        const data = snap.data();
        console.log("📡 Session snapshot:", data);

        if (!data) return;

        const unread = data.unreadByUser || 0;
        console.log("📨 unreadByUser =", unread);

        if (unread > 0 && chatPanelEl && chatPanelEl.style.display !== "block") {
          console.log("👁 Showing badge!");
          badge.textContent = unread;
          badge.style.display = "inline-block";
        } else {
          console.log("🙈 Hiding badge");
          badge.style.display = "none";
        }
      });
    }

    tryAttach();
  }
  window._roosWatchUnread = watchUnread;


  // =============================================================
  // Load or create chat session — auto starts unread watcher
  // =============================================================
  async function initChatSession() {
    console.log("🔥 initChatSession() called");

    sessionId = localStorage.getItem("roosChatSession");

    // 1. Try restoring
    if (sessionId) {
      const sessionDocRef = window._chatDB.collection("chat_sessions").doc(sessionId);
      const snap = await sessionDocRef.get();

      if (snap.exists) {
        console.log("🔥 Restored existing session:", sessionId);
        sessionRef = sessionDocRef;

        listenForMessages();

        // ⭐ ALWAYS start unread watcher after restore
        setTimeout(() => window._roosWatchUnread(), 300);
        return;
      }

      console.warn("⚠️ Stored session invalid — removing");
      localStorage.removeItem("roosChatSession");
    }

    // 2. Create brand new session
    const newRef = await window._chatDB.collection("chat_sessions").add({
      userId: window._chatAuth.currentUser?.uid || null,
      startedAt: firebase.firestore.FieldValue.serverTimestamp(),
      isClosed: false,
      assignedTo: null,
      unreadByUser: 0,
      unreadByManager: 1,
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    console.log("🔥 Created new session:", newRef.id);

    sessionId = newRef.id;
    sessionRef = newRef;
    localStorage.setItem("roosChatSession", sessionId);

    listenForMessages();

    // ⭐ ALWAYS start unread watcher after new session
    setTimeout(() => window._roosWatchUnread(), 300);
  }

  window._roosInitChatSession = initChatSession;


  // =============================================================
  // Real-time message listener
  // =============================================================
  function listenForMessages() {
    console.log("🔥 Listening for messages...");

    const msgs = sessionRef.collection("messages").orderBy("timestamp");

    msgs.onSnapshot((snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          const msg = change.doc.data();
          renderMessage(msg);

          if (
            msg.senderType === "manager" &&
            chatPanelEl &&
            chatPanelEl.style.display !== "block"
          ) {
            sessionRef.update({
              unreadByUser: firebase.firestore.FieldValue.increment(1)
            }).catch(err => console.error("Unread increment failed:", err));
          }
        }
      });
    });
  }

  // =============================================================
  // Render message bubble
  // =============================================================
  function renderMessage(msg) {
    const list = qs('[data-chat="messages"]');
    if (!list) return;

    const bubble = document.createElement("div");
    bubble.setAttribute(
      "data-chat",
      msg.senderType === "user" ? "bubble-user" : "bubble-manager"
    );

    const text = document.createElement("div");
    text.textContent = msg.text;
    bubble.appendChild(text);

    if (msg.timestamp) {
      const t = document.createElement("span");
      t.setAttribute("data-chat", "timestamp");
      t.textContent = new Date(msg.timestamp.toDate()).toLocaleTimeString();
      bubble.appendChild(t);
    }

    list.appendChild(bubble);
    list.scrollTop = list.scrollHeight;
  }

  // =============================================================
  // Send message
  // =============================================================
  async function sendMessage(text) {
    console.log("🔥 Sending message:", text);

    await sessionRef.collection("messages").add({
      senderType: "user",
      senderId: window._chatAuth.currentUser?.uid || "anon",
      text,
      attachments: [],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    await sessionRef.update({
      unreadByManager: firebase.firestore.FieldValue.increment(1),
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }


  // =============================================================
  // UI INIT
  // =============================================================
  function initUI() {
    console.log("🔥 initUI() called");

    const widget = qs('[data-chat="widget"]');
    const toggleBtn = qs('[data-chat="toggle"]');
    const panel = qs('[data-chat="panel"]');
    const input = qs('[data-chat="input"]');
    const sendBtn = qs('[data-chat="send"]');

    if (!widget || !toggleBtn || !panel || !input || !sendBtn) {
      console.warn("⚠️ Chat UI elements missing — check HTML structure.");
      return;
    }

    chatPanelEl = panel;

    let chatInitialized = false;

    toggleBtn.addEventListener("click", async () => {
      const isOpen = panel.style.display === "block";

      if (!chatInitialized) {
        await initChatSession();
        chatInitialized = true;
      }

      panel.style.display = isOpen ? "none" : "block";

      if (!isOpen) {
        sessionRef.update({ unreadByUser: 0 })
          .catch(err => console.error("Unread reset failed:", err));
      }
    });

    sendBtn.addEventListener("click", () => {
      if (input.value.trim()) {
        sendMessage(input.value.trim());
        input.value = "";
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        sendMessage(input.value.trim());
        input.value = "";
      }
    });
  }


  // =============================================================
  // STARTUP
  // =============================================================
  async function startChatWidget() {
    console.log("🔥 Chat Widget INIT");

    const db = window.firebase.firestore();
    const auth = window.firebase.auth();
    const storage = window.firebase.storage();

    window._chatDB = db;
    window._chatAuth = auth;
    window._chatStorage = storage;

    initUI();
  }

  async function bootChatWidget() {
    console.log("🔥 bootChatWidget called");
    await waitForFirebase();
    await startChatWidget();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootChatWidget);
  } else {
    bootChatWidget();
  }

  //
  // TEMPORARY MANAGER MESSAGE TEST TOOL
  //
  window.sendManagerTestMessage = async function (sessionId, text = "Hello from manager") {
    const ref = window._chatDB.collection("chat_sessions").doc(sessionId);

    await ref.collection("messages").add({
      senderType: "manager",
      senderId: "test-manager",
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      attachments: []
    });

    await ref.update({
      unreadByUser: firebase.firestore.FieldValue.increment(1),
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    console.log("🔥 Manager test message sent to:", sessionId);
  };

})();
