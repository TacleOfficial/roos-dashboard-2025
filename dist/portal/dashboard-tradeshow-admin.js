(function () {
    // ========== TRADESHOW LEADS ADMIN VIEWER (no innerHTML) ==========
function initTradeshowAdminUI(ctx) {
  const db = ctx?.db;
  if (!db) return;

  const root = document.querySelector('[data-ts-admin-root]');
  if (!root) return; // not on this page

  if (root.dataset.tsAdminInit === '1') return;
  root.dataset.tsAdminInit = '1';

  // admin gate
  if (!ctx.admin) {
    root.style.display = 'none';
    return;
  }

  const eventInput       = root.querySelector('[data-ts-admin-event]');
  const materialFilterEl = root.querySelector('[data-ts-admin-material-filter]');
  const showroomFilterEl = root.querySelector('[data-ts-admin-showroom-filter]');
  const searchEl         = root.querySelector('[data-ts-admin-search]');

  const loadingEl        = root.querySelector('[data-ts-admin-loading]');
  const emptyEl          = root.querySelector('[data-ts-admin-empty]');
  const tableEl          = root.querySelector('[data-ts-admin-table]');
  const tbodyEl          = root.querySelector('[data-ts-admin-tbody]');
  const rowTpl           = tbodyEl ? tbodyEl.querySelector('[data-ts-admin-row-template]') : null;

  if (!eventInput || !materialFilterEl || !showroomFilterEl || !searchEl ||
      !loadingEl || !emptyEl || !tableEl || !tbodyEl || !rowTpl) {
    console.warn('[ts-admin] missing required data-ts-admin-* elements.');
    return;
  }

  const MAT_LABELS = {
    'architectural-panels': 'Architectural Panels',
    'acoustic': 'Acoustic / PET',
    'laminates-veneers': 'Laminates & Veneers',
    'specialty-backlit': 'Specialty / Backlit',
    'performance-wallcovering': 'Performance Wallcovering'
  };

  let allLeads = [];
  let unsubscribe = null;

  function formatDate(ts) {
    try {
      if (!ts || !ts.toDate) return '';
      const d = ts.toDate();
      return d.toLocaleString();
    } catch {
      return '';
    }
  }

  function showState(state) {
    // state: 'loading' | 'empty' | 'table'
    loadingEl.style.display = (state === 'loading') ? '' : 'none';
    emptyEl.style.display   = (state === 'empty')   ? '' : 'none';
    tableEl.style.display   = (state === 'table')   ? '' : 'none';
  }

  function clearRows() {
    Array.from(tbodyEl.children).forEach(ch => {
      if (ch !== rowTpl) tbodyEl.removeChild(ch);
    });
  }

  // Read event filter from value / data attribute / text
  function getSelectedEventId() {
    if (!eventInput) return '';
    if (eventInput.value != null && eventInput.value !== '') {
      return String(eventInput.value).trim();
    }
    const attr = eventInput.getAttribute('data-ts-admin-event-id');
    if (attr) return attr.trim();
    return (eventInput.textContent || '').trim();
  }

  function renderMaterials(cell, list) {
    while (cell.firstChild) cell.removeChild(cell.firstChild);
    if (!Array.isArray(list) || !list.length) return;

    list.forEach(v => {
      const label = MAT_LABELS[v] || v;
      if (!label) return;
      const tag = document.createElement('span');
      tag.className = 'ts-admin-tag';
      tag.textContent = label;
      cell.appendChild(tag);
    });
  }

  function renderTable() {
    if (!allLeads.length) {
      clearRows();
      showState('empty');
      return;
    }

    const matFilter = materialFilterEl.value;
    const showroomFilter = showroomFilterEl.value;
    const q = (searchEl.value || '').toLowerCase().trim();
    const eventFilter = getSelectedEventId(); // <= event filter is client-side

    let rows = allLeads.slice();

    rows = rows.filter(ld => {
      // event filter
      if (eventFilter && (ld.tradeshowId || '') !== eventFilter) return false;

      // material filter
      if (matFilter !== 'all') {
        const mats = ld.interestedMaterials || [];
        if (!mats.includes(matFilter)) return false;
      }

      // showroom filter
      if (showroomFilter === 'wants' && !ld.wantsShowroom) return false;
      if (showroomFilter === 'no' && ld.wantsShowroom) return false;
      if (showroomFilter === 'invited' && ld.showroomStatus !== 'invited') return false;

      // search
      if (q) {
        const blob = [
          ld.name || '',
          ld.company || '',
          ld.email || '',
          ld.projectName || ''
        ].join(' ').toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });

    // sort by score desc, then createdAt desc
    rows.sort((a, b) => {
      const sa = a.score || 0;
      const sb = b.score || 0;
      if (sb !== sa) return sb - sa;
      const ta = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
      const tb = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
      return tb - ta;
    });

    clearRows();

    if (!rows.length) {
      showState('empty');
      return;
    }

    rows.forEach(ld => {
      const row = rowTpl.cloneNode(true);
      row.removeAttribute('data-ts-admin-row-template');
      row.style.display = '';

      row.setAttribute('data-ts-admin-row-id', ld._id || '');

      const scoreEl     = row.querySelector('[data-ts-admin-score]');
      const whenEl      = row.querySelector('[data-ts-admin-when]');
      const nameEl      = row.querySelector('[data-ts-admin-name]');
      const companyEl   = row.querySelector('[data-ts-admin-company]');
      const emailEl     = row.querySelector('[data-ts-admin-email]');
      const phoneEl     = row.querySelector('[data-ts-admin-phone]');
      const addrs     = row.querySelector('[data-ts-admin-addrs]');
      const cityStateEl = row.querySelector('[data-ts-admin-citystate]');
      const roleEl      = row.querySelector('[data-ts-admin-role]');
      const stageEl     = row.querySelector('[data-ts-admin-stage]');
      const matsCell    = row.querySelector('[data-ts-admin-materials]');
      const showroomStatusEl = row.querySelector('[data-ts-admin-showroom-status]');
      const inviteBtn   = row.querySelector('[data-ts-admin-invite-btn]');
      const sourceLine  = row.querySelector('[data-ts-admin-source-line]');
      const projectLine = row.querySelector('[data-ts-admin-project-line]');

      if (scoreEl) scoreEl.textContent = String(ld.score || 0);
      if (whenEl) whenEl.textContent = formatDate(ld.createdAt);

      if (nameEl) nameEl.textContent = ld.name || '';
      if (companyEl) companyEl.textContent = ld.company || '';

      if (emailEl) emailEl.textContent = ld.email || '';
      if (phoneEl) phoneEl.textContent = ld.phone || '';

      if (addrs) addrs.textContent = ld.address || '';

      if (cityStateEl) {
        const cs = (ld.city && ld.state) ? `${ld.city}, ${ld.state}` : (ld.city || ld.state || '');
        cityStateEl.textContent = cs;
      }

      if (roleEl) roleEl.textContent = ld.role || '';
      if (stageEl) stageEl.textContent = ld.projectStage || '';

      if (matsCell) renderMaterials(matsCell, ld.interestedMaterials || []);

      const showroomStatus = ld.wantsShowroom ? (ld.showroomStatus || 'new') : 'n/a';
      if (showroomStatusEl) {
        showroomStatusEl.textContent = ld.wantsShowroom ? `Status: ${showroomStatus}` : 'No showroom';
        showroomStatusEl.classList.toggle('ts-admin-badge-new', showroomStatus === 'new');
      }

      if (inviteBtn) {
        if (ld.wantsShowroom && showroomStatus === 'new') {
          inviteBtn.style.display = '';
          inviteBtn.setAttribute('data-ts-admin-id', ld._id || '');
        } else {
          inviteBtn.style.display = 'none';
          inviteBtn.removeAttribute('data-ts-admin-id');
        }
      }

      const source = ld.sourceParams || {};
      const srcDescParts = [
        ld.channel || '',
        source.src ? `src=${source.src}` : '',
        source.item ? `item=${source.item}` : ''
      ].filter(Boolean);
      if (sourceLine) sourceLine.textContent = srcDescParts.join(' · ');
      if (projectLine) projectLine.textContent = ld.projectName ? `Project: ${ld.projectName}` : '';

      tbodyEl.appendChild(row);
    });

    showState('table');
  }

  // delegate "Mark as invited"
  tableEl.addEventListener('click', async (evt) => {
    const btn = evt.target.closest('[data-ts-admin-invite-btn]');
    if (!btn) return;
    const id = btn.getAttribute('data-ts-admin-id');
    if (!id) return;

    try {
      await db.collection('tradeshow_leads').doc(id).update({
        showroomStatus: 'invited',
        invitedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.error('[ts-admin] update showroom status failed', e);
      alert('Could not update showroom status.');
    }
  });

  // Subscribe once to ALL tradeshow leads; filter by event on client
  function subscribeTradeshowLeads() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }

    clearRows();
    showState('loading');

    unsubscribe = db.collection('tradeshow_leads')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snap) => {
          allLeads = [];
          snap.forEach(doc => {
            const data = doc.data() || {};
            allLeads.push({ _id: doc.id, ...data });
          });
          renderTable();
        },
        (err) => {
          console.error('[ts-admin] snapshot error', err);
          clearRows();
          showState('empty');
        }
      );
  }

  // optional: URL ?event= override just updates the control; filter happens in renderTable
  try {
    const pageUrl = new URL(window.location.href);
    const eventFromQuery = pageUrl.searchParams.get('event');
    if (eventFromQuery) {
      if ('value' in eventInput) {
        eventInput.value = eventFromQuery;
      } else {
        eventInput.setAttribute('data-ts-admin-event-id', eventFromQuery);
      }
    }
  } catch {
    // ignore
  }

  subscribeTradeshowLeads();

  // filters
  materialFilterEl.addEventListener('change', renderTable);
  showroomFilterEl.addEventListener('change', renderTable);
  searchEl.addEventListener('input', renderTable);
  eventInput.addEventListener('change', renderTable);
}
// ========== /TRADESHOW LEADS ADMIN VIEWER ==========
  window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, { initTradeshowAdminUI });
})();
