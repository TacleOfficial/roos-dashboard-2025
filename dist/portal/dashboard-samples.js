 (function () {
  const { qs, qsa, fmt, DEFAULT_EMPTY, isEmptyValue, fallbackFor } = window.RoosDash;
 // =================== SAMPLE MODAL SCRIPT (entire block) ==================
  // ---- tiny DOM helpers (namespaced to avoid collisions) ----
  function md$(sel, r = document) { return r.querySelector(sel); }
  function mdShow(el) { if (el) el.style.display = 'block'; }
  function mdHide(el) { if (el) el.style.display = 'none'; }
  function mdSetText(el, v) { if (el) el.textContent = (v ?? '—'); }
  function mdSetSrc(el, v) { if (el) el.setAttribute('src', v || ''); }

  // Safe rich text (no innerHTML)
  function mdSetRichText(el, html) {
    if (!el) return;                 // ← add this line
    while (el.firstChild) el.removeChild(el.firstChild);
    if (!html || typeof html !== 'string') return;

    const allowed = new Set(['P', 'A', 'STRONG', 'EM', 'UL', 'OL', 'LI', 'BR', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN']);
    const doc = new DOMParser().parseFromString(html, 'text/html');

    function cloneSafe(node, parent) {
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

  async function fetchProductForSample(db, sample) {
    // 0) productRef (full path like 'exclusive_products/abc')
    if (sample.productRef && typeof sample.productRef === 'string') {
      const key = `ref:${sample.productRef}`;
      if (__productCache.has(key)) return __productCache.get(key);
      try {
        const d = await db.doc(sample.productRef).get();
        const val = d.exists ? { id: d.id, ...d.data() } : null;
        __productCache.set(key, val);
        if (val) { console.log('[product] via productRef', sample.productRef); return val; }
      } catch (e) { console.warn('[product] productRef get failed', e); }
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
      } catch (e) { console.warn('[product] id get failed', e); }
    }

    const tryEq = async (field, value) => {
      const key = `${field}:${value}`;
      if (__productCache.has(key)) return __productCache.get(key);
      const snap = await db.collection('exclusive_products').where(field, '==', value).limit(1).get();
      const val = !snap.empty ? { id: snap.docs[0].id, ...snap.docs[0].data() } : null;
      __productCache.set(key, val);
      if (val) console.log(`[product] via ${field} ==`, value);
      return val;
    };

    // 2) slug (both kebab and raw)
    const rawSlug = sample.materialSlug || sample.slug || sample.material;
    if (rawSlug) {
      const norm = String(rawSlug).trim();
      const kebab = norm.toLowerCase().replace(/\s+/g, '-');
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
  function stopNotesListener() { if (typeof __notesUnsub === 'function') { __notesUnsub(); __notesUnsub = null; } }

  function mdFormatStamp(ts) {
    const d = ts?.toDate ? ts.toDate() : (ts ? new Date(ts) : null);
    return (d && !isNaN(d)) ? d.toLocaleString() : '';
  }

  function paintNotesListWithTemplate(containerEl, snap) {
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

  function listenNotes({ db, uid, sampleId, listContainerEl }) {
    stopNotesListener();
    const ref = db.collection('users').doc(uid)
      .collection('sampleRequests').doc(sampleId)
      .collection('notes')
      .orderBy('createdAt', 'desc');

    __notesUnsub = ref.onSnapshot(snap => {
      paintNotesListWithTemplate(listContainerEl, snap);
    });
  }

  // Post a note (ROADMAP later: also set parent.additionalInfo via batch/CF)
  async function postNote({ db, uid, sampleId, text }) {
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
  function openSampleModal() {
    const m = md$('[data-modal="sample"]');
    if (!m) { console.warn('[sample modal] container [data-modal="sample"] not found'); return; }
    mdShow(m);
  }

  function closeSampleModal() { mdHide(md$('[data-modal="sample"]')); stopNotesListener(); }

  function wireModalCloseOnce() {
    const modal = md$('[data-modal="sample"]');
    if (!modal || modal.dataset.mdInit === '1') return;
    modal.dataset.mdInit = '1';

    const overlay = md$('[data-md="close"]', modal); // your backdrop
    const card = md$('[data-md="card"]', modal); // content panel

    overlay?.addEventListener('click', () => closeSampleModal());
    card?.addEventListener('click', (e) => e.stopPropagation());

    // Dedicated "Close" buttons also use data-md="close"
    modal.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-md="close"]');
      if (btn && btn !== overlay) closeSampleModal();
    });
  }


 // ---- main loader triggered on row click ----
async function loadAndShowSampleModal({ db, uid, sampleId }) {
  const modal = md$('[data-modal="sample"]');
  if (!modal) return;

  const elTitle = md$('[data-md="title"]', modal);
  const elImg = md$('[data-md="image"]', modal);
  const elDate = md$('[data-md="date"]', modal);
  const elVend = md$('[data-md="vendor"]', modal);
  const elColl = md$('[data-md="collection"]', modal);
  const elSpeci = md$('[data-md="specifier"]', modal);
  const elJob = md$('[data-md="jobName"]', modal);
  const elSpecs = md$('[data-md="specs"]', modal);
  const elRes = md$('[data-md="resources"]', modal);

  // Optional (only painted if present in your HTML)
  const elCat = md$('[data-md="category"]', modal);
  const elColor = md$('[data-md="color"]', modal);

  const listContainer = modal.querySelector('#notes-list-container');
  const elInput = md$('[data-md="note-input"]', modal);
  const elBtn = md$('[data-md="note-submit"]', modal);
  const elStat = md$('[data-md="note-status"]', modal);

  // Small helper to translate IDs -> Names via preloaded maps
  // mapName ∈ {'vendors','collections','categories','colors'}
  const mapId = (mapName, raw) => {
    const getName = (id) => {
      const s = (id == null ? '' : String(id).trim());
      if (!s) return '';
      const lookups = (window.RoosDash && window.RoosDash.__lookups) || {};
      const m = lookups[mapName];
      return (m && m.get(s)) || s;
    };
    return Array.isArray(raw)
      ? raw.map(getName).filter(Boolean).join(', ')
      : getName(raw);
  };


  // Reset UI
  mdSetText(elTitle, '—'); mdSetSrc(elImg, ''); mdSetText(elDate, '—');
  mdSetText(elVend, '—'); mdSetText(elColl, '—'); mdSetText(elSpeci, '—'); mdSetText(elJob, '—');
  if (elCat)   mdSetText(elCat, '—');
  if (elColor) mdSetText(elColor, '—');
  mdSetRichText(elSpecs, ''); mdSetRichText(elRes, '');
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
  mdSetText(elJob, sample.jobName ?? '—');

  // Load product extras (vendor/collection/category/color/image/specs/resources)
  let vendorName = '';
  let collectionName = '';
  let categoryName = '';
  let colorName = '';

  try {
    const prod = await fetchProductForSample(db, sample);
    if (prod) {
      // Vendor (resolve IDs → names)
      const vendorRaw = prod.vendorId ?? prod.vendorID ?? prod.vendor ?? prod.vendorName ?? prod.supplier ?? prod.brand ?? null;
      vendorName = mapId('vendors', vendorRaw);
      mdSetText(elVend, vendorName || '—');

      // Collection (resolve IDs → names; also handle array/string)
      const collRaw = prod.collectionId ?? prod.collectionID ?? prod.collection ?? prod.collections ?? prod.collectionName ?? null;
      collectionName = mapId('collections', collRaw) || (
        Array.isArray(collRaw) ? collRaw.filter(Boolean).join(', ') : (collRaw || '')
      );
      mdSetText(elColl, collectionName || '—');

      // Category (optional element)
      if (elCat) {
        const catRaw = prod.categoryId ?? prod.categoryID ?? prod.category ?? prod.categories ?? null;
        categoryName = mapId('categories', catRaw) || (
          Array.isArray(catRaw) ? catRaw.filter(Boolean).join(', ') : (catRaw || '')
        );
        mdSetText(elCat, categoryName || '—');
      }

      // Color (optional element)
      if (elColor) {
        const colorRaw = prod.colorId ?? prod.colorID ?? prod.color ?? prod.colour ?? null;
        colorName = mapId('colors', colorRaw) || (typeof colorRaw === 'string' ? colorRaw : '');
        mdSetText(elColor, colorName || '—');
      }

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
        const altVend = vendorName || (typeof vendorRaw === 'string' ? vendorRaw : '');
        elImg.setAttribute('alt', (sample.material || 'Product image') + (altVend ? ` – ${altVend}` : ''));
      }

      // Specifications / Resources (rich text)
      const specsHtml = prod.specifications || prod.specs || prod.specsHtml || prod.specificationsHtml || '';
      const resourcesHtml = prod.resources || prod.resourcesHtml || '';
      if (elSpecs && specsHtml) mdSetRichText(elSpecs, specsHtml);
      if (elRes && resourcesHtml) mdSetRichText(elRes, resourcesHtml);
    }
  } catch (e) {
    console.warn('[sample modal] product fetch failed', e);
  }

  // Fallback: if still blank, try IDs stored on the sample itself
  if ((elVend?.textContent || '—') === '—') {
    const vRaw = sample.vendorId ?? sample.vendor ?? null;
    const v = mapId('vendors', vRaw);
    if (v) mdSetText(elVend, v);
  }
  if ((elColl?.textContent || '—') === '—') {
    const cRaw = sample.collectionId ?? sample.collection ?? null;
    const c = mapId('collections', cRaw);
    if (c) mdSetText(elColl, c);
  }
  if (elCat && (elCat.textContent || '—') === '—') {
    const kRaw = sample.categoryId ?? sample.category ?? null;
    const k = mapId('categories', kRaw);
    if (k) mdSetText(elCat, k);
  }
  if (elColor && (elColor.textContent || '—') === '—') {
    const rRaw = sample.colorId ?? sample.color ?? null;
    const r = mapId('colors', rRaw);
    if (r) mdSetText(elColor, r);
  }

  // Open modal now that first paint is ready
  openSampleModal();

  // Notes live stream
  listenNotes({ db, uid, sampleId, listContainerEl: listContainer });

  // --- Composer (replace existing block) ---
  if (elInput && elBtn) {
    let btnRef = elBtn;

    const hasText = () => !!(elInput.value && elInput.value.trim().length);
    const enable = () => { btnRef.disabled = !hasText(); };

    elInput.addEventListener('input', enable);
    enable();

    const freshBtn = btnRef.cloneNode(true);
    btnRef.parentNode.replaceChild(freshBtn, btnRef);
    btnRef = freshBtn;
    enable();

    elInput.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !btnRef.disabled) btnRef.click();
    });

    btnRef.addEventListener('click', async () => {
      const txt = (elInput.value || '').trim();
      if (!txt) return;
      try {
        btnRef.disabled = true;
        if (elStat) elStat.textContent = 'Posting…';
        await addSampleNote({ db, uid, sampleId, text: txt });
        elInput.value = '';
        if (elStat) elStat.textContent = 'Posted.';
      } catch (e) {
        console.error('[notes] post error', e);
        if (elStat) elStat.textContent = 'Could not post note.';
      } finally {
        enable();
        setTimeout(() => { if (elStat) elStat.textContent = ''; }, 1200);
      }
    });
  }
}


  // ---- delegate clicks from the samples table to open the modal ----
  function wireSampleRowClicksOnce() {
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

  // ---------- SAMPLES TABLE HELPERS (patched for additionalInfo) ----------
  function formatSampleByProp(prop, raw) {
    if (raw == null) return '';
    if (prop === 'createdAt' || prop === 'date') return fmt.date(raw);
    if (prop === 'materials' || prop === 'material') return fmt.array(raw);
    if (Array.isArray(raw)) return fmt.array(raw);
    if (typeof raw === 'object') return JSON.stringify(raw);
    return String(raw);
  }

  function buildSampleRow(sampleData, { materialsText, latestNotesText } = {}) {
    const tbody = qs('#samples-tbody');
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

  function setSampleNotesCell(row, text) {
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
  async function fetchLatestNoteFromSubcol(db, uid, sampleId) {
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
    } catch (e) {
      console.error('[samples] fetch latest note failed', e);
      return '';
    }
  }

  async function addSampleNote({ db, uid, sampleId, text, authorUid }) {
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
    }, { merge: true });

    await batch.commit();
  }


  async function loadSamplesForUser(db, uid) {
    const tbody = qs('#samples-tbody');
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
  

  // =================== /SAMPLE MODAL SCRIPT ===================
    window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, {
    loadSamplesForUser,
    wireSampleRowClicksOnce,
    wireSampleModalCloseOnce: wireModalCloseOnce,
    mdSetRichText,
  });
})();
