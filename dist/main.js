(function(){
  const qs  = (s, r=document) => r.querySelector(s);
  const qsa = (s, r=document) => Array.from(r.querySelectorAll(s));

  function waitForFirebaseReady(cb) {
    const i = setInterval(() => {
      if (window.fetchFirebaseConfig && window.firebase?.firestore && window.firebase?.auth) {
        clearInterval(i); cb();
      }
    }, 100);
  }
  
  const ROLE_GATING_ENABLED = false; // set to false now, true when you add admin sections


  function show(el){ if (el) el.style.display = ""; }
  function hide(el){ if (el) el.style.display = "none"; }

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

  // ---------- TABLE HELPERS (no innerHTML) ----------
  function toDate(val) {
    if (!val) return null;
    if (val.toDate) return val.toDate();
    if (typeof val === 'number') return new Date(val);
    return new Date(val);
  }

  const fmt = {
    money(v) {
      const n = typeof v === 'number' ? v : Number(v);
      if (Number.isNaN(n)) return v ?? '';
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
    },
    date(v) {
      const d = toDate(v);
      return d && !isNaN(d) ? d.toLocaleDateString() : '';
    },
    array(v) {
      if (Array.isArray(v)) return v.join(', ');
      return v ?? '';
    }
  };

  const DEFAULT_EMPTY = '—'; // set to "Not Available" if you prefer

  function isEmptyValue(v) {
    if (v === null || v === undefined) return true;
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === 'string') return v.trim() === '';
    return false;
  }

  function fallbackFor(el) {
    return el.getAttribute('data-empty') ?? DEFAULT_EMPTY;
  }

  function formatByProp(prop, raw) {
    if (raw == null) return '';
    if (prop === 'projectBudget') return fmt.money(raw);
    if (prop === 'createdAt' || prop === 'date') return fmt.date(raw);
    if (prop === 'materials') return fmt.array(raw);
    if (Array.isArray(raw)) return fmt.array(raw);
    if (typeof raw === 'object') return JSON.stringify(raw);
    return String(raw);
  }

  function buildRow(jobData, materialsText) {
    const tbody  = qs('#projects-tbody');
    const tplRow = tbody ? qs('[data-row="template"]', tbody) : null;
    if (!tbody || !tplRow) { console.warn('[table] missing #projects-tbody or [data-row="template"]'); return null; }

    const row = tplRow.cloneNode(true);
    row.removeAttribute('data-row');
    row.style.display = '';

    qsa('[data-prop]', row).forEach(el => {
      const prop = el.getAttribute('data-prop');
      let value = (prop === 'materials' && materialsText !== undefined)
        ? materialsText
        : formatByProp(prop, jobData[prop]);

      if (isEmptyValue(value)) {
        el.textContent = fallbackFor(el);
        el.classList.add('is-empty');
      } else {
        el.textContent = String(value);
        el.classList.remove('is-empty');
      }
    });

    return row;
  }

  function setMaterialsCell(row, materialsText) {
    const el = qs('[data-prop="materials"]', row);
    if (!el) return;
    if (isEmptyValue(materialsText)) {
      el.textContent = fallbackFor(el);
      el.classList.add('is-empty');
    } else {
      el.textContent = materialsText;
      el.classList.remove('is-empty');
    }
  }

  async function fetchMaterialsForJob(db, uid, jobId) {
    try {
      const snap = await db.collection('users').doc(uid)
        .collection('jobs').doc(jobId)
        .collection('materials')
        .orderBy('createdAt', 'asc')
        .get();

      const names = snap.docs.map(d => d.data()?.materialName ?? '').filter(Boolean);
      return names.join(', ');
    } catch (e) {
      console.error('[materials] load error', jobId, e);
      return '';
    }
  }

  async function loadJobsForUser(db, uid) {
    const tbody  = qs('#projects-tbody');
    const tplRow = tbody ? qs('[data-row="template"]', tbody) : null;
    if (!tbody || !tplRow) {
      console.warn('[table] missing #projects-tbody or template row; skipping render');
      return;
    }

    qsa('#projects-tbody > tr:not([data-row="template"])').forEach(tr => tr.remove());

    const jobsSnap = await db.collection('users').doc(uid)
      .collection('jobs')
      .orderBy('createdAt', 'desc')
      .limit(200)
      .get();

    const frag = document.createDocumentFragment();
    const rowsByJobId = new Map();

    jobsSnap.docs.forEach(doc => {
      const data = doc.data();
      const row = buildRow(data, 'Loading…');
      if (row) {
        rowsByJobId.set(doc.id, row);
        frag.appendChild(row);
      }
    });

    tbody.appendChild(frag);

    await Promise.all(
      jobsSnap.docs.map(async doc => {
        const text = await fetchMaterialsForJob(db, uid, doc.id);
        const row  = rowsByJobId.get(doc.id);
        if (row) setMaterialsCell(row, text);
      })
    );
  }
  // ---------- /TABLE HELPERS ----------

  // ======== CHANGE-PASSWORD UI ========
  function cp$(form, sel){ return form ? form.querySelector(sel) : null; }
  function cp$$(form, sel){ return form ? Array.from(form.querySelectorAll(sel)) : []; }

  function evaluatePassword(pw, reqElems){
    const res = new Map();
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasDigit = /\d/.test(pw);
    const hasSymbol= /[^A-Za-z0-9]/.test(pw);

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

  function paintRequirements(form, results){
    results.forEach((ok, el) => {
      const li = el.closest('.req-item') || el;
      const icon = li.querySelector('[data-icon]');
      li.classList.toggle('ok', !!ok);
      if (icon) icon.textContent = ok ? '✓' : '—';
      li.setAttribute('aria-checked', ok ? 'true' : 'false');
    });
  }

  function allOk(results){
    for (const ok of results.values()) if (!ok) return false;
    return true;
  }

  function setStatus(form, msg, kind){
    const s = cp$(form, '[data-cp="status"]');
    if (!s) return;
    s.textContent = msg || '';
    s.classList.remove('ok','err','info');
    if (kind) s.classList.add(kind);
  }

  async function doChangePassword(ctx, form){
    const auth = ctx.auth;
    const user = auth.currentUser;
    if (!user) { setStatus(form, 'Not signed in.', 'err'); return; }

    const oldEl = cp$(form, '[data-cp="old"]');
    const newEl = cp$(form, '[data-cp="new"]');
    const confEl= cp$(form, '[data-cp="confirm"]');
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

  function initChangePasswordUI(ctx){
    const form = document.querySelector('[data-cp="form"]');
    if (!form) return;

    const oldEl  = cp$(form, '[data-cp="old"]');
    const newEl  = cp$(form, '[data-cp="new"]');
    const confEl = cp$(form, '[data-cp="confirm"]');
    const btnUpd = cp$(form, '[data-cp="submit"]');
    const btnCan = cp$(form, '[data-cp="cancel"]');
    const reqEls = cp$$(form, '[data-req]');

    function refresh(){
      const pw = newEl.value || '';
      const results = evaluatePassword(pw, reqEls);
      paintRequirements(form, results);

      const okReqs = reqEls.length ? allOk(results) : pw.length > 0;
      const match  = pw.length > 0 && pw === (confEl.value || '');
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

  // ---------- USER HEADER (name, username, registered) ----------
function uh$(sel, r=document){ return r.querySelector(sel); }

function formatLongDate(dLike){
  if (!dLike) return '';
  const d = (dLike instanceof Date) ? dLike : new Date(dLike);
  return isNaN(d) ? '' : d.toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });
}

function pickFullName(profile, user){
  const p = profile || {};
  return (
    p.fullName ||
    [p.firstName, p.lastName].filter(Boolean).join(' ') ||
    (user && user.displayName) ||
    ''
  );
}

function pickUsername(profile, user){
    const p = profile || {};
  if (p.username) return String(p.username);
  // optional fallback: email handle
  const email = user?.email || '';
  const handle = email.includes('@') ? email.split('@')[0] : '';
  return handle || '';
}

function pickRegisteredAt(profile, user){
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

function paintUserHeader({ auth, profile }){
  const user = auth.currentUser;
  const nameEl = uh$('[data-uh="name"]');
  const userEl = uh$('[data-uh="username"]');
  const regEl  = uh$('[data-uh="registered"]');

  if (nameEl) nameEl.textContent = pickFullName(profile, user) || '—';
  if (userEl) userEl.textContent = pickUsername(profile, user) || '—';

  if (regEl) {
    const when = pickRegisteredAt(profile, user);
    regEl.textContent = when ? `${formatLongDate(when)}` : '';
  }
}

// Call this once you have ctx.auth and (later) ctx.profile.
function initUserHeaderUI(ctx){
  // First paint with whatever we have (Auth might already be available)
  paintUserHeader(ctx);
  // Keep it fresh if displayName changes later (optional)
  ctx.auth.onAuthStateChanged(() => paintUserHeader(ctx));
}
// ---------- /USER HEADER ----------


  // ---------- SINGLE auth listener (everything available to signed-in users) ----------
  waitForFirebaseReady(async () => {
    const db   = await window.fetchFirebaseConfig();
    const auth = firebase.auth();

    const elPending  = qs("#auth-pending");
    const elGuest    = qs("#auth-guest");
    const elAuthed   = qs("#auth-authed");
    const elNoAccess = qs("#auth-noaccess");

    window.portalCtx = { db, auth, user: null, admin: false, roles: new Set(), profile: null };

    try { await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch(_){}

    show(elPending); hide(elGuest); hide(elAuthed); hide(elNoAccess);

    auth.onAuthStateChanged(async (user) => {
      window.portalCtx.user  = user || null;
      window.portalCtx.admin = false;
      window.portalCtx.roles = new Set();

      if (!user) {
        hide(elPending); show(elGuest); hide(elAuthed); show(elNoAccess);
        updateVisibility({ authed:false, rolesSet:null });
        return;
      }

      // For ALL signed-in users:
      hide(elPending); hide(elGuest); hide(elNoAccess); show(elAuthed);
      updateVisibility({ authed:true, rolesSet:new Set() });

      // Optional: still compute admin flag (for later)
      try {
        const isAdmin = await fetchIsAdmin(db, user.uid);
        if (isAdmin) window.portalCtx.roles.add('admin');
        window.portalCtx.admin = isAdmin;
      } catch(_) {}

      // Load user-facing features
      initChangePasswordUI(window.portalCtx);
      initProfileUI(window.portalCtx);
      initUserHeaderUI(window.portalCtx);   // ← add this      
      await loadJobsForUser(db, user.uid); // visible to all users now
      await loadSamplesForUser(db, user.uid);   // ← add this line
      wireSampleRowClicksOnce();
      wireModalCloseOnce();
      const prForm = document.querySelector('[data-pr="form"]');
        if (prForm && prForm.__loadProfile) prForm.__loadProfile(user.uid);  // ← load data
    });
  });

// ======== SELECT POPULATION HELPERS ========
const SUBDIVISIONS = {
  US:[
    { value: "AL", text: "Alabama" }, { value: "AK", text: "Alaska" },
    { value: "AZ", text: "Arizona" }, { value: "AR", text: "Arkansas" },
    { value: "CA", text: "California" }, { value: "CO", text: "Colorado" },
    { value: "CT", text: "Connecticut" }, { value: "DE", text: "Delaware" },
    { value: "DC", text: "District of Columbia" }, { value: "FL", text: "Florida" },
    { value: "GA", text: "Georgia" }, { value: "HI", text: "Hawaii" },
    { value: "ID", text: "Idaho" }, { value: "IL", text: "Illinois" },
    { value: "IN", text: "Indiana" }, { value: "IA", text: "Iowa" },
    { value: "KS", text: "Kansas" }, { value: "KY", text: "Kentucky" },
    { value: "LA", text: "Louisiana" }, { value: "ME", text: "Maine" },
    { value: "MD", text: "Maryland" }, { value: "MA", text: "Massachusetts" },
    { value: "MI", text: "Michigan" }, { value: "MN", text: "Minnesota" },
    { value: "MS", text: "Mississippi" }, { value: "MO", text: "Missouri" },
    { value: "MT", text: "Montana" }, { value: "NE", text: "Nebraska" },
    { value: "NV", text: "Nevada" }, { value: "NH", text: "New Hampshire" },
    { value: "NJ", text: "New Jersey" }, { value: "NM", text: "New Mexico" },
    { value: "NY", text: "New York" }, { value: "NC", text: "North Carolina" },
    { value: "ND", text: "North Dakota" }, { value: "OH", text: "Ohio" },
    { value: "OK", text: "Oklahoma" }, { value: "OR", text: "Oregon" },
    { value: "PA", text: "Pennsylvania" }, { value: "RI", text: "Rhode Island" },
    { value: "SC", text: "South Carolina" }, { value: "SD", text: "South Dakota" },
    { value: "TN", text: "Tennessee" }, { value: "TX", text: "Texas" },
    { value: "UT", text: "Utah" }, { value: "VT", text: "Vermont" },
    { value: "VA", text: "Virginia" }, { value: "WA", text: "Washington" },
    { value: "WV", text: "West Virginia" }, { value: "WI", text: "Wisconsin" },
    { value: "WY", text: "Wyoming" }
    ],
  CA: [
    { value: "AB", text: "Alberta" }, { value: "BC", text: "British Columbia" },
    { value: "MB", text: "Manitoba" }, { value: "NB", text: "New Brunswick" },
    { value: "NL", text: "Newfoundland and Labrador" }, { value: "NS", text: "Nova Scotia" },
    { value: "NT", text: "Northwest Territories" }, { value: "NU", text: "Nunavut" },
    { value: "ON", text: "Ontario" }, { value: "PE", text: "Prince Edward Island" },
    { value: "QC", text: "Quebec" }, { value: "SK", text: "Saskatchewan" },
    { value: "YT", text: "Yukon" },
  ],
  MX: [
    { value: "AGU", text: "Aguascalientes" }, { value: "BCN", text: "Baja California" },
    { value: "BCS", text: "Baja California Sur" }, { value: "CAM", text: "Campeche" },
    { value: "CHP", text: "Chiapas" }, { value: "CHH", text: "Chihuahua" },
    { value: "CMX", text: "Ciudad de México" }, { value: "CAM", text: "Campeche" },
    { value: "COA", text: "Coahuila de Zaragoza" }, { value: "COL", text: "Colima" },
    { value: "DUR", text: "Durango" }, { value: "GUA", text: "Guanajuato" },
    { value: "GRO", text: "Guerrero" }, { value: "HID", text: "Hidalgo" },
    { value: "JAL", text: "Jalisco" }, { value: "MIC", text: "Michoacán" },
    { value: "MOR", text: "Morelos" }, { value: "MEX", text: "México" },
    { value: "NAY", text: "Nayarit" }, { value: "NLE", text: "Nuevo León" },
    { value: "OAX", text: "Oaxaca" }, { value: "PUE", text: "Puebla" },
    { value: "QUE", text: "Querétaro" }, { value: "ROO", text: "Quintana Roo" },
    { value: "SLP", text: "San Luis Potosí" }, { value: "SIN", text: "Sinaloa" },
    { value: "SON", text: "Baja Sonora Sur" }, { value: "TAB", text: "Tabasco" },
    { value: "TAM", text: "Tamaulipas" }, { value: "TLA", text: "Tlaxcala" },
    // ... add remaining Mexican states as needed ...
    { value: "VER", text: "Veracruz" }, { value: "YUC", text: "Yucatán" },
    { value: "ZAC", text: "Zacatecas" },
  ],
};
// Keep the country list short for now; add more when you like.
// (Later we can drop in a full ISO-3166 list or drive it from Firestore.)
// ISO country code (value) + label (text).
const COUNTRIES = [
  { value: "US", text: "United States" },
  { value: "CA", text: "Canada" },
  { value: "MX", text: "Mexico" },

];


function setOptions(selectEl, items, { placeholder } = {}) {
  // Clear all existing options (no innerHTML)
  while (selectEl.options.length) selectEl.remove(0);

  if (placeholder) {
    const ph = document.createElement('option');
    ph.value = "";
    ph.textContent = placeholder;
    ph.disabled = true;
    ph.selected = true;
    selectEl.appendChild(ph);
  }

  items.forEach(it => {
    const opt = document.createElement('option');
    if (typeof it === 'string') {
      opt.value = it;
      opt.textContent = it;
    } else {
      opt.value = it.value;
      opt.textContent = it.text;
    }
    selectEl.appendChild(opt);
  });
}

// Populate any selects inside the profile form that declare data-options
function populateProfileSelects(form) {
  const selects = Array.from(form.querySelectorAll('select[data-options]'));
  selects.forEach(sel => {
    const source = sel.getAttribute('data-options');
    const placeholder = sel.getAttribute('data-placeholder') || '';

    if (source === 'countries') {
      setOptions(sel, COUNTRIES, { placeholder });
    }
    else if (source === 'subdivisions') {
      // Leave empty for now; we build it after country is known.
      setOptions(sel, [], { placeholder });
    }
    // Backward-compat alias if you still have data-options="us-states" somewhere:
    else if (source === 'us-states') {
      setOptions(sel, SUBDIVISIONS.US, { placeholder });
    }
  });
}
// ======== /SELECT POPULATION HELPERS ========

function normalizeForSave(data){
  const out = { ...data };

  // Country → store code (US/CA/MX/GB/AU)
  if (out.country) {
    const code = resolveCountryCode(out.country);
    if (code) out.country = code;
    else delete out.country; // unknown country -> drop
  }

  // State/Province → store code only, valid for the chosen country
  if (out.country) {
    const list = SUBDIVISIONS[out.country] || [];
    if (out.state) {
      let s = String(out.state).trim();
      // Try direct code
      let hit = list.find(x => x.value.toLowerCase() === s.toLowerCase());
      if (!hit) {
        // Try by name (user may have typed a label somehow)
        hit = list.find(x => x.text.toLowerCase() === s.toLowerCase());
      }
      if (hit) out.state = hit.value.toUpperCase();
      else delete out.state; // invalid for this country
    } else {
      // empty -> delete
      delete out.state;
    }
  } else {
    // no country → drop state
    delete out.state;
  }

  return out;
}



// Auto Populate U.S. States when Country = US 
function wireCountryStateDependency(form){
  const country = form.querySelector('[data-pr="country"]');
  const state   = form.querySelector('[data-pr="state"]');
  if (!country || !state) return;

  function updateStateOptions(){
    const ph = state.getAttribute('data-placeholder') || 'Select state';
    if (country.value === 'United States') {
      setOptions(state, US_STATES, { placeholder: ph });
    } else {
      // Clear state options but keep a blank so value can be empty
      while (state.options.length) state.remove(0);
      const blank = document.createElement('option');
      blank.value = ""; blank.textContent = ph;
      blank.disabled = true; blank.selected = true;
      state.appendChild(blank);
    }
  }

  country.addEventListener('change', () => syncStateOptionsToCountry(form));
}

function syncStateOptionsToCountry(form){
  const country = form.querySelector('[data-pr="country"]');
  const state   = form.querySelector('[data-pr="state"]');
  if (!country || !state) return;

  const ph   = state.getAttribute('data-placeholder') || 'Select state';
  const keep = state.value; // whatever was filled from Firestore

  if (country.value === 'United States') {
    setOptions(state, US_STATES, { placeholder: ph });
    if (keep) state.value = keep; // re-apply selection if it exists
  } else {
    // Non-US: show just placeholder
    while (state.options.length) state.remove(0);
    const blank = document.createElement('option');
    blank.value = ""; blank.textContent = ph;
    blank.disabled = true; blank.selected = true;
    state.appendChild(blank);
  }
}

function resolveCountryCode(countryValueOrText) {
  if (!countryValueOrText) return null;
  const raw = String(countryValueOrText).trim();
  // Try match by code
  const byCode = COUNTRIES.find(c => c.value.toLowerCase() === raw.toLowerCase());
  if (byCode) return byCode.value;
  // Try match by name
  const byText = COUNTRIES.find(c => c.text.toLowerCase() === raw.toLowerCase());
  return byText ? byText.value : null;
}


function syncSubdivisionsToCountry(form){
  const countrySel = form.querySelector('[data-pr="country"]');
  const stateSel   = form.querySelector('[data-pr="state"]');
  if (!countrySel || !stateSel) return;

  const ph   = stateSel.getAttribute('data-placeholder') || 'Select state/province';
  const keep = stateSel.value; // what fillProfileForm put there

  const countryCode = resolveCountryCode(countrySel.value);
  const list = countryCode ? (SUBDIVISIONS[countryCode] || []) : [];

  if (list.length) {
    setOptions(stateSel, list, { placeholder: ph });
    // re-apply saved selection if still valid
    if (keep) setSelectToValueOrText(stateSel, keep);
  } else {
    // No subdivisions for this country → show placeholder only
    while (stateSel.options.length) stateSel.remove(0);
    const blank = document.createElement('option');
    blank.value = ""; blank.textContent = ph;
    blank.disabled = true; blank.selected = true;
    stateSel.appendChild(blank);
  }
}

function wireCountrySubdivisionDependency(form){
  const countrySel = form.querySelector('[data-pr="country"]');
  if (!countrySel) return;
  countrySel.addEventListener('change', () => {
    // Clear the state selection when country changes
    const st = form.querySelector('[data-pr="state"]');
    if (st) st.value = "";
    syncSubdivisionsToCountry(form);
  });
}

// Try to select either by option value (code) or by visible text (label)
function setSelectToValueOrText(sel, val){
  if (!sel || !val) return;
  const needle = String(val).trim().toLowerCase();
  const hit = Array.from(sel.options).find(
    o => (o.value || '').toLowerCase() === needle ||
         (o.text  || '').toLowerCase() === needle
  );
  if (hit) sel.value = hit.value;
}

// ---------- SAMPLES TABLE HELPERS (patched for additionalInfo) ----------
function formatSampleByProp(prop, raw){
  if (raw == null) return '';
  if (prop === 'createdAt' || prop === 'date') return fmt.date(raw);
  if (prop === 'materials' || prop === 'material') return fmt.array(raw);
  if (Array.isArray(raw)) return fmt.array(raw);
  if (typeof raw === 'object') return JSON.stringify(raw);
  return String(raw);
}

function buildSampleRow(sampleData, { materialsText, latestNotesText } = {}){
  const tbody  = qs('#samples-tbody');
  const tplRow = tbody ? qs('[data-row="template"]', tbody) : null;
  if (!tbody || !tplRow) { console.warn('[samples] missing #samples-tbody or template'); return null; }

  const row = tplRow.cloneNode(true);
  row.removeAttribute('data-row');
  row.style.display = '';

  qsa('[data-prop]', row).forEach(el => {
    const prop = el.getAttribute('data-prop');

    let value;
    if (prop === 'latestNotes') {
      // Prefer explicit override; else parent.additionalInfo
      value = (latestNotesText !== undefined)
        ? latestNotesText
        : (sampleData.additionalInfo ?? '');
    } else if (prop === 'material' && materialsText !== undefined) {
      value = materialsText;
    } else if (prop === 'date') {
      value = formatSampleByProp('date', sampleData.createdAt ?? sampleData.date ?? null);
    } else {
      value = formatSampleByProp(prop, sampleData[prop]);
    }

    if (isEmptyValue(value)) {
      el.textContent = fallbackFor(el);
      el.classList.add('is-empty');
    } else {
      el.textContent = String(value);
      el.classList.remove('is-empty');
    }
  });

  return row;
}

function setSampleNotesCell(row, text){
  const el = qs('[data-prop="latestNotes"]', row);
  if (!el) return;
  if (isEmptyValue(text)) {
    el.textContent = fallbackFor(el);
    el.classList.add('is-empty');
  } else {
    el.textContent = text;
    el.classList.remove('is-empty');
  }
}

// Fallback: pull newest note from subcollection if parent.additionalInfo is blank
async function fetchLatestNoteFromSubcol(db, uid, sampleId){
  try {
    const snap = await db.collection('users').doc(uid)
      .collection('sampleRequests').doc(sampleId)
      .collection('notes')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snap.empty) return '';
    const note = snap.docs[0].data() || {};
    return (note.text || note.note || note.message || '').trim();
  } catch(e){
    console.error('[samples] fetch latest note failed', e);
    return '';
  }
}

async function addSampleNote({ db, uid, sampleId, text, authorUid }){
  const parentRef = db.collection('users').doc(uid)
    .collection('sampleRequests').doc(sampleId);

  const noteRef = parentRef.collection('notes').doc();
  const now = firebase.firestore.FieldValue.serverTimestamp();
  const clean = String(text || '').trim();

  const batch = db.batch();
  batch.set(noteRef, {
    text: clean,
    authorUid: authorUid || uid,
    createdAt: now
  });
  batch.set(parentRef, {
    additionalInfo: clean,         // ← denormalized “latest”
    latestNoteAt: now
  }, { merge:true });

  await batch.commit();
}


async function loadSamplesForUser(db, uid){
  const tbody  = qs('#samples-tbody');
  const tplRow = tbody ? qs('[data-row="template"]', tbody) : null;
  if (!tbody || !tplRow) {
    console.warn('[samples] missing #samples-tbody or template; skipping render');
    return;
  }

  qsa('#samples-tbody > tr:not([data-row="template"])').forEach(tr => tr.remove());

  const qsnap = await db.collection('users').doc(uid)
    .collection('sampleRequests')
    .orderBy('createdAt', 'desc')
    .limit(200)
    .get();

  const frag = document.createDocumentFragment();
  const rowsById = new Map();

  qsnap.docs.forEach(doc => {
    const data = doc.data() || {};
    const row = buildSampleRow(data, {
      materialsText: data.material,
      latestNotesText: (data.additionalInfo ?? 'Loading…')
    });
    if (row) { rowsById.set(doc.id, row); frag.appendChild(row); row.setAttribute('data-id', doc.id); }
    

  });

  tbody.appendChild(frag);
  wireSampleRowClicksOnce();


  // Only fetch subcollection if parent.additionalInfo is empty
  await Promise.all(qsnap.docs.map(async doc => {
    const data = doc.data() || {};
    if (!data.additionalInfo) {
      const latest = await fetchLatestNoteFromSubcol(db, uid, doc.id);
      const row = rowsById.get(doc.id);
      if (row) setSampleNotesCell(row, latest);
    }
  }));
}
// ---------- /SAMPLES TABLE HELPERS ----------


// =================== SAMPLE MODAL SCRIPT (entire block) ==================
  // ---- tiny DOM helpers (namespaced to avoid collisions) ----
  function md$(sel, r=document){ return r.querySelector(sel); }
  function mdShow(el){ if (el) el.style.display = 'block'; }
  function mdHide(el){ if (el) el.style.display = 'none'; }
  function mdSetText(el, v){ if (el) el.textContent = (v ?? '—'); }
  function mdSetSrc(el, v){ if (el) el.setAttribute('src', v || ''); }

  // Safe rich text (no innerHTML)
  function mdSetRichText(el, html){
    if (!el) return;                 // ← add this line
    while (el.firstChild) el.removeChild(el.firstChild);
    if (!html || typeof html !== 'string') return;

    const allowed = new Set(['P','A','STRONG','EM','UL','OL','LI','BR','H1','H2','H3','H4','H5','H6','SPAN']);
    const doc = new DOMParser().parseFromString(html, 'text/html');

    function cloneSafe(node, parent){
      if (node.nodeType === Node.TEXT_NODE) {
        parent.appendChild(document.createTextNode(node.nodeValue));
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const tag = node.tagName;
      if (!allowed.has(tag)) {
        parent.appendChild(document.createTextNode(node.textContent || ''));
        return;
      }

      const out = document.createElement(tag.toLowerCase());
      if (tag === 'A') {
        const href = node.getAttribute('href') || '#';
        out.setAttribute('href', href);
        out.setAttribute('target', '_blank');
        out.setAttribute('rel', 'noopener');
      }
      Array.from(node.childNodes).forEach(ch => cloneSafe(ch, out));
      parent.appendChild(out);
    }

    Array.from(doc.body.childNodes).forEach(n => cloneSafe(n, el));
  }

// ---------- Robust product resolver with small cache ----------
const __productCache = new Map(); // key -> product

async function fetchProductForSample(db, sample){
  // 0) productRef (full path like 'exclusive_products/abc')
  if (sample.productRef && typeof sample.productRef === 'string') {
    const key = `ref:${sample.productRef}`;
    if (__productCache.has(key)) return __productCache.get(key);
    try {
      const d = await db.doc(sample.productRef).get();
      const val = d.exists ? { id: d.id, ...d.data() } : null;
      __productCache.set(key, val);
      if (val) { console.log('[product] via productRef', sample.productRef); return val; }
    } catch(e){ console.warn('[product] productRef get failed', e); }
  }

    // 1) productId
    if (sample.productId) {
        const key = `id:${sample.productId}`;
        if (__productCache.has(key)) return __productCache.get(key);
        try {
        const d = await db.collection('exclusive_products').doc(String(sample.productId)).get();
        const val = d.exists ? { id: d.id, ...d.data() } : null;
        __productCache.set(key, val);
        if (val) { console.log('[product] via productId', sample.productId); return val; }
        } catch(e){ console.warn('[product] id get failed', e); }
    }

    const tryEq = async (field, value) => {
        const key = `${field}:${value}`;
        if (__productCache.has(key)) return __productCache.get(key);
        const snap = await db.collection('exclusive_products').where(field,'==',value).limit(1).get();
        const val = !snap.empty ? { id: snap.docs[0].id, ...snap.docs[0].data() } : null;
        __productCache.set(key, val);
        if (val) console.log(`[product] via ${field} ==`, value);
        return val;
    };

    // 2) slug (both kebab and raw)
    const rawSlug = sample.materialSlug || sample.slug || sample.material;
    if (rawSlug) {
        const norm = String(rawSlug).trim();
        const kebab = norm.toLowerCase().replace(/\s+/g,'-');
        let hit = await tryEq('slug', kebab);
        if (hit) return hit;
        hit = await tryEq('slug', norm);
        if (hit) return hit;
    }

    // 3) name/title/productName
    for (const v of [sample.material, sample.productName, sample.title, sample.name].filter(Boolean)) {
        const norm = String(v).trim();
        if (!norm) continue;
        let hit = await tryEq('name', norm);
        if (hit) return hit;
        hit = await tryEq('title', norm);
        if (hit) return hit;
        hit = await tryEq('productName', norm);
        if (hit) return hit;
    }

    // 4) sku
    if (sample.sku) {
        const hit = await tryEq('sku', String(sample.sku).trim());
        if (hit) return hit;
    }

    console.warn('[product] not found for sample', { material: sample.material, rawSlug, productId: sample.productId, productRef: sample.productRef });
    return null;
    }

  // ---- notes (template-based) ----
  let __notesUnsub = null;
  function stopNotesListener(){ if (typeof __notesUnsub === 'function') { __notesUnsub(); __notesUnsub = null; } }

  function mdFormatStamp(ts){
    const d = ts?.toDate ? ts.toDate() : (ts ? new Date(ts) : null);
    return (d && !isNaN(d)) ? d.toLocaleString() : '';
  }

  function paintNotesListWithTemplate(containerEl, snap){
    if (!containerEl) return;
    const tpl = containerEl.querySelector('[data-row="template"]');
    if (!tpl) { console.warn('[notes] missing template inside #notes-list-container'); return; }

    // Remove all rows except template
    Array.from(containerEl.children).forEach(ch => { if (ch !== tpl) ch.remove(); });

    if (snap.empty) {
      const row = tpl.cloneNode(true);
      row.removeAttribute('data-row');
      row.style.display = '';
      const t = row.querySelector('[data-n="text"]');
      const d = row.querySelector('[data-n="date"]');
      if (t) t.textContent = 'No notes yet.';
      if (d) d.textContent = '';
      containerEl.appendChild(row);
      return;
    }

    snap.forEach(doc => {
      const n = doc.data() || {};
      const row = tpl.cloneNode(true);
      row.removeAttribute('data-row');
      row.style.display = '';

      const t = row.querySelector('[data-n="text"]');
      const d = row.querySelector('[data-n="date"]');
      if (t) t.textContent = (n.text || n.note || n.message || '').trim();
      if (d) d.textContent = mdFormatStamp(n.createdAt);

      containerEl.appendChild(row);
    });
  }

  function listenNotes({ db, uid, sampleId, listContainerEl }){
    stopNotesListener();
    const ref = db.collection('users').doc(uid)
      .collection('sampleRequests').doc(sampleId)
      .collection('notes')
      .orderBy('createdAt','desc');

    __notesUnsub = ref.onSnapshot(snap => {
      paintNotesListWithTemplate(listContainerEl, snap);
    });
  }

  // Post a note (ROADMAP later: also set parent.additionalInfo via batch/CF)
  async function postNote({ db, uid, sampleId, text }){
    const parentRef = db.collection('users').doc(uid)
      .collection('sampleRequests').doc(sampleId);
    const noteRef = parentRef.collection('notes').doc();
    const now = firebase.firestore.FieldValue.serverTimestamp();
    await noteRef.set({
      text: String(text || '').trim(),
      authorUid: uid,
      createdAt: now
    });
  }

  // ---- open/close wiring using your existing overlay ----
function openSampleModal(){
  const m = md$('[data-modal="sample"]');
  if (!m) { console.warn('[sample modal] container [data-modal="sample"] not found'); return; }
  mdShow(m);
}

  function closeSampleModal(){ mdHide(md$('[data-modal="sample"]')); stopNotesListener(); }

  function wireModalCloseOnce(){
    const modal = md$('[data-modal="sample"]');
    if (!modal || modal.dataset.mdInit === '1') return;
    modal.dataset.mdInit = '1';

    const overlay = md$('[data-md="close"]', modal); // your backdrop
    const card    = md$('[data-md="card"]',  modal); // content panel

    overlay?.addEventListener('click', () => closeSampleModal());
    card?.addEventListener('click', (e) => e.stopPropagation());

    // Dedicated "Close" buttons also use data-md="close"
    modal.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-md="close"]');
      if (btn && btn !== overlay) closeSampleModal();
    });
  }

  // ---- main loader triggered on row click ----
  async function loadAndShowSampleModal({ db, uid, sampleId }){
    const modal = md$('[data-modal="sample"]');
    if (!modal) return;

    const elTitle = md$('[data-md="title"]', modal);
    const elImg   = md$('[data-md="image"]', modal);
    const elDate  = md$('[data-md="date"]', modal);
    const elVend  = md$('[data-md="vendor"]', modal);
    const elColl  = md$('[data-md="collection"]', modal);
    const elSpeci = md$('[data-md="specifier"]', modal);
    const elJob   = md$('[data-md="jobName"]', modal);
    const elSpecs = md$('[data-md="specs"]', modal);
    const elRes   = md$('[data-md="resources"]', modal);

    const listContainer = modal.querySelector('#notes-list-container');
    const elInput = md$('[data-md="note-input"]', modal);
    const elBtn   = md$('[data-md="note-submit"]', modal);
    const elStat  = md$('[data-md="note-status"]', modal);

    // Reset UI
    mdSetText(elTitle,'—'); mdSetSrc(elImg,''); mdSetText(elDate,'—');
    mdSetText(elVend,'—'); mdSetText(elColl,'—'); mdSetText(elSpeci,'—'); mdSetText(elJob,'—');
    mdSetRichText(elSpecs,''); mdSetRichText(elRes,'');
    if (elInput) elInput.value = '';
    if (elBtn) elBtn.disabled = true;
    if (elStat) elStat.textContent = '';

    // Fetch sample
    const sref = db.collection('users').doc(uid).collection('sampleRequests').doc(sampleId);
    const ss = await sref.get();
    if (!ss.exists) {
      mdSetText(elTitle, 'Sample not found');
      openSampleModal();
      return;
    }
    const sample = ss.data() || {};

    // Paint basics
    mdSetText(elTitle, sample.material ?? 'Sample');
    const d = sample.createdAt?.toDate ? sample.createdAt.toDate()
          : (sample.date ? new Date(sample.date) : null);
    mdSetText(elDate, (d && !isNaN(d)) ? d.toLocaleDateString() : '—');
    mdSetText(elSpeci, sample.specifier ?? '—');
    mdSetText(elJob,   sample.jobName ?? '—');

    // Load product extras (vendor, collection[], image, rich text fields)
    try {
    const prod = await fetchProductForSample(db, sample);
    if (prod) {
        // Vendor
        const vendor = prod.vendor ?? prod.vendorName ?? prod.supplier ?? prod.brand ?? '—';
        mdSetText(elVend, vendor);

        // Collection (array or string; handle alternative keys)
        const col =
        Array.isArray(prod.collection) ? prod.collection :
        Array.isArray(prod.collections) ? prod.collections :
        (prod.collectionName ? [prod.collectionName] : (prod.collection || prod.collections || []));
        const colText = Array.isArray(col) ? col.filter(Boolean).join(', ') : (col || '—');
        mdSetText(elColl, colText || '—');

        // Image (several common shapes)
        const imageUrl =
            prod.image ||
            (Array.isArray(prod.images) && (typeof prod.images[0] === 'string' ? prod.images[0] : (prod.images[0]?.url))) ||
            prod.media?.hero ||
            prod.heroImage ||
            '';
        if (imageUrl) mdSetSrc(elImg, imageUrl);
        if (elImg) {
        elImg.onerror = () => { elImg.onerror = null; mdSetSrc(elImg, ''); };
        elImg.setAttribute('alt', (sample.material || 'Product image') + (vendor && vendor !== '—' ? ` – ${vendor}` : ''));
        }

        // Specifications / Resources (rich text)
        const specsHtml     = prod.specifications || prod.specs || prod.specsHtml || prod.specificationsHtml || '';
        const resourcesHtml = prod.resources || prod.resourcesHtml || '';
        if (elSpecs && specsHtml)     mdSetRichText(elSpecs, specsHtml);
        if (elRes   && resourcesHtml) mdSetRichText(elRes, resourcesHtml);
    }
    } catch (e) {
    console.warn('[sample modal] product fetch failed', e);
    }


    // Open modal now that first paint is ready
    openSampleModal();

    // Notes live stream
    listenNotes({ db, uid, sampleId, listContainerEl: listContainer });

// --- Composer (replace existing block) ---
if (elInput && elBtn) {
  let btnRef = elBtn;                          // live reference to the current button

  const hasText = () => !!(elInput.value && elInput.value.trim().length);
  const enable  = () => { btnRef.disabled = !hasText(); };

  elInput.addEventListener('input', enable);
  enable();

  // remove old handlers by cloning, then rebind and update btnRef
  const freshBtn = btnRef.cloneNode(true);
  btnRef.parentNode.replaceChild(freshBtn, btnRef);
  btnRef = freshBtn;
  enable();

  // optional: Ctrl/Cmd + Enter to post
  elInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !btnRef.disabled) btnRef.click();
  });

  btnRef.addEventListener('click', async () => {
    const txt = (elInput.value || '').trim();
    if (!txt) return;
    try {
      btnRef.disabled = true;
      if (elStat) elStat.textContent = 'Posting…';

      // USE the batch helper that also updates parent.additionalInfo
      await addSampleNote({ db, uid, sampleId, text: txt });

      elInput.value = '';
      if (elStat) elStat.textContent = 'Posted.';
    } catch (e){
      console.error('[notes] post error', e);
      if (elStat) elStat.textContent = 'Could not post note.';
    } finally {
      enable();
      setTimeout(() => { if (elStat) elStat.textContent = ''; }, 1200);
    }
  });
}


  // ---- delegate clicks from the samples table to open the modal ----
function wireSampleRowClicksOnce(){
  if (window.__samplesClickDelegated) return;
  window.__samplesClickDelegated = true;

  document.addEventListener('click', (e) => {
    // only rows inside the samples tbody; skip the template
    const tr = e.target.closest('#samples-tbody tr[data-id]:not([data-row="template"])');
    if (!tr) return;

    const sampleId = tr.getAttribute('data-id');
    const ctx = window.portalCtx;
    if (!sampleId || !ctx?.db || !ctx?.auth?.currentUser) return;

    console.debug('[samples] open modal →', sampleId);
    loadAndShowSampleModal({ db: ctx.db, uid: ctx.auth.currentUser.uid, sampleId });
  });

  console.debug('[samples] row click wired (global delegate)');
}


  // Expose for debugging if you want:
  window.__openSampleModal = (id) => {
    const ctx = window.portalCtx;
    if (!ctx?.db || !ctx?.auth?.currentUser || !id) return;
    loadAndShowSampleModal({ db: ctx.db, uid: ctx.auth.currentUser.uid, sampleId: id });
  };

    window.__openSampleModal_debug = async (id) => {
    const ctx = window.portalCtx;
    console.log('open →', id);
    const modal = document.querySelector('[data-modal="sample"]');
    const sref = ctx.db.collection('users').doc(ctx.auth.currentUser.uid)
        .collection('sampleRequests').doc(id);
    const ss = await sref.get();
    console.log('doc?', ss.exists);
    const sample = ss.data() || {};
    console.log('paint basics…');
    modal.querySelector('[data-md="title"]')?.textContent = sample.material || 'Sample';
    console.log('open modal…');
    modal.style.display = 'block';
    console.log('product fetch…');
    try { await fetchProductForSample(ctx.db, sample); console.log('product ok'); }
    catch (e) { console.error('product error', e); }
    };

  // =================== /SAMPLE MODAL SCRIPT ===================
}




// ======== PROFILE UI (load/save users/{uid}) ========
function pr$(form, sel){ return form ? form.querySelector(sel) : null; }
function pr$$(form, sel){ return form ? Array.from(form.querySelectorAll(sel)) : []; }

function setProfileStatus(form, msg, kind){
    const s = pr$(form, '[data-pr="status"]');
    if (!s) return;
    s.textContent = msg || '';
    s.classList.remove('ok','err','info');
    if (kind) s.classList.add(kind);
    }

// Fill inputs/selects from a plain object
function fillProfileForm(form, data){
    pr$$(form, '[data-pr]').forEach(el => {
        const key = el.getAttribute('data-pr');
        if (!key) return;
        // Skip non-fields (status, buttons)
        if (key === 'status' || key === 'submit' || key === 'cancel') return;

        const v = data && data[key] != null ? String(data[key]) : '';
        if ('value' in el) el.value = v;
    });
    }

// Read form; includeEmpty = true means keep keys with '' so we can detect deletions.
function readProfileForm(form, { includeEmpty = false } = {}) {
    const out = {};
    pr$$(form, '[data-pr]').forEach(el => {
        const key = el.getAttribute('data-pr');
        if (!key || key === 'status' || key === 'submit' || key === 'cancel') return;
        const val = ('value' in el) ? String(el.value ?? '').trim() : '';
        if (includeEmpty || val !== '') out[key] = val;
    });
    return out;
    }


// Compare two plain objects shallowly
function isShallowEqual(a, b){
    const ak = Object.keys(a), bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    for (const k of ak) if (a[k] !== b[k]) return false;
    return true;
    }

    async function loadUserProfile(db, uid){
    const snap = await db.collection('users').doc(uid).get();
    return snap.exists ? (snap.data() || {}) : {};
    }

    // Write only these fields; add updatedAt server time if you want
    async function saveUserProfile(db, uid, nextData, prevData = {}){
        const payload = { updatedAt: firebase.firestore.FieldValue.serverTimestamp() };

        // write/merge non-empty fields
        for (const [k, v] of Object.entries(nextData)) {
            if (v !== '') payload[k] = v;
        }

        // delete fields that were present before but are now blank
        for (const k of Object.keys(prevData)) {
            if ((nextData[k] ?? '') === '') {
            payload[k] = firebase.firestore.FieldValue.delete();
            }
        }

        return db.collection('users').doc(uid).set(payload, { merge:true });
    }


    function initProfileUI(ctx){
    const form = document.querySelector('[data-pr="form"]');
    if (!form) return;
    if (form.dataset.prInit === '1') return; // prevent double-binding
    form.dataset.prInit = '1';

    // Make sure selects have options first
    populateProfileSelects(form);
    wireCountrySubdivisionDependency(form);



    let initial = {}; // snapshot loaded from Firestore


    function computeDirty(){
    // For dirty-check, include empties so we see deletes
    const current = readProfileForm(form, { includeEmpty: true });

    // Build a baseline with ALL current keys (not just non-empty)
    const subsetInitial = {};
    Object.keys(current).forEach(k => { subsetInitial[k] = initial[k] ?? ''; });

    // Also consider keys that were previously set but are now cleared
    Object.keys(initial).forEach(k => {
        if (!(k in current)) current[k] = ''; // user cleared this field
    });

    return { current, dirty: !isShallowEqual(current, subsetInitial) };
    }


    function refresh(){
        const { dirty } = computeDirty();
        // Enable Update only if something changed
        pr$$(form, '[data-pr="submit"]').forEach(btn => btn.disabled = !dirty);
        // Optional: clear status while editing
        // setProfileStatus(form, '');
    }

    // Live refresh on any input/select change
    form.addEventListener('input', refresh);
    form.addEventListener('change', refresh);

    // Cancel = revert to initial snapshot
    form.addEventListener('click', async (e) => {
        const cancelBtn = e.target.closest('[data-pr="cancel"]');
        if (cancelBtn) {
        e.preventDefault();
        fillProfileForm(form, initial);
        syncSubdivisionsToCountry(form);
        const st = form.querySelector('[data-pr="state"]');
        if (st) setSelectToValueOrText(st, initial.state || '');
        refresh();
        }
    });

    // Submit = save to Firestore
    form.addEventListener('click', async (e) => {
    const submitBtn = e.target.closest('[data-pr="submit"]');
    if (!submitBtn) return;
    e.preventDefault();
    if (submitBtn.disabled) return;

    try {
        // For saving, drop empties (we handle deletes in saveUserProfile)
        const raw = readProfileForm(form, { includeEmpty: false });
        const nextData = normalizeForSave(raw);
        const { current: currentForDirty } = computeDirty(); // includes '' for deletes

        await saveUserProfile(
        ctx.db,
        ctx.auth.currentUser.uid,
        nextData,
        initial                // prev snapshot to decide deletions
        );

        // New baseline should match what's now stored:
        // take previous, apply writes, then remove deleted keys
        let nextInitial = { ...initial, ...nextData };
        Object.keys(initial).forEach(k => {
        if (!Object.prototype.hasOwnProperty.call(nextData, k) && (initial[k] ?? '') !== '')
            delete nextInitial[k]; // deleted
        });
        initial = nextInitial;

        setProfileStatus(form, 'Profile updated successfully.', 'ok');
        refresh();
    } catch (err) {
        console.error('[profile] save error', err);
        setProfileStatus(form, 'Could not update profile. Please try again.', 'err');
    }
    });


    // Public API: load + fill (call this after auth)
    form.__loadProfile = async function(uid){
        try {
        setProfileStatus(form, 'Loading profile…', 'info');
        initial = await loadUserProfile(ctx.db, uid);

        // Only copy the keys that actually exist on the form (avoids surprises)
        const currentKeys = Object.keys(readProfileForm(form, { includeEmpty: true }));
        const filtered = {};
        currentKeys.forEach(k => filtered[k] = initial[k] ?? '');
        initial = filtered;

        // Normalize loaded data to codes so selects can match option values
        if (initial.country) {
        const code = resolveCountryCode(initial.country); // accepts "US" or "United States"
        if (code) initial.country = code;
        }

        // 1) Fill COUNTRY first
        const countrySel = form.querySelector('[data-pr="country"]');
        if (countrySel && initial.country) {
        // make sure the countries list is already there (it is, from populateProfileSelects)
        setSelectToValueOrText(countrySel, initial.country);
        }
        
        // 2) Build STATE/PROVINCE options based on country
        syncSubdivisionsToCountry(form);

        // 3) Now explicitly set the STATE/PROVINCE by code or label
        const stateSel = form.querySelector('[data-pr="state"]');
        if (stateSel && initial.state) {
        setSelectToValueOrText(stateSel, initial.state); // works for "FL" or "Florida"
        // Also normalize stored value to the code if you want the form state clean:
        const s = stateSel.value; if (s) initial.state = s;
        }


        fillProfileForm(form, initial);
        setProfileStatus(form, '', null);
        refresh();

        // NEW: expose the loaded profile + paint header
        ctx.profile = initial;
        paintUserHeader(ctx);

        } catch (err) {
        console.error('[profile] load error', err);
        setProfileStatus(form, 'Failed to load profile.', 'err');
        }
    };
    }
    // ======== /PROFILE UI ========



})();
