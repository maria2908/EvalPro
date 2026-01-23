 function calcAll() {
    // =============== PRESENTATION (Zwischenergebnis 2) ==================
    // Your existing code may calculate totalScore as intermediate 2.
    // We will use totalScore input as Zwischenergebnis 2:
    const zwischen2 = parseFloat(document.getElementById("totalScore")?.value || 0);

    // =============== FACHGESPRÄCH (Zwischenergebnis 3) ==================
    const fgRows = document.querySelectorAll(".row");
    let zwischen3 = 0;

    fgRows.forEach(row => {
      const pointsInput = row.querySelector(".fg-points");
      const factorInput = row.querySelector(".fg-factor");
      const resultInput = row.querySelector(".fg-result");

      if(!pointsInput || !factorInput || !resultInput) return;

      const p = parseFloat(pointsInput.value || 0);
      const f = parseFloat(factorInput.value || 0);
      const res = p * f;

      resultInput.value = res.toFixed(1);
      zwischen3 += res;
    });

    const z3 = document.getElementById("zwischen3");
    if(z3) z3.value = zwischen3.toFixed(1);

    // =============== FINAL (max 100) ===================================
    const finalTotal = zwischen2 + zwischen3;
    const final100 = document.getElementById("final100");
    if(final100) final100.value = finalTotal.toFixed(1);
  }

  document.addEventListener("input", (e) => {
    if (
      e.target.matches(".points") ||
      e.target.matches(".factor") ||
      e.target.matches(".fg-points") ||
      e.target.matches(".fg-factor")
    ) {
      // also keep your old calc if needed
      if (typeof calc === "function") calc();
      calcAll();
    }
  });

  // initial calculation
  if (typeof calc === "function") calc();
  calcAll();

