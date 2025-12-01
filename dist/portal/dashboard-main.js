  // ---------- SINGLE auth listener (everything available to signed-in users) ----------
 // portal/dashboard-main.js
(function () {
  const {
    waitForFirebaseReady,
    show,
    hide,
    updateVisibility,
    fetchIsAdmin,
    preloadLookups,
    loadJobsForUser,
  } = window.RoosDash;

  waitForFirebaseReady(async () => {
    const db = await window.fetchFirebaseConfig();
    const auth = firebase.auth();

    const elPending = document.querySelector("#auth-pending");
    const elGuest   = document.querySelector("#auth-guest");
    const elAuthed  = document.querySelector("#auth-authed");
    const elNoAccess= document.querySelector("#auth-noaccess");

    window.portalCtx = {
      db,
      auth,
      user: null,
      admin: false,
      roles: new Set(),
      profile: null,
    };

    try {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } catch (_) { /* ignore */ }

    show(elPending);
    hide(elGuest);
    hide(elAuthed);
    hide(elNoAccess);

    auth.onAuthStateChanged(async (user) => {
      window.portalCtx.user = user || null;
      window.portalCtx.admin = false;
      window.portalCtx.roles = new Set();

      if (!user) {
        hide(elPending);
        show(elGuest);
        hide(elAuthed);
        show(elNoAccess);
        updateVisibility({ authed: false, rolesSet: null });
        return;
      }

      // signed-in
      hide(elPending);
      hide(elGuest);
      hide(elNoAccess);
      show(elAuthed);
      updateVisibility({ authed: true, rolesSet: new Set() });

      // compute admin
      try {
        const isAdmin = await fetchIsAdmin(db, user.uid);
        if (isAdmin) window.portalCtx.roles.add('admin');
        window.portalCtx.admin = isAdmin;
      } catch (_) { /* ignore */ }

      // ---- MODULE HOOKS ----
      // Leads admin (admin-only UI)
      if (window.RoosDash.initLeadsUI) {
        await window.RoosDash.initLeadsUI(window.portalCtx);
      }

      // Change password
      if (window.RoosDash.initChangePasswordUI) {
        window.RoosDash.initChangePasswordUI(window.portalCtx);
      }

      // Tradeshow admin viewer
      if (window.RoosDash.initTradeshowAdminUI) {
        window.RoosDash.initTradeshowAdminUI(window.portalCtx);
      }

      // Profile form
      if (window.RoosDash.initProfileUI) {
        window.RoosDash.initProfileUI(window.portalCtx);
      }

      // User header (name/username/registered)
      if (window.RoosDash.initUserHeaderUI) {
        window.RoosDash.initUserHeaderUI(window.portalCtx);
      }

      // Lookups for vendors/categories/collections/colors
      await preloadLookups(db);

      // Products filters + pager
      if (window.RoosDash.wireProductsFiltersOnce) {
        window.RoosDash.wireProductsFiltersOnce();
      }
      if (window.RoosDash.initProductsPager) {
        await window.RoosDash.initProductsPager(db);
      }

      // Jobs & samples tables
      await loadJobsForUser(db, user.uid);

      if (window.RoosDash.loadSamplesForUser) {
        await window.RoosDash.loadSamplesForUser(db, user.uid);
      }

      // Row click → modal wiring
      if (window.RoosDash.wireSampleRowClicksOnce) {
        window.RoosDash.wireSampleRowClicksOnce();
      }
      if (window.RoosDash.wireSampleModalCloseOnce) {
        window.RoosDash.wireSampleModalCloseOnce();
      }
      if (window.RoosDash.wireProductRowClicksOnce) {
        window.RoosDash.wireProductRowClicksOnce();
      }
      if (window.RoosDash.wireProductModalCloseOnce) {
        window.RoosDash.wireProductModalCloseOnce();
      }

      // Profile form: load user data
      const prForm = document.querySelector('[data-pr="form"]');
      if (prForm && typeof prForm.__loadProfile === 'function') {
        prForm.__loadProfile(user.uid);
      }
    });
  });
})();
