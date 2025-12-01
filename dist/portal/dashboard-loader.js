// portal/dashboard-loader.js
(function () {
  const state = {
    value: 0,
    done: false,
    timerId: null,
    backdrop: null,
    bar: null,
    label: null,
  };

  function initEls() {
    if (!state.backdrop) {
      state.backdrop = document.querySelector('[data-loader="backdrop"]');
      state.bar = document.querySelector('[data-loader="bar"]');
      state.label = document.querySelector('[data-loader="label"]');
    }
  }

  function clamp01(x) {
    if (x < 0) return 0;
    if (x > 1) return 1;
    return x;
  }

function setProgress(percent) {
  initEls();
  state.value = clamp01(percent / 100) * 100;

  if (state.bar) {
    state.bar.style.width = state.value + '%';
  }

  if (state.label) {
    const v = Math.round(state.value);
    state.label.textContent = v + '%';   // no innerHTML
  }
}


function start() {
  initEls();
  if (!state.backdrop) return;
  state.done = false;

  // ⬇️ make sure it’s visible again
  // (optional) reset opacity/visibility if your CSS uses them
  state.backdrop.classList.remove('is-hidden');
  state.backdrop.style.display = 'flex'; // or 'block' depending on your layout
  setProgress(5);

  // Fake, smooth progress up to ~80%
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = window.setInterval(() => {
    if (state.done) return;
    let next = state.value;

    if (next < 40)      next += 4;
    else if (next < 70) next += 2;
    else if (next < 80) next += 0.5;

    if (next > 80) next = 80;
    setProgress(next);
  }, 250);
}


  // Optional: let other modules bump it a bit
  function bump(delta) {
    if (state.done) return;
    const next = state.value + (delta || 5);
    setProgress(next > 90 ? 90 : next);
  }

  function finish() {
    initEls();
    state.done = true;

    if (state.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }

    // Jump to 100, then fade out
    setProgress(100);

    window.setTimeout(() => {
      if (state.backdrop) {
        state.backdrop.classList.add('is-hidden');
        // 👇 AFTER FADE, HIDE IT COMPLETELY
        window.setTimeout(() => {
          if (state.backdrop) {
            state.backdrop.style.display = 'none';
          }
        }, 200); // match your CSS transition duration
      }
    }, 150);
  }

  // Expose a tiny API
  window.portalLoader = {
    start,
    bump,
    finish,
  };
})();
