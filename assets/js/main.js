(function () {
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");

  const menu = document.querySelector(".menu");
  const items = [...menu.children];

  items.forEach((item) => {
    item.addEventListener("click", () => {
      openForm(item);
    });
  });

  const openForm = (item) => {
    changeStep(2);

    const form = document.getElementById(`simulator_${item.id}`);
    const btn = form.querySelector("button");
    const resultContainer = form.parentElement.querySelector(".result");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const fieldVf = form.querySelector("#field_vf") || null;
      const fieldVp = form.querySelector("#field_vp") || null;
      const fieldI = form.querySelector("#field_i") || null;
      const fieldN = form.querySelector("#field_n") || null;
      let result;

      switch (item.id) {
        case "vf":
          result = calculator.vf(fieldVp.value, fieldI.value, fieldN.value);
          break;
        case "vp":
          result = calculator.vp(fieldVf.value, fieldI.value, fieldN.value);
          break;
        case "i":
          result = calculator.i(fieldVf.value, fieldVp.value, fieldN.value);
          break;
        case "n":
          result = calculator.n(fieldVf.value, fieldVp.value, fieldI.value);
          break;
      }

      showResult(e, item.id, resultContainer, result);
    });

    form.parentElement.classList.add("simulator__show");
  };

  const changeStep = (numberNextStep) => {
    const previewStep = document.querySelector(".step__show");
    const nextStep = document.querySelector(`.step-${numberNextStep}`);

    previewStep.classList.remove("step__show");
    nextStep.classList.add("step__show");
  };

  const showResult = (event, id, container, result) => {
    event.preventDefault();
    container.classList.add("result__show");
    container.innerText = `${id.toUpperCase()} = ${result}`;
  };

  class Calculator {
    vf(vp, i, n) {
      const vf = vp * (1 + i / 100) ** n;
      const result = vf.toFixed(2);
      return result;
    }

    vp(vf, i, n) {
      const vp = vf / (1 + i / 100) ** n;
      const result = vp.toFixed(2);
      return result;
    }

    i(vf, vp, n) {
      const I = vf - vp;
      const i = I / (vp * n);
      const result = i.toFixed(2);
      return result;
    }

    n(vf, vp, i) {
      const n = Math.log(vf / vp) / Math.log(1 + i / 100);
      const result = Math.round(n);
      return result;
    }
  }

  const calculator = new Calculator();
})();
