var newGame = document.querySelector("#newGame");
var mode = document.querySelectorAll(".mode");
var goalColor = document.querySelector("#goal");
var options = document.querySelectorAll(".d-flex .card");
var hintString = document.querySelector("#correctString");
var header = document.querySelector(".title");
var optionNumber = 6;

for (var i = 0; i < mode.length; i++) {
  mode[i].addEventListener("click", function () {
    mode[0].classList.remove("selected");
    mode[1].classList.remove("selected");
    this.classList.add("selected");
    if (this.textContent === "EASY") {
      optionNumber = 3;
    } else {
      optionNumber = 6;
    }
    startGame();
  });
}

newGame.addEventListener("click", startGame);

startGame();

function startGame() {
  newGame.textContent = "NEW COLORS";
  goalColor.textContent = generateColor();
  hintString.textContent = "";
  header.style.background = "#3b76a9";
  var ans = Math.floor(Math.random() * optionNumber);
  // init color
  for (var i = 0; i < options.length; i++) {
    if (i === ans) {
      addColor(i, goalColor.textContent);
    } else if (i >= optionNumber) {
      addColor(i, "#232323");
    } else {
      addColor(i, generateColor());
    }
  }

  // add addEventListener
  for (var i = 0; i < optionNumber; i++) {
    options[i].addEventListener("click", checkAnswer);
  }

  // remove unused listener
  for (var i = optionNumber; i < options.length; i++) {
    options[i].removeEventListener("click", checkAnswer);
  }
}

function checkAnswer(event) {
  if (event.target.style.background === goalColor.textContent.toLowerCase()) {
    hintString.textContent = "Correct!";
    winGame();
  } else {
    event.target.style.background = "#232323";
    hintString.textContent = "Try again";
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
  for (var i = 0; i < optionNumber; i++) {
    addColor(i, goalColor.textContent);
  }
  newGame.textContent = "PLAY AGAIN?";
  header.style.background = goalColor.textContent;
}
