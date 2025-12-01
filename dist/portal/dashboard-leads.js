(function () {
      // ===================== LEADS (ADMIN-ONLY) =====================
  // Sources: 'leads', 'guestSampleRequests', 'guestQuoteRequests',
  //          collectionGroup('users/*/quoteRequests'), collectionGroup('users/*/sampleRequests')

  const __leads = {
    all: [],
    filtered: [],
    page: 0,
    pageSize: 50,
    wired: false,
  };

  // Small DOM helpers (reuse your style)
  function l$(sel, r=document){ return r.querySelector(sel); }
  function l$$(sel, r=document){ return Array.from(r.querySelectorAll(sel)); }
  function lset(el, v){ if (el) el.textContent = (v ?? '').toString(); }
  function lshow(el, on=true){ if (el) el.style.display = on ? '' : 'none'; }

  // Admin gate for UI
  function enforceLeadsVisibility(isAdmin) {
    lshow(l$('[data-db="leads-tab-link"]'), !!isAdmin);
    lshow(l$('[data-db="leads-section"]'), !!isAdmin);
  }

  // Formatting
  function lFmtDate(ms){
    if (!ms) return '—';
    try { return new Date(ms).toLocaleString([], {year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit'}); }
    catch { return '—'; }
  }
  function lFmtPhone(p){
    if (!p) return '';
    const d = (''+p).replace(/\D/g,'');
    return d.length===10 ? `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` : p;
  }

  function tsToMsGeneric(v){
  if (!v) return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') { const t = Date.parse(v); return isNaN(t) ? 0 : t; }
  return v.toDate ? v.toDate().getTime() : 0;
}


  // Normalizer — unify all shapes into one row model
  function normalizeLeadDoc(docSnap, source){
    const d = docSnap.data() || {};

    const tsToMs = (v) => {
      if (!v) return 0;
      if (typeof v === 'number') return v;
      if (typeof v === 'string') { const t = Date.parse(v); return isNaN(t) ? 0 : t; }
      if (v.toDate) return v.toDate().getTime();
      return 0;
    };

    const name = pickName(d);
    const company = firstNonEmpty(d, ['company','organization','org','business']);
    const email = firstNonEmpty(d, ['email','mail','contactEmail','companyEmail']);
    const phone = pickPhone(d);
    const address = pickAddress(d);
    const product = pickProduct(d);
    const description = pickDescription(d);
    const created = tsToMsGeneric(firstNonEmpty(d,['createdAt','submittedAt','timestamp','created','created_on','created_at']));
    const updated = Math.max(tsToMsGeneric(firstNonEmpty(d, ['latestNoteAt','updatedAt'])), created);
    const seen    = tsToMsGeneric(firstNonEmpty(d, ['adminSeenAt','seenAt','readAt','viewedAt']));

    return {
      id: docSnap.id,
      refPath: docSnap.ref.path,
      source,
      createdAt: created,
      updatedAt: updated,
      seenAt: seen,
      unread: !seen || updated > seen,
      name: String(name || '').trim(),
      company: String(toStr(company)).trim(),
      email: String(toStr(email)).toLowerCase().trim(),
      phone: String(toStr(phone)).trim(),
      address: String(toStr(address)).trim(),
      product: String(toStr(product)).trim(),
      description: String(toStr(description)).trim(),
      raw: d
    };
  }

    async function markLeadSeen(db, lead){
    try {
      const ref = db.doc(lead.refPath);
      const now = firebase.firestore.FieldValue.serverTimestamp();
      const uid = window.portalCtx?.auth?.currentUser?.uid || null;

      const payload = { adminSeenAt: now };
      if (uid) payload[`adminSeenBy.${uid}`] = now; // per-admin trail (optional)

      await ref.set(payload, { merge: true });

      // keep local state + UI in sync immediately
      lead.unread = false;
      lead.seenAt = Date.now();
    } catch (e) {
      console.warn('[leads] markLeadSeen failed', e);
    }
  }


  async function tryGet(q, label){
    try { return await q.get(); }
    catch (err) {
      console.error(`[leads] ${label} failed`, err);
      return { empty:true, docs:[] };
    }
  }


  async function fetchAllLeads(db, limitPer=500){
    const col = (n) => db.collection(n);
    const cg  = (n) => db.collectionGroup(n);

    const qLeads   = tryGet(col('leads').orderBy('createdAt','desc').limit(limitPer), 'leads');
    const qGSamp   = tryGet(col('guestSampleRequests').orderBy('createdAt','desc').limit(limitPer), 'guestSampleRequests');
    const qGQuote  = tryGet(col('guestQuoteRequests').orderBy('createdAt','desc').limit(limitPer), 'guestQuoteRequests');

    const qUQuotes = tryGet(cg('quoteRequests').orderBy('createdAt','desc').limit(limitPer),
                            'users/*/quoteRequests (collectionGroup)');
    const qUSamps  = tryGet(cg('sampleRequests').orderBy('createdAt','desc').limit(limitPer),
                            'users/*/sampleRequests (collectionGroup)');

    const [a,b,c,d,e] = await Promise.all([qLeads, qGSamp, qGQuote, qUQuotes, qUSamps]);

    const pack = (qs, src) => (qs.docs||[]).map(s => normalizeLeadDoc(s, src));
    const out = [
      ...pack(a,'leads'),
      ...pack(b,'guestSampleRequests'),
      ...pack(c,'guestQuoteRequests'),
      ...pack(d,'users/*/quoteRequests'),
      ...pack(e,'users/*/sampleRequests'),
    ];
    out.sort((x,y)=> (y.createdAt||0) - (x.createdAt||0));
    return out;
  }

  function renderLeads() {
  const tbody = l$('[data-db="leads-tbody"]');
  const tpl   = l$('[data-db="leads-row-template"]');
  if (!tbody || !tpl) return;

  // grab controls FIRST
  const btnPrev = l$('[data-db="leads-prev"]');
  const btnNext = l$('[data-db="leads-next"]');
  const lbl     = l$('[data-db="leads-page-label"]');

  // clamp page if pageSize/search changed
  const totalPages = Math.max(1, Math.ceil(__leads.filtered.length / __leads.pageSize));
  if (__leads.page > totalPages - 1) __leads.page = totalPages - 1;
  if (__leads.page < 0) __leads.page = 0;

  // render rows
  const start = __leads.page * __leads.pageSize;
  const end   = start + __leads.pageSize;

  // clear body
  Array.from(tbody.children).forEach(ch => { if (ch !== tpl) ch.remove(); });

  const frag = document.createDocumentFragment();
  __leads.filtered.slice(start, end).forEach(lead => {
    const node = document.importNode(tpl.content, true);
    const row  = l$('[data-db="lead-row"]', node);
    if (lead.unread) row.classList.add('is-unread'); else row.classList.remove('is-unread');
    lset(l$('[data-f="name"]', row),        lead.name || '-');
    lset(l$('[data-f="company"]', row),     lead.company || '-');
    lset(l$('[data-f="email"]', row),       lead.email || '-');
    lset(l$('[data-f="created"]', row),     lFmtDate(lead.createdAt) || '-'); // NEW
    lset(l$('[data-f="phone"]', row),       lFmtPhone(lead.phone) || '-');
    lset(l$('[data-f="address"]', row),     lead.address || '-');
    lset(l$('[data-f="product"]', row),     lead.product || '-');
    lset(l$('[data-f="description"]', row), lead.description || '-');
    row.addEventListener('click', async () => {
      openLeadModal(lead);
      if (lead.unread) {
        row.classList.remove('is-unread'); // instant UI feedback
        await markLeadSeen(window.portalCtx.db, lead);
      }
    });
    frag.appendChild(node);
  });
  tbody.appendChild(frag);

  if (lbl) lbl.textContent = `Page ${__leads.page + 1}`;

  // enable/disable nav
  const hasPrev = __leads.page > 0;
  const hasNext = end < __leads.filtered.length;
  if (btnPrev) btnPrev.disabled = !hasPrev;
  if (btnNext) btnNext.disabled = !hasNext;

  console.log('rows:', __leads.filtered.length, 'pageSize:', __leads.pageSize);
}

    function get(d, path) {
    try { return path.split('.').reduce((o,k)=> (o && o[k] !== undefined ? o[k] : null), d) ?? null; }
    catch { return null; }
  }

  function firstNonEmpty(d, paths) {
    for (const p of paths) {
      const v = get(d, p);
      if (v != null && String(toStr(v)).trim() !== '') return v;
    }
    return null;
  }
  function pickName(d) {
    const nm = get(d, 'name');
    if (nm && typeof nm === 'object') {
      const full = get(nm, 'full');
      if (full) return full;
      const joined = [get(nm,'first'), get(nm,'last')].filter(Boolean).join(' ').trim();
      if (joined) return joined;
    }
    const joined = [firstNonEmpty(d,['firstName','givenName','first','fname']),
                    firstNonEmpty(d,['lastName','surname','last','lname'])]
                  .map(toStr).filter(Boolean).join(' ').trim();
    return firstNonEmpty(d,['name','fullName','contactName']) || joined || '';
  }
  function pickPhone(d) {
    return firstNonEmpty(d, ['companyPhone','phone','telephone','tel','mobile','cell']);
  }
  function pickProduct(d) {
    return firstNonEmpty(d, [
      'product','productName','item',
      'material','materialName','requestedProduct',
      'title','product_title','sku'
    ]);
  }
  function pickDescription(d) {
    // If you truly want additionalInfo to go under *address* instead, move 'additionalInfo'
    // into pickAddress() and remove it here.
    return firstNonEmpty(d, ['description','additionalInfo','message','details','notes','comment','request']);
  }


  function pickAddress(d) {
    // Treat companyAddress/address as either objects *or* plain strings (line1)
    const line1 = firstNonEmpty(d, [
      'companyAddress.line1','address.line1',
      'companyAddress.address1','address.address1',
      'companyAddress.street1','address.street1',
      'companyAddress','address',
      'line1','address1','street1','street',
      'shipTo.line1','shippingAddress.line1'
    ]);

    const line2 = firstNonEmpty(d, [
      'companyAddress.line2','address.line2',
      'companyAddress.address2','address.address2',
      'companyAddress.street2','address.street2',
      'line2','address2','street2',
      'shipTo.line2','shippingAddress.line2',
      'unit','apt','suite'
    ]);

    const city = firstNonEmpty(d, [
      'companyAddress.city','address.city','city',
      'shipTo.city','shippingAddress.city'
    ]);

    const state = firstNonEmpty(d, [
      'companyAddress.state','address.state','state','province','region',
      'shipTo.state','shipTo.province','shippingAddress.state','shippingAddress.province'
    ]);

    const postal = firstNonEmpty(d, [
      'companyAddress.zip','address.zip','zip','postal','postalCode','postcode',
      'shipTo.zip','shipTo.postal','shippingAddress.zip','shippingAddress.postal'
    ]);

    const country = firstNonEmpty(d, [
      'companyAddress.country','address.country','country',
      'shipTo.country','shippingAddress.country'
    ]);

    // Build, trim, and de-dupe in case some fields repeat
    const parts = [line1, line2, city, state, postal, country]
      .map(toStr)
      .map(s => s.replace(/\s+/g, ' ').trim())
      .filter(Boolean);

    const seen = new Set();
    const uniq = [];
    for (const p of parts) { const k = p.toLowerCase(); if (!seen.has(k)) { seen.add(k); uniq.push(p); } }

    // If you want multi-line in the cell, use '\n' and CSS `white-space: pre-line`
    return uniq.join(', ');
  }


function toStr(v) {
  if (v == null) return '';
  if (Array.isArray(v)) return v.filter(Boolean).join(', ');
  if (typeof v === 'object') {
    const nm = [v.full, v.name, v.title, [v.firstName||v.first, v.lastName||v.last].filter(Boolean).join(' ')].find(Boolean);
    const addr = [v.line1||v.address1||v.street1, v.line2||v.address2||v.street2, v.city, v.state||v.province, v.zip||v.postal, v.country]
      .filter(Boolean).join(', ');
    const nice = nm || addr;
    if (nice) return String(nice);
    try { return JSON.stringify(v); } catch { return String(v); }
  }
  return String(v);
}
  
function lower(v) { return toStr(v).toLowerCase(); }

  function applyLeadsSearch(term){
    const t = lower(term || '');
    if (!t) {
      __leads.filtered = __leads.all.slice();
      __leads.page = 0;
      console.debug('[leads] search cleared; total', __leads.filtered.length); // ← HERE
      return;
    }

    __leads.filtered = __leads.all.filter(l => {
      const nm = lower(l.name);
      const co = lower(l.company);
      const em = lower(l.email);
      const pr = lower(l.product);
      return nm.startsWith(t) || co.includes(t) || em.includes(t) || pr.includes(t);
    });
    __leads.page = 0;
    console.debug('[leads] search applied', { term: t, results: __leads.filtered.length }); // ← HERE
  }

function wireLeadsControlsOnce(){
  if (__leads.wired) return;
  __leads.wired = true;
  console.debug('[leads] controls wired');

  // pick up initial page size from DOM if present
  const pageSzEl = document.querySelector('[data-db="leads-page-size"]');
  if (pageSzEl) {
    const v = parseInt(
      pageSzEl.value || pageSzEl.getAttribute('data-value') || pageSzEl.getAttribute('data-size') || '',
      10
    );
    if (Number.isFinite(v) && v > 0) __leads.pageSize = v;
  }

  // DELEGATED: page-size changes (works for native selects *and* custom selects that swap DOM)
  document.addEventListener('change', (e) => {
    const el = e.target.closest('[data-db="leads-page-size"]');
    if (!el) return;

    const n = parseInt(
      el.value || el.getAttribute('data-value') || el.getAttribute('data-size') || '',
      10
    );
    __leads.pageSize = Number.isFinite(n) && n > 0 ? n : 50;
    __leads.page = 0;
    console.debug('[leads] page-size →', __leads.pageSize);
    renderLeads();
  }, true);

  // DELEGATED: search (debounced)
  document.addEventListener('input', (e) => {
    const el = e.target.closest('[data-db="leads-search"]');
    if (!el) return;
    clearTimeout(__leads._searchT);
    __leads._searchT = setTimeout(() => {
      console.debug('[leads] search →', el.value);   // ← HERE
      applyLeadsSearch(el.value || '');
      console.debug('[leads] search results', __leads.filtered.length); // ← HERE (optional)
      renderLeads();
    }, 250);
  }, true);

  // DELEGATED: prev/next (prevents form submits & follows replaced nodes)
  document.addEventListener('click', (e) => {
    const prev = e.target.closest('[data-db="leads-prev"]');
    if (prev) {
      e.preventDefault();
      console.debug('[leads] prev click');           // ← HERE
      if (__leads.page > 0) { __leads.page--; renderLeads(); }
      return;
    }

    const next = e.target.closest('[data-db="leads-next"]');
    if (next) {
      e.preventDefault();
      console.debug('[leads] next click');           // ← HERE
      const nextStart = (__leads.page + 1) * __leads.pageSize;
      if (nextStart < __leads.filtered.length) { __leads.page++; renderLeads(); }
    }
  }, true);

  wireLeadModalCloseOnce();
}

  // ===== Notes (Lead modal) =====
  let __leadNotesUnsub = null;
  function stopLeadNotes(){ if (typeof __leadNotesUnsub === 'function'){ __leadNotesUnsub(); __leadNotesUnsub = null; } }

  function lnFormatStamp(ts){
    const d = ts?.toDate ? ts.toDate() : (ts ? new Date(ts) : null);
    return (d && !isNaN(d)) ? d.toLocaleString() : '';
  }

  function paintLeadNotesList(containerEl, snap){
    if (!containerEl) return;
    const tpl = containerEl.querySelector('[data-db="lead-note-template"]');
    if (!tpl) return;

    // clear all rendered rows (keep template)
    Array.from(containerEl.children).forEach(ch => { if (ch !== tpl) ch.remove(); });

    if (snap.empty){
      const node = document.importNode(tpl.content, true);
      const row  = node.querySelector('.note-row') || node.firstElementChild;
      const t = node.querySelector('[data-n="text"]');
      const d = node.querySelector('[data-n="date"]');
      if (t) t.textContent = 'No notes yet.';
      if (d) d.textContent = '';
      containerEl.appendChild(node);
      return;
    }

    snap.forEach(doc => {
      const n = doc.data() || {};
      const node = document.importNode(tpl.content, true);
      const t = node.querySelector('[data-n="text"]');
      const d = node.querySelector('[data-n="date"]');
      if (t) t.textContent = (n.text || n.note || n.message || '').trim();
      if (d) d.textContent = lnFormatStamp(n.createdAt);
      containerEl.appendChild(node);
    });
  }

  function listenLeadNotes({ db, refPath, listContainerEl }){
    stopLeadNotes();
    const ref = db.doc(refPath).collection('notes').orderBy('createdAt','desc');
    __leadNotesUnsub = ref.onSnapshot(snap => paintLeadNotesList(listContainerEl, snap));
  }

  async function postLeadNote({ db, refPath, text, authorUid }){
    const parentRef = db.doc(refPath);
    const noteRef   = parentRef.collection('notes').doc();
    const now = firebase.firestore.FieldValue.serverTimestamp();
    const clean = String(text || '').trim();

    const batch = db.batch();
    batch.set(noteRef, { text: clean, authorUid: authorUid || '', createdAt: now });
    // denormalize latest onto parent (optional but useful)
    batch.set(parentRef, { latestNote: clean, latestNoteAt: now }, { merge: true });
    await batch.commit();
  }
  // ===== /Notes (Lead modal) =====



  function openLeadModal(lead){
    const modal = l$('[data-db="lead-modal"]'); if (!modal) return;
    lset(l$('[data-f="modal-source"]', modal), `comes from ${lead.source}`);
    lset(l$('[data-f="modal-created"]', modal), `Created: ${lFmtDate(lead.createdAt)}`);
    lset(l$('[data-f="modal-name"]', modal), lead.name || '—');
    lset(l$('[data-f="modal-company"]', modal), lead.company || '—');
    lset(l$('[data-f="modal-email"]', modal), lead.email || '—');
    lset(l$('[data-f="modal-phone"]', modal), lFmtPhone(lead.phone) || '—');
    lset(l$('[data-f="modal-address"]', modal), lead.address || '—');
    lset(l$('[data-f="modal-product"]', modal), lead.product || '—');
    lset(l$('[data-f="modal-description"]', modal), lead.description || '—');
    lset(l$('[data-f="modal-refpath"]', modal), lead.refPath || '');

      // --- NEW: notes wiring ---
    const db  = window.portalCtx?.db;
    const uid = window.portalCtx?.auth?.currentUser?.uid || '';

    const listContainer = l$('[data-db="lead-notes-list"]', modal);
    const elInput = l$('[data-db="lead-note-input"]', modal);
    const elBtn   = l$('[data-db="lead-note-submit"]', modal);
    const elStat  = l$('[data-db="lead-note-status"]', modal);

    if (listContainer && db && lead.refPath) {
      listenLeadNotes({ db, refPath: lead.refPath, listContainerEl: listContainer });
    }

    if (elInput && elBtn) {
      let btnRef = elBtn;
      elInput.value = '';
      const enable = () => { btnRef.disabled = !(elInput.value && elInput.value.trim().length); };
      elInput.addEventListener('input', enable); enable();

      // replace to drop old listeners
      const fresh = btnRef.cloneNode(true);
      btnRef.parentNode.replaceChild(fresh, btnRef);
      btnRef = fresh; enable();

      elInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !btnRef.disabled) btnRef.click();
      });

      btnRef.addEventListener('click', async () => {
        const txt = (elInput.value || '').trim();
        if (!txt || !db || !lead.refPath) return;
        try {
          btnRef.disabled = true;
          if (elStat) elStat.textContent = 'Posting…';
          await postLeadNote({ db, refPath: lead.refPath, text: txt, authorUid: uid });
          elInput.value = '';
          if (elStat) elStat.textContent = 'Posted.';
        } catch (e) {
          console.error('[lead notes] post error', e);
          if (elStat) elStat.textContent = 'Could not post note.';
        } finally {
          enable();
          setTimeout(() => { if (elStat) elStat.textContent = ''; }, 1200);
        }
      });
    }
    // --- /NEW ---


    lshow(modal, true);



  }

  function wireLeadModalCloseOnce(){
    const modal = l$('[data-db="lead-modal"]');
    const btn   = l$('[data-db="lead-modal-close"]');
    if (!modal || modal.dataset.leadsInit === '1') return;
    modal.dataset.leadsInit = '1';

    btn?.addEventListener('click', () => { lshow(modal, false); stopLeadNotes(); });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { lshow(modal, false); stopLeadNotes(); }
    });
  }

  async function initLeadsUI(ctx){
    // Hide by default, then reveal if admin
    enforceLeadsVisibility(false);

    const isAdmin = !!ctx.admin;
    enforceLeadsVisibility(isAdmin);
    if (!isAdmin) return;

    // Wire once + load
    wireLeadsControlsOnce();

    try {
      __leads.all = await fetchAllLeads(ctx.db, 500);
      __leads.filtered = __leads.all.slice();
      renderLeads();
    } catch (e) {
      console.error('[leads] load failed', e);
    }
  }
  // =================== /LEADS (ADMIN-ONLY) ===================
  window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, {
    initLeadsUI,
    enforceLeadsVisibility,
  });
})();