// palabras para el juego, agregar las que quieran siempre de 5 letras
// es un array de strings (dict por dictionary)
let dict = [
  'gatos',
  'papas',
  'fuego',
  'huevo',
  'color',
  'casas',
  'arbol',
  'nueve',
  'zorro',
  'remar',
  'locro',
  'jamon',
  'feliz',
  'cinco',
  'tonto',
  'cuero',
  'volar',
  'vuelo',
  'avion',
  'genio',
  'pibes'
];
let palabraOculta = dict[Math.floor(Math.random()*dict.length)];

const campodepalabra = document.querySelectorAll("#tabladelwordle .fila");
const inputs = document.querySelectorAll("#tabladelwordle .columna");
const resultAlert = document.getElementById("result-alert");

function checkChar(char) {
  const res = [];
  for (let i=0; i<palabraOculta.length; i++) {
    if (char[i] === palabraOculta[i]) res.push(1);
    else if (palabraOculta.includes(char[i])) res.push(0);
    else res.push(-1);
  }
  return res;
}

function showClues(result, field) {
  const inputs = field.querySelectorAll(".columna");

  inputs.forEach((input, index) => {
    input.style.color = "white";
    if (result[index] < 0) input.style.backgroundColor = "var(--clr-gris)";
    else if (result[index] > 0) input.style.backgroundColor = "var(--clr-verde)";
    else input.style.backgroundColor = "var(--clr-amarillo)";
  });
}

function toggleInputs(field) {
  field.querySelectorAll(".columna")
    .forEach(inpEl => inpEl.disabled = field.currentAttempt ? false : true);
}

function checkResult(result) {
  if (result.every(ans => ans === 1)) return true;
  else return false;
}


function showResultAlert(isCorrect = false, message = "Error") {
  resultAlert.textContent = message;
  if (isCorrect) {
    resultAlert.classList.add("correct");
  } else {
    resultAlert.classList.add("wrong");
  }
  resultAlert.classList.remove("hidden");
}

campodepalabra.forEach((field, index) => {
  // habilita solo primer fila
  field.currentAttempt = index == 0 ? true : false;
  toggleInputs(field);

  field.addEventListener("submit", ev => {
    ev.preventDefault();
    let word = "";

    field.querySelectorAll(".col").forEach(inpEl => word += inpEl.value);

    const result = checkChar(word);
    showClues(result, field);

    //habilita la siguiente fila
    field.currentAttempt = false;
    toggleInputs(field);

    if (checkResult(result)) {
      showResultAlert(true, "Ganaste");
    } else {
      if (field.nextElementSibling != null) {
        field.nextElementSibling.firstElementChild.currentAttempt = true;
        toggleInputs(field.nextElementSibling.firstElementChild);
        field.nextElementSibling.firstElementChild.firstElementChild.focus();
      } else {
        showResultAlert(false, "Perdiste, suerte en la proximaaaa");
      }
    }
    });

  field.addEventListener("keydown", ev => {
    const keyCode = ev.keyCode || ev.charCode;
    const word = field.querySelector(".inputdelcuadrado");

    if (keyCode === 13) {
      const submitBtn = field.querySelector("button[type='submit']");

      for (const inpEl of word.children) {
        if (inpEl.value === "") return;
      }
submitBtn.click();
    }
  });
});

inputs.forEach(input => {
  input.maxLength = 1;

  input.addEventListener("keydown", ev => {
    const keyCode = ev.keyCode || ev.charCode;

    if (keyCode === 8) {
      if (input.value.length !== input.maxLength && input.previousElementSibling != null) {
        input.previousElementSibling.focus();
      }
    } else if (keyCode < 65 || keyCode > 90) {
      ev.preventDefault();
    }
  });

  input.addEventListener("input", () => {
    if (input.value.length === input.maxLength && input.nextElementSibling != null) {
      input.nextElementSibling.focus();
    }
  });
});
