(function () {
    // ---------- TABLE HELPERS (no innerHTML) ----------
  function toDate(val) {
    if (!val) return null;
    if (val.toDate) return val.toDate();
    if (typeof val === 'number') return new Date(val);
    return new Date(val);
  }


    // ---------- LOOKUP CACHES (ID -> Name) ----------
  const __lookups = {
    vendors: new Map(),
    categories: new Map(),
    collections: new Map(),
    colors: new Map(),
  };

  async function preloadLookups(db) {
    // helper to fill one map from a collection with "Item ID" and "Name"
    async function hydrate(map, colName) {
      map.clear();
      const snap = await db.collection(colName).get();
      snap.forEach(doc => {
        const d = doc.data() || {};
        const id = String(d['Item ID'] ?? d.itemId ?? d.id ?? doc.id).trim();
        const name = String(d['Name'] ?? d.name ?? '').trim();
        if (id) map.set(id, name || id);
      });
    }

    await Promise.all([
      hydrate(__lookups.vendors, 'exclusive_vendors'),
      hydrate(__lookups.categories, 'categories'),
      hydrate(__lookups.collections, 'collections_from_vendors'),
      hydrate(__lookups.colors, 'colors'),
    ]);
  }

  function mapIdToName(map, v) {
    if (v == null || v === '') return '';
    const id = String(v).trim();
    return __lookups[map]?.get(id) || id;
  }

  function mapIdsToNames(map, v) {
    if (Array.isArray(v)) {
      const arr = v.map(x => mapIdToName(map, x)).filter(Boolean);
      return arr.join(', ');
    }
    return mapIdToName(map, v);
  }
  // ---------- /LOOKUP CACHES ----------




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
    },

    boolYesNo(v) {
      if (v === true || v === 'true' || v === 1 || v === '1') return 'Yes';
      if (v === false || v === 'false' || v === 0 || v === '0') return 'No';
      return v == null ? '' : String(v);
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
    const tbody = qs('#projects-tbody');
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
    const tbody = qs('#projects-tbody');
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
        const row = rowsByJobId.get(doc.id);
        if (row) setMaterialsCell(row, text);
      })
    );
  }
  // ---------- /TABLE HELPERS ----------

  // Export everything that other modules need
  window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, {
    toDate,
    fmt,
    qs,
    DEFAULT_EMPTY,
    isEmptyValue,
    fallbackFor,
    formatByProp,
    __lookups,
    preloadLookups,
    mapIdToName,
    mapIdsToNames,
    buildRow,
    setMaterialsCell,
    fetchMaterialsForJob,
    loadJobsForUser,
  });

})();