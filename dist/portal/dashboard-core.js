(function () {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  function waitForFirebaseReady(cb) {
    const i = setInterval(() => {
      if (window.fetchFirebaseConfig && window.firebase?.firestore && window.firebase?.auth) {
        clearInterval(i); cb();
      }
    }, 100);
  }

  const ROLE_GATING_ENABLED = false; // set to false now, true when you add admin sections


  function show(el) { if (el) el.style.display = ""; }
  function hide(el) { if (el) el.style.display = "none"; }

  function updateVisibility({ authed, rolesSet }) {
    // [data-auth]
    qsa("[data-auth]").forEach(el => {
      const want = el.getAttribute("data-auth"); // "authed" or "guest"
      const visible = (want === "authed") ? authed : !authed;
      el.style.display = visible ? "" : "none";
    });
    // [data-role] (kept, but not used to gate core portal anymore)
    // [data-role] – only if gating enabled
    if (ROLE_GATING_ENABLED) {
      qsa("[data-role]").forEach(el => {
        const need = el.getAttribute("data-role").split(",").map(s => s.trim()).filter(Boolean);
        const visible = rolesSet && need.some(r => rolesSet.has(r));
        el.style.display = visible ? "" : "none";
      });
    }
  }

  async function fetchIsAdmin(db, uid) {
    try {
      const snap = await db.collection("admins").doc(uid).get();
      if (!snap.exists) return false;
      const data = snap.data() || {};
      return data.isAdmin === true || Object.keys(data).length > 0;
    } catch (e) {
      console.warn("Admin check failed:", e);
      return false;
    }
  }
  
  // Export to global namespace
  window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, {
    qs,
    qsa,
    waitForFirebaseReady,
    ROLE_GATING_ENABLED,
    show,
    hide,
    updateVisibility,
    fetchIsAdmin,
  });
})();