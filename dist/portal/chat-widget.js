console.log("chat-widget.js LOADED");

(function () {

  // ----------------------------
  // QUICK HELPERS
  // ----------------------------
  const qs  = (s, sc) => (sc || document).querySelector(s);
  const qsa = (s, sc) => (sc || document).querySelectorAll(s);

  // Firebase already initialized globally
  const db = window.firebase.firestore();
  const auth = window.firebase.auth();
  const storage = window.firebase.storage();

  let sessionId = null;
  let sessionRef = null;
  let unsubMessages = null;


  // ----------------------------
  // Load or create chat session
  // ----------------------------
  async function initChatSession() {
    sessionId = localStorage.getItem("roosChatSession");

    if (sessionId) {
      sessionRef = db.collection("chat_sessions").doc(sessionId);
      listenForMessages();
      return;
    }

    // Create new anonymous session
    const newRef = await db.collection("chat_sessions").add({
      userId: auth.currentUser?.uid || null,
      startedAt: firebase.firestore.FieldValue.serverTimestamp(),
      isClosed: false,
      assignedTo: null,
      unreadByUser: 0,
      unreadByManager: 1,
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    sessionId = newRef.id;
    sessionRef = newRef;

    localStorage.setItem("roosChatSession", sessionId);

    listenForMessages();
  }


  // ----------------------------
  // Real-time message listener
  // ----------------------------
  function listenForMessages() {
    const msgRef = sessionRef.collection("messages").orderBy("timestamp");

    unsubMessages = msgRef.onSnapshot((snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          renderMessage(change.doc.data());
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
    bubble.setAttribute("data-chat", msg.senderType === "user" ? "bubble-user" : "bubble-manager");

    // Text node
    const text = document.createElement("div");
    text.textContent = msg.text;
    bubble.appendChild(text);

    // Timestamp
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
    if (!text.trim()) return;
    if (!sessionRef) return;

    await sessionRef.collection("messages").add({
      senderType: "user",
      senderId: auth.currentUser?.uid || "anon",
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
    const toggle  = qs('[data-chat="toggle"]');
    const panel   = qs('[data-chat="panel"]');
    const input   = qs('[data-chat="input"]');
    const sendBtn = qs('[data-chat="send"]');

    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
      panel.style.display = panel.style.display === "none" ? "block" : "none";

      // Mark all read when opened
      if (panel.style.display === "block") {
        sessionRef.update({ unreadByUser: 0 });
      }
    });

    sendBtn.addEventListener("click", () => {
      sendMessage(input.value);
      input.value = "";
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendMessage(input.value);
        input.value = "";
      }
    });
  }


  // ----------------------------
  // Initialize everything
  // ----------------------------
  document.addEventListener("DOMContentLoaded", async () => {
    await initChatSession();
    initUI();
    console.log("Chat Widget DOM Ready");
  });

})();
