(function () {
  const {
    qs,
    qsa,
    fmt,
    DEFAULT_EMPTY,
    isEmptyValue,
    fallbackFor,
    mapIdToName,
    mapIdsToNames,
  } = window.RoosDash;
  
    // ---------- PRODUCTS TABLE HELPERS ----------
  function formatProductCell(prop, raw) {
    if (raw == null) return '';
    if (prop === 'inStock') return fmt.boolYesNo(raw);
    if (Array.isArray(raw)) return fmt.array(raw);
    if (typeof raw === 'object' && raw.toDate) return fmt.date(raw);
    if (typeof raw === 'object') return JSON.stringify(raw);
    return String(raw);
  }

  function setImgProp(row, key, url) {
    const img = row.querySelector(`[data-prop-img="${key}"]`);
    if (!img) return;
    if (!url) {
      img.setAttribute('src', '');
      img.setAttribute('alt', '');
      return;
    }
    img.setAttribute('src', url);
    // try to form a descriptive alt using nearby text
    const name = (row.querySelector('[data-prop="formalName"]')?.textContent || '').trim();
    img.setAttribute('alt', (name ? name + ' – ' : '') + 'Product image');
    img.onerror = () => { img.onerror = null; img.setAttribute('src', ''); };
  }

  function buildProductRow(prod) {
    const tbody = qs('#products-tbody');
    const tplRow = tbody ? qs('[data-row="template"]', tbody) : null;
    if (!tbody || !tplRow) { console.warn('[products] missing #products-tbody or template'); return null; }

    const row = tplRow.cloneNode(true);
    row.removeAttribute('data-row');
    row.style.display = '';

    // Text cells
    qsa('[data-prop]', row).forEach(el => {
      const prop = el.getAttribute('data-prop');
      let val = prod[prop];

      // accept common alternative keys (be forgiving with your schema)
      if (val == null) {
        if (prop === 'formalName') val = prod.formalName ?? prod.name ?? prod.title ?? '';
        else if (prop === 'vendor') {
          // supports vendorId/vendor/vendorID, converts ID(s) -> Name(s)
          const raw = prod.vendorId ?? prod.vendorID ?? prod.vendor ?? prod.vendorName ?? prod.brand ?? '';
          val = Array.isArray(raw) ? mapIdsToNames('vendors', raw) : mapIdToName('vendors', raw);
        }
        else if (prop === 'category') {
          const raw = prod.categoryId ?? prod.categoryID ?? prod.category ?? prod.categories ?? '';
          val = Array.isArray(raw) ? mapIdsToNames('categories', raw) : mapIdToName('categories', raw);
        }
        else if (prop === 'collection') {
          const raw = prod.collectionId ?? prod.collectionID ?? prod.collection ?? prod.collections ?? prod.collectionName ?? '';
          val = Array.isArray(raw) ? mapIdsToNames('collections', raw) : mapIdToName('collections', raw);
        }
        else if (prop === 'description') val = prod.description ?? prod.desc ?? '';
        else if (prop === 'color') {
          const raw = prod.colorId ?? prod.colorID ?? prod.color ?? prod.colour ?? '';
          val = Array.isArray(raw) ? mapIdsToNames('colors', raw) : mapIdToName('colors', raw);
        }
      } else {
        // If doc already stored names, still try to resolve if they're IDs
        if (prop === 'vendor')     val = Array.isArray(val) ? mapIdsToNames('vendors', val)     : mapIdToName('vendors', val);
        if (prop === 'category')   val = Array.isArray(val) ? mapIdsToNames('categories', val)  : mapIdToName('categories', val);
        if (prop === 'collection') val = Array.isArray(val) ? mapIdsToNames('collections', val) : mapIdToName('collections', val);
        if (prop === 'color')      val = Array.isArray(val) ? mapIdsToNames('colors', val)      : mapIdToName('colors', val);
      }

      // normalize arrays to CSV
      if (Array.isArray(val)) val = val.filter(Boolean);
      const display = formatProductCell(prop, val);

      if (isEmptyValue(display)) {
        el.textContent = fallbackFor(el);
        el.classList.add('is-empty');
      } else {
        el.textContent = String(display);
        el.classList.remove('is-empty');
      }
    });

    // Image cell
    let imageUrl =
      prod.image ||
      (Array.isArray(prod.images) ? (typeof prod.images[0] === 'string' ? prod.images[0] : prod.images[0]?.url) : '') ||
      prod.media?.hero ||
      prod.heroImage || '';
    setImgProp(row, 'image', imageUrl);

    return row;
  }

  async function loadProducts(db, { limit = 200 } = {}) {
    const tbody = qs('#products-tbody');
    const tplRow = tbody ? qs('[data-row="template"]', tbody) : null;
    if (!tbody || !tplRow) {
      console.warn('[products] missing #products-tbody or template; skipping render');
      return;
    }

    // Clear previous
    qsa('#products-tbody > tr:not([data-row="template"])').forEach(tr => tr.remove());

    // Pull from Firestore
    const snap = await db.collection('exclusive_products')
      .orderBy('updatedAt', 'desc') // fallback to name if you don’t have updatedAt on all docs
      .limit(limit)
      .get()
      .catch(async err => {
        // If updatedAt doesn’t exist on every doc, fall back to name to avoid “no index” edge cases.
        console.warn('[products] falling back to name order', err);
        return db.collection('exclusive_products').orderBy('formalName').limit(limit).get();
      });

    const frag = document.createDocumentFragment();
    snap.docs.forEach(doc => {
      const data = { id: doc.id, ...(doc.data() || {}) };
      const row = buildProductRow(data);
      if (row) {
        row.setAttribute('data-id', doc.id);         // for modal opening
        row.setAttribute('data-col', 'exclusive_products'); // collection tag
        frag.appendChild(row);
      }
    });

    tbody.appendChild(frag);
  }
  // ---------- /PRODUCTS TABLE HELPERS ----------


  // ---------- PRODUCTS PAGINATION ----------
const PROD_FIELDS = {
  nameLower: 'formalNameLower', // lowercased mirror of name (recommended)
  name: 'formalName',
  updatedAt: 'updatedAt',

  vendor: 'vendor',           // scalar ID
  category: 'category',       // scalar ID
  color: 'color', 
  
  // collections is an ARRAY of IDs in your docs:
  collectionArr: 'collection', // ← array field (e.g. ["col_1","col_2"])
  // (keep this too if some legacy docs had a single scalar)
  collection: 'collection',     // scalar fallback (optional)

};


const __prodPg = {
  limit: 50,          // tune as you like (<= 200 is fine)
  mode: 'updated',    // 'updated' -> orderBy('updatedAt','desc'); fallback: 'name'
  page: 1,            // 1-based
  anchors: [null],    // anchors[n-1] is the lastDoc cursor for page n
  loading: false,
};

// Build a query with the current mode and optional startAfter doc
function buildProductsQuery(db, startAfterDoc = null) {
  const col = db.collection('exclusive_products');

  const hasSearch = !!__prodPg.search.q;
  if (hasSearch && !__prodPg.search.activeField) {
    // you don't have formalNameLower → prefer formalName
    __prodPg.search.activeField = PROD_FIELDS.name; 
  }

  const orderField = hasSearch
    ? __prodPg.search.activeField
    : (__prodPg.mode === 'updated' ? PROD_FIELDS.updatedAt : PROD_FIELDS.name);

  let q = col.orderBy(
    orderField,
    hasSearch ? undefined : (__prodPg.mode === 'updated' ? 'desc' : undefined)
  );

  // filters (unchanged)...
  const f = __prodPg.filters;
  if (f.vendorId)   q = q.where(PROD_FIELDS.vendor, '==', f.vendorId);
  if (f.categoryId) q = q.where(PROD_FIELDS.category, '==', f.categoryId);
  if (f.colorId)    q = q.where(PROD_FIELDS.color, '==', f.colorId);
  if (f.collectionId) q = q.where(PROD_FIELDS.collectionArr, 'array-contains', f.collectionId);

  // === Search prefix ===
  if (hasSearch) {
    const qtext = normalizeSearchTextFor(orderField, __prodPg.search.q);
    q = q.startAt(qtext).endAt(qtext + '\uf8ff');
    q.__qtext = qtext;           // annotate for debug
  }

  if (startAfterDoc) q = q.startAfter(startAfterDoc);
  q = q.limit(__prodPg.limit);
  q.__hasSearch = hasSearch;
  q.__orderField = orderField;
  return q;
}



// Render one page. If pageIdx === 1 → no startAfter; else use anchors[pageIdx-2]
async function renderProductsPage(db, pageIdx) {
  if (__prodPg.loading) return;
  __prodPg.loading = true;
  try {
    const tbody = qs('#products-tbody');
    const tplRow = tbody ? qs('[data-row="template"]', tbody) : null;
    if (!tbody || !tplRow) { console.warn('[products] missing tbody/template'); return; }

    const anchor = pageIdx > 1 ? __prodPg.anchors[pageIdx - 2] : null;

    // Build initial query
    let q = buildProductsQuery(db, anchor);

    let snap;
    try {
      snap = await buildProductsQuery(db, anchor).get();
    } catch (err) {
      if (__prodPg.search.q) {
        const fallbackField = PROD_FIELDS.name;
        if (__prodPg.search.activeField !== fallbackField) {
          console.warn('[products] retrying search with', fallbackField, err);
          __prodPg.search.activeField = fallbackField;
          snap = await buildProductsQuery(db, anchor).get();
        } else {
          console.warn('[products] search failed; clearing search and retrying', err);
          __prodPg.search.q = '';
          __prodPg.search.activeField = null;
          __prodPg.mode = 'updated';
          snap = await buildProductsQuery(db, anchor).get();
        }
      } else if (__prodPg.mode === 'updated') {
        console.warn('[products] falling back to name order', err);
        __prodPg.mode = 'name';
        snap = await buildProductsQuery(db, anchor).get();
      } else {
        throw err;
      }
    }

    // === CASE-ALT RETRY + LAST-RESORT CLIENT FILTER =========================
    if (__prodPg.search.q && snap.empty && __prodPg.search.activeField === PROD_FIELDS.name) {
      // 1) Try TitleCase first letter: "mar" -> "Mar"
      const raw = (__prodPg.search.q || '').trim();
      const alt = raw ? raw[0].toUpperCase() + raw.slice(1) : '';
      if (alt) {
        // rebuild query manually so we can inject a different prefix
        let q2 = db.collection('exclusive_products').orderBy(PROD_FIELDS.name);
        const f = __prodPg.filters;
        if (f.vendorId)   q2 = q2.where(PROD_FIELDS.vendor, '==', f.vendorId);
        if (f.categoryId) q2 = q2.where(PROD_FIELDS.category, '==', f.categoryId);
        if (f.colorId)    q2 = q2.where(PROD_FIELDS.color, '==', f.colorId);
        if (f.collectionId) q2 = q2.where(PROD_FIELDS.collectionArr, 'array-contains', f.collectionId);
        if (anchor) q2 = q2.startAfter(anchor);
        q2 = q2.startAt(alt).endAt(alt + '\uf8ff').limit(__prodPg.limit);
        try { snap = await q2.get(); } catch (_) { /* ignore */ }
      }

      // 2) Last resort: fetch first page by name and client-filter startsWith (case-insensitive)
      if (snap.empty) {
        try {
          let q3 = db.collection('exclusive_products').orderBy(PROD_FIELDS.name).limit(__prodPg.limit);
          const f = __prodPg.filters;
          if (f.vendorId)   q3 = q3.where(PROD_FIELDS.vendor, '==', f.vendorId);
          if (f.categoryId) q3 = q3.where(PROD_FIELDS.category, '==', f.categoryId);
          if (f.colorId)    q3 = q3.where(PROD_FIELDS.color, '==', f.colorId);
          if (f.collectionId) q3 = q3.where(PROD_FIELDS.collectionArr, 'array-contains', f.collectionId);
          if (anchor) q3 = q3.startAfter(anchor);

          const tmp = await q3.get();
          const needle = (__prodPg.search.q || '').trim().toLowerCase();
          const filteredDocs = tmp.docs.filter(d =>
            (d.data()?.formalName || '').toLowerCase().startsWith(needle)
          );

          // make a minimal snap-like object the rest of the function can consume
          snap = { docs: filteredDocs, empty: filteredDocs.length === 0 };
        } catch (_) { /* ignore */ }
      }
    }
    // =======================================================================

    // client-side filters to apply (due to array-contains limit)
    const clientFilters = q.__clientFilters || { vendorId: '', categoryId: '', collectionId: '', colorId: '' };
    const results = [];
    let lastDoc = anchor || null;

    // We may need to fetch multiple chunks to fill the page after client filtering
    let attempts = 0;
    let currentSnap = snap;

    while (true) {
      const docs = currentSnap.docs;
      for (const d of docs) {
        const data = { id: d.id, ...(d.data ? (d.data() || {}) : d) }; // supports faux docs in last-resort
        if (matchesClientFilters(data, clientFilters)) {
          results.push({ doc: d, data });
          if (results.length >= __prodPg.limit) break;
        }
        lastDoc = d; // advance anchor by Firestore order
      }

      if (results.length >= __prodPg.limit) break;

      // If we didn't fill the page and there may be more, fetch the next chunk
      if (!docs.length || docs.length < __prodPg.limit) break;

      const nextQ = buildProductsQuery(db, lastDoc);
      try {
        currentSnap = await nextQ.get();
      } catch {
        break;
      }

      attempts++;
      if (attempts > 10) break; // guard
    }

    // Clear and paint rows
    qsa('#products-tbody > tr:not([data-row="template"])').forEach(tr => tr.remove());
    const frag = document.createDocumentFragment();
    results.forEach(({ doc, data }) => {
      const row = buildProductRow(data);
      if (row) {
        row.setAttribute('data-id', doc.id || data.id);
        row.setAttribute('data-col', 'exclusive_products');
        frag.appendChild(row);
      }
    });
    tbody.appendChild(frag);

    // Update anchors
    if (lastDoc) {
      while (__prodPg.anchors.length < pageIdx - 1) __prodPg.anchors.push(null);
      __prodPg.anchors[pageIdx - 1] = lastDoc;
      __prodPg.page = pageIdx;
    }

    const hasNext = results.length >= __prodPg.limit;
    paintProductsPagerUI({ hasPrev: pageIdx > 1, hasNext });
  } finally {
    __prodPg.loading = false;
  }
}



function paintProductsPagerUI({ hasPrev, hasNext }) {
  const wrap = qs('#products-pager[data-pg]');
  if (!wrap) return;
  const btnPrev = qs('[data-pg="prev"]', wrap);
  const btnNext = qs('[data-pg="next"]', wrap);
  const info = qs('[data-pg="info"]', wrap);

  if (btnPrev) btnPrev.disabled = !hasPrev;
  if (btnNext) btnNext.disabled = !hasNext;

  const parts = [`Page ${__prodPg.page}`];
  if (__prodPg.search.q) parts.push(`“${__prodPg.search.q}”`);
  if (__prodPg.mode === 'name' && !__prodPg.search.q) parts.push('A→Z');
  const activeFilters = Object.values(__prodPg.filters).filter(Boolean).length;
  if (activeFilters) parts.push(`${activeFilters} filter${activeFilters>1?'s':''}`);

  if (info) info.textContent = parts.join(' · ');
}


// one-time wiring for prev/next buttons
function wireProductsPagerOnce(db) {
  const wrap = qs('#products-pager[data-pg]');
  if (!wrap || wrap.dataset.pgInit === '1') return;
  wrap.dataset.pgInit = '1';

  const btnPrev = qs('[data-pg="prev"]', wrap);
  const btnNext = qs('[data-pg="next"]', wrap);

  btnPrev?.addEventListener('click', async () => {
    if (__prodPg.page <= 1) return;
    const target = __prodPg.page - 1;
    // we have anchors[target-1] already (lastDoc of target page)
    await renderProductsPage(window.portalCtx.db, target);
  });

  btnNext?.addEventListener('click', async () => {
    const target = __prodPg.page + 1;
    // Use anchor of previous page (anchors[target-2])
    await renderProductsPage(window.portalCtx.db, target);
  });
}

// public init: resets pager + renders first page
async function initProductsPager(db) {
  __prodPg.page = 1;
  __prodPg.anchors = [null];
  __prodPg.mode = 'updated';
  wireProductsPagerOnce(db);
  await renderProductsPage(db, 1);
}
// ---------- /PRODUCTS PAGINATION ----------


// Normalize search text to match your lowercased field
function normalizeSearchTextFor(field, s) {
  const raw = (s || '').toString().trim();
  // only lowercase when querying a lowercased mirror field
  if (field === PROD_FIELDS.nameLower) return raw.toLowerCase();
  return raw; // use raw case for 'formalName'
}


// Evaluate any remaining client-side filters for a given product doc
function matchesClientFilters(data, clientFilters) {
  // For each possible filter, check presence on either scalar or array fields
  const { vendorId, categoryId, collectionId, colorId } = clientFilters;

  if (vendorId) {
    const v = data.vendorId ?? data.vendor ?? null;
    if (Array.isArray(v)) { if (!v.includes(vendorId)) return false; }
    else if (v !== vendorId) return false;
  }

  if (categoryId) {
    const c = data.categoryIds ?? data.categoryId ?? data.category ?? data.categories ?? null;
    if (Array.isArray(c)) { if (!c.includes(categoryId)) return false; }
    else if (c !== categoryId) return false;
  }

  if (collectionId) {
    const c = data.collectionIds ?? data.collectionId ?? data.collection ?? data.collections ?? data.collectionName ?? null;
    if (Array.isArray(c)) { if (!c.includes(collectionId)) return false; }
    else if (c !== collectionId) return false;
  }

  if (colorId) {
    const c = data.colorIds ?? data.colorId ?? data.color ?? data.colour ?? null;
    if (Array.isArray(c)) { if (!c.includes(colorId)) return false; }
    else if (c !== colorId) return false;
  }

  return true;
}




// extend existing __prodPg
Object.assign(__prodPg, {
  filters: {
    vendorId: '',       // scalar IDs (or array fields handled in query builder)
    categoryId: '',
    collectionId: '',
    colorId: '',
  },
  search: {
    q: '',              // prefix text
    fieldPref: ['formalName'], // we’ll try in this order
    activeField: null,  // chosen field for the active search
  },
});

function fillSelectFromMap(selectEl, map, { includeAll = true } = {}) {
  if (!selectEl) return;
  // wipe options
  while (selectEl.options.length) selectEl.remove(0);
  if (includeAll) {
    const opt = document.createElement('option');
    opt.value = ''; opt.textContent = 'All';
    selectEl.appendChild(opt);
  }
  // sort names A→Z
  const items = Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  items.sort((a,b) => a.name.localeCompare(b.name));
  items.forEach(({ id, name }) => {
    const opt = document.createElement('option');
    opt.value = id; opt.textContent = name || id;
    selectEl.appendChild(opt);
  });
}

function wireProductsFiltersOnce() {
  const root = document.getElementById('products-controls');
  if (!root || root.dataset.pfInit === '1') return;
  root.dataset.pfInit = '1';

  const selVendor = root.querySelector('[data-flt="vendorId"]');
  const selCat = root.querySelector('[data-flt="categoryId"]');
  const selColl = root.querySelector('[data-flt="collectionId"]');
  const selColor = root.querySelector('[data-flt="colorId"]');

  // Fill from preloaded maps
  if (typeof __lookups !== 'undefined') {
    fillSelectFromMap(selVendor, __lookups.vendors);
    fillSelectFromMap(selCat, __lookups.categories);
    fillSelectFromMap(selColl, __lookups.collections);
    fillSelectFromMap(selColor, __lookups.colors);
  }

  // Limit selector
  const selLimit = root.querySelector('[data-pg="limit"]');
  if (selLimit) {
    selLimit.value = String(__prodPg.limit);
    selLimit.addEventListener('change', async () => {
      __prodPg.limit = Math.max(1, Number(selLimit.value) || 50);
      await resetAndRenderProducts();
    });
  }

  // Filters
  const onChangeFilter = async (e) => {
    const el = e.target;
    const key = el.getAttribute('data-flt');
    if (!key) return;
    __prodPg.filters[key] = el.value || '';
    await resetAndRenderProducts();
  };
  [selVendor, selCat, selColl, selColor].forEach(el => el && el.addEventListener('change', onChangeFilter));

  // Search (debounced)
  const inpQ = root.querySelector('[data-flt="q"]');
  if (inpQ) {
    let t = null;
    const fire = async () => {
      __prodPg.search.q = inpQ.value || '';  // raw; normalized in buildProductsQuery
      await resetAndRenderProducts();
    };
    inpQ.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(fire, 300);
    });
  }
}

async function resetAndRenderProducts() {
  __prodPg.page = 1;
  __prodPg.anchors = [null];
  __prodPg.mode = __prodPg.search.q ? 'name' : 'updated'; // search forces name ordering
  __prodPg.search.activeField = null; // re-select on first query attempt
  await renderProductsPage(window.portalCtx.db, 1);
}





  // ---------- PRODUCT MODAL ----------
  function pd$(sel, r = document) { return r.querySelector(sel); }
  function pdShow(el) { if (el) el.style.display = 'block'; }
  function pdHide(el) { if (el) el.style.display = 'none'; }
  function pdSetText(el, v) { if (el) el.textContent = (v ?? '—'); }
  function pdSetSrc(el, v) { if (el) el.setAttribute('src', v || ''); }

  function openProductModal() {
    const m = pd$('[data-modal="product"]');
    if (!m) { console.warn('[product modal] container not found'); return; }
    pdShow(m);
  }
  function closeProductModal() { pdHide(pd$('[data-modal="product"]')); }

  function wireProductModalCloseOnce() {
    const modal = pd$('[data-modal="product"]');
    if (!modal || modal.dataset.pdInit === '1') return;
    modal.dataset.pdInit = '1';

    const overlay = pd$('[data-md="close"]', modal);
    const card = pd$('[data-md="card"]', modal);
    overlay?.addEventListener('click', () => closeProductModal());
    card?.addEventListener('click', e => e.stopPropagation());

    modal.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-md="close"]');
      if (btn && btn !== overlay) closeProductModal();
    });
  }

  function toDisplayValue(key, v) {
    if (key === 'inStock') return fmt.boolYesNo(v);
    if (Array.isArray(v)) return v.filter(Boolean).join(', ');
    if (typeof v === 'object' && v?.toDate) return fmt.date(v);
    if (v == null) return '';
    return String(v);
  }

  // Generic painter: fills anything with data-pd / data-pd-rich / data-pd-img
  function paintProductModalFromDoc(modal, prod) {
    // text nodes
    qsa('[data-pd]', modal).forEach(el => {
      const key = el.getAttribute('data-pd');
      // Read raw value with aliases
      let raw = prod[key];
      if (raw == null) {
        if (key === 'formalName') raw = (prod.formalName ?? prod.name ?? prod.title);
        else if (key === 'vendor') raw = (prod.vendorId ?? prod.vendorID ?? prod.vendor ?? prod.vendorName ?? prod.brand);
        else if (key === 'category') raw = (prod.categoryId ?? prod.categoryID ?? prod.category ?? prod.categories);
        else if (key === 'collection') raw = (prod.collectionId ?? prod.collectionID ?? prod.collection ?? prod.collections ?? prod.collectionName);
        else if (key === 'description') raw = (prod.description ?? prod.desc);
        else if (key === 'color') raw = (prod.colorId ?? prod.colorID ?? prod.color ?? prod.colour);
      }

      // Map IDs to Names for specific keys
      if (key === 'vendor')     raw = Array.isArray(raw) ? mapIdsToNames('vendors', raw)     : mapIdToName('vendors', raw);
      if (key === 'category')   raw = Array.isArray(raw) ? mapIdsToNames('categories', raw)  : mapIdToName('categories', raw);
      if (key === 'collection') raw = Array.isArray(raw) ? mapIdsToNames('collections', raw) : mapIdToName('collections', raw);
      if (key === 'color')      raw = Array.isArray(raw) ? mapIdsToNames('colors', raw)      : mapIdToName('colors', raw);

      const val = toDisplayValue(key, raw);
      if (isEmptyValue(val)) {
        el.textContent = fallbackFor(el);
        el.classList.add('is-empty');
      } else {
        el.textContent = val;
        el.classList.remove('is-empty');
      }
    });

    // rich text (sanitized clone)
    qsa('[data-pd-rich]', modal).forEach(el => {
      const key = el.getAttribute('data-pd-rich');
      const html = prod[key] ?? '';
      mdSetRichText(el, typeof html === 'string' ? html : '');
    });

    // images
    qsa('[data-pd-img]', modal).forEach(el => {
      const key = el.getAttribute('data-pd-img');
      let url = prod[key] ||
        (Array.isArray(prod.images) ? (typeof prod.images[0] === 'string' ? prod.images[0] : prod.images[0]?.url) : '') ||
        prod.media?.hero || prod.heroImage || '';
      if (!url) { el.setAttribute('src',''); el.setAttribute('alt',''); return; }
      el.setAttribute('src', url);
      const name = (prod.formalName ?? prod.name ?? prod.title ?? 'Product image');
      el.setAttribute('alt', name + ' – image');
      el.onerror = () => { el.onerror = null; el.setAttribute('src',''); };
    });
  }

  async function loadAndShowProductModal({ db, productId }) {
    const modal = pd$('[data-modal="product"]');
    if (!modal) return;

    // Reset quick fields to placeholders
    qsa('[data-pd]', modal).forEach(el => { el.textContent = '—'; });
    qsa('[data-pd-img]', modal).forEach(el => { el.setAttribute('src',''); el.setAttribute('alt',''); });
    qsa('[data-pd-rich]', modal).forEach(el => { mdSetRichText(el, ''); });

    // Fetch doc
    const ref = db.collection('exclusive_products').doc(productId);
    const snap = await ref.get();
    if (!snap.exists) {
      pdSetText(pd$('[data-pd="formalName"]', modal), 'Product not found');
      openProductModal();
      return;
    }

    const prod = { id: snap.id, ...(snap.data() || {}) };

    // Paint known fields + any other `[data-pd*]` you’ve placed
    paintProductModalFromDoc(modal, prod);

    openProductModal();
  }

  function wireProductRowClicksOnce() {
    if (window.__productsClickDelegated) return;
    window.__productsClickDelegated = true;

    document.addEventListener('click', (e) => {
      const tr = e.target.closest('#products-tbody tr[data-id]:not([data-row="template"])');
      if (!tr) return;
      const productId = tr.getAttribute('data-id');
      const ctx = window.portalCtx;
      if (!productId || !ctx?.db) return;

      console.debug('[products] open modal →', productId);
      loadAndShowProductModal({ db: ctx.db, productId });
    });

    console.debug('[products] row click wired (global delegate)');
  }
  // ---------- /PRODUCT MODAL ----------

  window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, {
    initProductsPager,
    wireProductsFiltersOnce,
    wireProductsPagerOnce,     // optional, but fine to expose
    wireProductRowClicksOnce,
    wireProductModalCloseOnce,
    resetAndRenderProducts,
  });
})();