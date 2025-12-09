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
  console.log("🔥 initChatSession() called");

  sessionId = localStorage.getItem("roosChatSession");

  // Restore existing session
  if (sessionId) {
    console.log("🔥 Restoring existing chat session:", sessionId);
    sessionRef = db.collection("chat_sessions").doc(sessionId);
    listenForMessages();
    return;
  }

  // Create new session
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

  console.log("🔥 Created new chat session:", sessionId);

  listenForMessages();
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

  // Toggle chat panel open/close
  toggleBtn.addEventListener("click", () => {
    const isOpen = panel.style.display === "block";
    panel.style.display = isOpen ? "none" : "block";

    if (!isOpen) {
      // reset unread
      sessionRef.update({ unreadByUser: 0 })
      .catch(err => console.error("Unread reset failed:", err));
    }
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
    await initChatSession();
    initUI();
  }

  /**
   * Handle case where script loads AFTER DOMContentLoaded
   */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startChatWidget);
  } else {
    // DOM already loaded → run immediately
    startChatWidget();
  }


})();
