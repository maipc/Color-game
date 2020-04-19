var newGame = document.querySelector("#newGame");
var easyMode = document.querySelector("#easy");
var hardMode = document.querySelector("#hard");
var row2 = document.querySelector(".row2");
var goalColor = document.querySelector("#goal");
var options = document.querySelectorAll(".d-flex .card");
var hintString = document.querySelector("#correctString");
var header = document.querySelector(".title");
var optionNumber = 6;

easyMode.addEventListener("click", function () {
  optionNumber = 3;
  row2.classList.remove("d-flex");
  row2.classList.add("d-none");
  easyMode.classList.add("selected");
  hardMode.classList.remove("selected");
  startGame();
});

hardMode.addEventListener("click", function () {
  optionNumber = 6;
  row2.classList.remove("d-none");
  row2.classList.add("d-flex");
  easyMode.classList.remove("selected");
  hardMode.classList.add("selected");
  startGame();
});

newGame.addEventListener("click", startGame);

function startGame() {
  newGame.textContent = "NEW COLORS";
  goalColor.textContent = generateColor();
  hintString.classList.add("d-none");
  header.style.background = "#3b76a9";
  var ans = Math.floor(Math.random()*optionNumber);
  for (var i = 0; i < options.length; i++) {
    // init color
    if (i === ans) {
      addColor(i, goalColor.textContent);
    } else {
      addColor(i, generateColor());
    }

    // add addEventListener
    options[i].addEventListener("click", function () {
      if (this.style.background === goalColor.textContent.toLowerCase()) {
        hintString.textContent = "Correct!";
        winGame();
      } else {
        this.style.background = "#232323";
        hintString.textContent = "Try again";
      }
      hintString.classList.remove("d-none");
    });
  }
}

function addColor(idx, color) {
  options[idx].style.background = color;
}

function generateColor() {
  return (
    "RGB(" +
    Math.floor(Math.random() * 255) +
    ", " +
    Math.floor(Math.random() * 255) +
    ", " +
    Math.floor(Math.random() * 255) +
    ")"
  );
}

function winGame() {
  for (var i = 0; i < options.length; i++) {
    addColor(i, goalColor.textContent);
  }
  newGame.textContent = "PLAY AGAIN?";
  header.style.background = goalColor.textContent;
}

startGame();
