(function () {
  // ======== SELECT POPULATION HELPERS ========
  const SUBDIVISIONS = {
    US: [
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

  function normalizeForSave(data) {
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
  function wireCountryStateDependency(form) {
    const country = form.querySelector('[data-pr="country"]');
    const state = form.querySelector('[data-pr="state"]');
    if (!country || !state) return;

    function updateStateOptions() {
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

  function syncStateOptionsToCountry(form) {
    const country = form.querySelector('[data-pr="country"]');
    const state = form.querySelector('[data-pr="state"]');
    if (!country || !state) return;

    const ph = state.getAttribute('data-placeholder') || 'Select state';
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


  function syncSubdivisionsToCountry(form) {
    const countrySel = form.querySelector('[data-pr="country"]');
    const stateSel = form.querySelector('[data-pr="state"]');
    if (!countrySel || !stateSel) return;

    const ph = stateSel.getAttribute('data-placeholder') || 'Select state/province';
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

  function wireCountrySubdivisionDependency(form) {
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
  function setSelectToValueOrText(sel, val) {
    if (!sel || !val) return;
    const needle = String(val).trim().toLowerCase();
    const hit = Array.from(sel.options).find(
      o => (o.value || '').toLowerCase() === needle ||
        (o.text || '').toLowerCase() === needle
    );
    if (hit) sel.value = hit.value;
    
  }

  
  // ======== PROFILE UI (load/save users/{uid}) ========
  function pr$(form, sel) { return form ? form.querySelector(sel) : null; }
  function pr$$(form, sel) { return form ? Array.from(form.querySelectorAll(sel)) : []; }

  function setProfileStatus(form, msg, kind) {
    const s = pr$(form, '[data-pr="status"]');
    if (!s) return;
    s.textContent = msg || '';
    s.classList.remove('ok', 'err', 'info');
    if (kind) s.classList.add(kind);
  }

  // Fill inputs/selects from a plain object
  function fillProfileForm(form, data) {
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
  function isShallowEqual(a, b) {
    const ak = Object.keys(a), bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    for (const k of ak) if (a[k] !== b[k]) return false;
    return true;
  }

  async function loadUserProfile(db, uid) {
    const snap = await db.collection('users').doc(uid).get();
    return snap.exists ? (snap.data() || {}) : {};
  }

  // Write only these fields; add updatedAt server time if you want
  async function saveUserProfile(db, uid, nextData, prevData = {}) {
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

    return db.collection('users').doc(uid).set(payload, { merge: true });
  }


  function initProfileUI(ctx) {
    const form = document.querySelector('[data-pr="form"]');
    if (!form) return;
    if (form.dataset.prInit === '1') return; // prevent double-binding
    form.dataset.prInit = '1';

    // Make sure selects have options first
    populateProfileSelects(form);
    wireCountrySubdivisionDependency(form);



    let initial = {}; // snapshot loaded from Firestore


    function computeDirty() {
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


    function refresh() {
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
    form.__loadProfile = async function (uid) {
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
        if (window.RoosDash && window.RoosDash.paintUserHeader) {
          window.RoosDash.paintUserHeader(ctx);
        }  

      } catch (err) {
        console.error('[profile] load error', err);
        setProfileStatus(form, 'Failed to load profile.', 'err');
      }
    };
  }
  // ======== /PROFILE UI ========


  window.RoosDash = window.RoosDash || {};
  Object.assign(window.RoosDash, { initProfileUI });
})();

