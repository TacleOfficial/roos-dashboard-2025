(function() {
// ======== CHANGE-PASSWORD UI ========
  function cp$(form, sel) { return form ? form.querySelector(sel) : null; }
  function cp$$(form, sel) { return form ? Array.from(form.querySelectorAll(sel)) : []; }

  function evaluatePassword(pw, reqElems) {
    const res = new Map();
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasDigit = /\d/.test(pw);
    const hasSymbol = /[^A-Za-z0-9]/.test(pw);

    reqElems.forEach(el => {
      const kind = el.getAttribute('data-req');
      if (kind === 'min') {
        const min = Number(el.getAttribute('data-min') || 8);
        res.set(el, pw.length >= min);
      } else if (kind === 'upper') res.set(el, hasUpper);
      else if (kind === 'lower') res.set(el, hasLower);
      else if (kind === 'digit') res.set(el, hasDigit);
      else if (kind === 'symbol') res.set(el, hasSymbol);
      else if (kind === 'pattern') {
        try { res.set(el, new RegExp(el.getAttribute('data-pattern')).test(pw)); }
        catch { res.set(el, false); }
      }
    });
    return res;
  }

  function paintRequirements(form, results) {
    results.forEach((ok, el) => {
      const li = el.closest('.req-item') || el;
      const icon = li.querySelector('[data-icon]');
      li.classList.toggle('ok', !!ok);
      if (icon) icon.textContent = ok ? '✓' : '—';
      li.setAttribute('aria-checked', ok ? 'true' : 'false');
    });
  }

  function allOk(results) {
    for (const ok of results.values()) if (!ok) return false;
    return true;
  }

  function setStatus(form, msg, kind) {
    const s = cp$(form, '[data-cp="status"]');
    if (!s) return;
    s.textContent = msg || '';
    s.classList.remove('ok', 'err', 'info');
    if (kind) s.classList.add(kind);
  }

  async function doChangePassword(ctx, form) {
    const auth = ctx.auth;
    const user = auth.currentUser;
    if (!user) { setStatus(form, 'Not signed in.', 'err'); return; }

    const oldEl = cp$(form, '[data-cp="old"]');
    const newEl = cp$(form, '[data-cp="new"]');
    const confEl = cp$(form, '[data-cp="confirm"]');
    const newPw = newEl.value, oldPw = oldEl.value;

    if (newPw !== confEl.value) {
      setStatus(form, 'New password and confirm do not match.', 'err');
      return;
    }

    const providers = (user.providerData || []).map(p => p.providerId);
    const usesPassword = providers.includes('password');

    try {
      if (usesPassword) {
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPw);
        await user.reauthenticateWithCredential(cred);
      } else {
        setStatus(form, 'This account uses a federated sign-in (e.g., Google). Use “Reset Password” via email instead.', 'err');
        return;
      }

      await user.updatePassword(newPw);
      setStatus(form, 'Password updated successfully.', 'ok');
      oldEl.value = ''; newEl.value = ''; confEl.value = '';
      cp$$(form, '[data-req]').forEach(el => {
        const li = el.closest('.req-item') || el;
        const icon = li.querySelector('[data-icon]');
        li.classList.remove('ok');
        if (icon) icon.textContent = '—';
      });

    } catch (e) {
      const code = e?.code || '';
      let msg = 'Could not update password.';
      if (code === 'auth/wrong-password') msg = 'Old password is incorrect.';
      else if (code === 'auth/too-many-requests') msg = 'Too many attempts. Try again later.';
      else if (code === 'auth/requires-recent-login') msg = 'Please sign in again and retry.';
      setStatus(form, msg, 'err');
      console.error('[changePassword]', e);
    }
  }

  function initChangePasswordUI(ctx) {
    const form = document.querySelector('[data-cp="form"]');
    if (!form) return;

    const oldEl = cp$(form, '[data-cp="old"]');
    const newEl = cp$(form, '[data-cp="new"]');
    const confEl = cp$(form, '[data-cp="confirm"]');
    const btnUpd = cp$(form, '[data-cp="submit"]');
    const btnCan = cp$(form, '[data-cp="cancel"]');
    const reqEls = cp$$(form, '[data-req]');

    function refresh() {
      const pw = newEl.value || '';
      const results = evaluatePassword(pw, reqEls);
      paintRequirements(form, results);

      const okReqs = reqEls.length ? allOk(results) : pw.length > 0;
      const match = pw.length > 0 && pw === (confEl.value || '');
      const enable = okReqs && match && (oldEl?.value || '').length > 0;

      if (btnUpd) btnUpd.disabled = !enable;

      if (confEl.value && !match) setStatus(form, 'Passwords do not match.', 'info');
      else setStatus(form, '');
    }

    newEl?.addEventListener('input', refresh);
    confEl?.addEventListener('input', refresh);
    oldEl?.addEventListener('input', refresh);

    btnUpd?.addEventListener('click', () => doChangePassword(ctx, form));
    btnCan?.addEventListener('click', () => {
      oldEl.value = ''; newEl.value = ''; confEl.value = '';
      refresh();
    });

    refresh();
  }
  // ======== /CHANGE-PASSWORD UI ========

    window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, { initChangePasswordUI });
})();