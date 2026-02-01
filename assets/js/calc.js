/**
 * PATH: assets/js/calc.js
 * 
 * Kalkulátor orientační ceny (m² + typ prostoru + stav stěn).
 * - Čte hodnoty z DOM (slider, select, radio).
 * - Přepočítává cenové rozpětí a vypisuje ho do UI.
 * 
 */
(function () {
  const m2El = document.getElementById("calcM2");
  const typeEl = document.getElementById("calcType");
  const wNormal = document.getElementById("wallsNormal");
  const wWorse = document.getElementById("wallsWorse");

  if (!m2El || !typeEl || !wNormal || !wWorse) return;

  const state = {
    // default: metry, typ, stav stěn
    m2: parseInt(m2El.value, 10) || 60,
    type: typeEl.value || "byt",
    walls: wNormal.checked ? "normal" : "worse",

    // sazby v Kč/m²
    rates: {
      byt: { low: 45, high: 65 },
      komerce: { low: 55, high: 80 },
    },

    // koeficient pro stav stěn
    wallMultiplier: { normal: 1.0, worse: 1.2 },
  };

  function fmt(n) {
    return Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function render() {
    const r = state.rates[state.type] || state.rates.byt;
    const k = state.wallMultiplier[state.walls] || 1.0;

    const low = state.m2 * r.low * k;
    const high = state.m2 * r.high * k;

    const out1 = document.getElementById("calcM2Out");
    const out2 = document.getElementById("calcM2Out2");
    const lowEl = document.getElementById("calcPriceLow");
    const highEl = document.getElementById("calcPriceHigh");

    if (out1) out1.textContent = state.m2;
    if (out2) out2.textContent = state.m2;
    if (lowEl) lowEl.textContent = fmt(low);
    if (highEl) highEl.textContent = fmt(high);
  }

  // Events
  m2El.addEventListener("input", (e) => {
    state.m2 = parseInt(e.target.value, 10) || 0;
    render();
  });

  typeEl.addEventListener("change", (e) => {
    state.type = e.target.value;
    render();
  });

  wNormal.addEventListener("change", () => {
    state.walls = "normal";
    render();
  });

  wWorse.addEventListener("change", () => {
    state.walls = "worse";
    render();
  });

  // Initial render
  render();
})();