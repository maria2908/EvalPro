function calc() {
      const rows = document.querySelectorAll(".row");
      let total = 0;

      rows.forEach(row => {
        const pointsInput = row.querySelector(".points");
        const factorInput = row.querySelector(".factor");
        const resultInput = row.querySelector(".result");

        const points = parseFloat(pointsInput.value || 0);
        const factor = parseFloat(factorInput.value || 0);

        const res = points * factor;
        resultInput.value = res.toFixed(1);
        total += res;
      });

      document.getElementById("totalScore").value = total.toFixed(1);

      // simple grade text
      const grade = document.getElementById("gradeText");
      if (total >= 25) grade.textContent = "sehr gut";
      else if (total >= 20) grade.textContent = "gut";
      else if (total >= 15) grade.textContent = "befriedigend";
      else if (total >= 10) grade.textContent = "ausreichend";
      else grade.textContent = "ungenügend";
    }

    document.addEventListener("input", (e) => {
      if (e.target.matches(".points") || e.target.matches(".factor")) {
        calc();
      }
    });

    calc();