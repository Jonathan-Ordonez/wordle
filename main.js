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
document.addEventListener("DOMContentLoaded",())=>{
  createSquares();
  function createSquares() {
    const gameBoard = document.getElementById("board");
    for (let index = 0; index < 22; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAtributte("id", index + 1);
      gameBoard.appendChild(square);
    }
  }
}
