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


  // ----------------------------
  // Load or create chat session
  // ----------------------------
async function initChatSession() {
  console.log("🔥 initChatSession() called");

  sessionId = localStorage.getItem("roosChatSession");

  // --------------------------------------------
  // 1. If we have a stored sessionId, validate it
  // --------------------------------------------
  if (sessionId) {
    console.log("🔥 Attempting to restore session:", sessionId);

    const sessionDocRef = window._chatDB.collection("chat_sessions").doc(sessionId);
    const snap = await sessionDocRef.get();

    if (snap.exists) {
      console.log("🔥 Valid session restored:", sessionId, snap.data());
      sessionRef = sessionDocRef;
      listenForMessages();
      return;
    }

    // Session is invalid → remove and fall through to "create new"
    console.warn("⚠️ Invalid sessionId in localStorage. Removing and creating a new one.");
    localStorage.removeItem("roosChatSession");
  }

  // --------------------------------------------
  // 2. Create a brand NEW session safely
  // --------------------------------------------
  try {
    const newRef = await window._chatDB.collection("chat_sessions").add({
      userId: window._chatAuth.currentUser?.uid || null,
      startedAt: firebase.firestore.FieldValue.serverTimestamp(),
      isClosed: false,
      assignedTo: null,
      unreadByUser: 0,
      unreadByManager: 1,
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    console.log("🔥 Created new chat session:", newRef.id);

    sessionId = newRef.id;
    sessionRef = newRef;

    localStorage.setItem("roosChatSession", sessionId);

    listenForMessages();
  } catch (err) {
    console.error("🔥 ERROR creating new session:", err);
  }
}




  // ----------------------------
  // Real-time message listener
  // ----------------------------
function listenForMessages() {
  console.log("🔥 Listening for messages...");

  const msgs = sessionRef.collection("messages").orderBy("timestamp");

  msgs.onSnapshot((snap) => {
    snap.docChanges().forEach((change) => {
      if (change.type === "added") {
        const msg = change.doc.data();
        renderMessage(msg);

        // If manager sent the message and panel is closed → increment unreadByUser
        if (msg.senderType === "manager" && panel.style.display !== "block") {
          sessionRef.update({
            unreadByUser: firebase.firestore.FieldValue.increment(1)
          }).catch(err => console.error("Unread increment failed:", err));
        }
      }
    });
  });
}



  // ----------------------------
  // Render message bubble
  // ----------------------------
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


  // ----------------------------
  // Send message
  // ----------------------------
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




  // ----------------------------
  // UI bindings
  // ----------------------------
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

  let chatInitialized = false;

  toggleBtn.addEventListener("click", async () => {
    const isOpen = panel.style.display === "block";

    // FIRST TIME CHAT IS OPENED → initialize session
    if (!chatInitialized) {
      await initChatSession();
      chatInitialized = true;
    }

    // Toggle panel
    panel.style.display = isOpen ? "none" : "block";

    if (!isOpen) {
      // reset unread
      sessionRef.update({ unreadByUser: 0 })
        .catch(err => console.error("Unread reset failed:", err));
    }

    // 🔵 Live unread counter (user side)
    function watchUnread() {
      if (!sessionRef) return;

      sessionRef.onSnapshot((snap) => {
        const data = snap.data();
        if (!data) return;

        const badge = qs('[data-chat="unread-badge"]');
        if (!badge) return;

        const unread = data.unreadByUser || 0;

        if (unread > 0 && panel.style.display !== "block") {
          badge.textContent = unread;
          badge.style.display = "inline-block";
        } else {
          badge.style.display = "none";
        }
      });
    }

    watchUnread();


  });

  // Sending a message
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





  // ----------------------------
  // Initialize everything
  // ----------------------------
  async function startChatWidget() {
    console.log("🔥 Chat Widget INIT");

      // Firebase already initialized globally
    const db = window.firebase.firestore();
    const auth = window.firebase.auth();
    const storage = window.firebase.storage();

      // Save globally so other functions can use them
    window._chatDB = db;
    window._chatAuth = auth;
    window._chatStorage = storage;

    initUI();
  }

  /**
   * Handle case where script loads AFTER DOMContentLoaded
   */
async function bootChatWidget() {
  console.log("🔥 bootChatWidget called");
  await waitForFirebase();      // ⬅️ waits for Firebase to load
  await startChatWidget();      // ⬅️ then initializes chat
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootChatWidget);
} else {
  bootChatWidget();
}



})();
