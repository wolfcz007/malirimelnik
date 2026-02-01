/**
 * PATH: asses/js/main.js
 * 
 * Obecné UI chování:
 * - nastaví aktuální rok do footeru
 * - animace reveal při scrollu (IntersectionObserver)
 * 
 */
(function () {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Reveal on scroll
  const els = document.querySelectorAll(".reveal");
  if (els.length === 0) return;

  // Fallback pro staré prohlížeče
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
})();