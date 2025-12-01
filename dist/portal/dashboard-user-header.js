 (function () {
 // ---------- USER HEADER (name, username, registered) ----------
  function uh$(sel, r = document) { return r.querySelector(sel); }

  function formatLongDate(dLike) {
    if (!dLike) return '';
    const d = (dLike instanceof Date) ? dLike : new Date(dLike);
    return isNaN(d) ? '' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function pickFullName(profile, user) {
    const p = profile || {};
    return (
      p.fullName ||
      [p.firstName, p.lastName].filter(Boolean).join(' ') ||
      (user && user.displayName) ||
      ''
    );
  }

  function pickUsername(profile, user) {
    const p = profile || {};
    if (p.username) return String(p.username);
    // optional fallback: email handle
    const email = user?.email || '';
    const handle = email.includes('@') ? email.split('@')[0] : '';
    return handle || '';
  }

  function pickRegisteredAt(profile, user) {
    const p = profile || {};
    // 1) Firebase Auth metadata
    const metaTime = user?.metadata?.creationTime; // string like "Tue, 14 Aug 2025 16:32:11 GMT"
    if (metaTime) return new Date(metaTime);
    // 2) Firestore timestamp on the user doc (createdAt)
    const ts = p.createdAt;
    if (ts?.toDate) return ts.toDate();
    if (typeof ts === 'number' || typeof ts === 'string') return new Date(ts);
    return null;
  }

  function paintUserHeader({ auth, profile }) {
    const user = auth.currentUser;
    const nameEl = uh$('[data-uh="name"]');
    const userEl = uh$('[data-uh="username"]');
    const regEl = uh$('[data-uh="registered"]');

    if (nameEl) nameEl.textContent = pickFullName(profile, user) || '—';
    if (userEl) userEl.textContent = pickUsername(profile, user) || '—';

    if (regEl) {
      const when = pickRegisteredAt(profile, user);
      regEl.textContent = when ? `${formatLongDate(when)}` : '';
    }
  }

  // Call this once you have ctx.auth and (later) ctx.profile.
  function initUserHeaderUI(ctx) {
    // First paint with whatever we have (Auth might already be available)
    paintUserHeader(ctx);
    // Keep it fresh if displayName changes later (optional)
    ctx.auth.onAuthStateChanged(() => paintUserHeader(ctx));
  }
  // ---------- /USER HEADER ----------
    window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, {
    initUserHeaderUI,
    paintUserHeader,
  });
})();