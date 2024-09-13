document.querySelectorAll(".player-move").forEach((button) => {
  button.addEventListener("click", handleEvent);
});

document.querySelector("#reset").addEventListener("click", resetGame);

let score = JSON.parse(localStorage.getItem("score")) || {
  won: 0,
  loss: 0,
  tie: 0,
};

let result = "Fight!";

updateScore();

function getComputerMove() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;

  switch (randomNumber) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
    default:
      return "rock";
  }
}

function handleEvent(event) {
  const playerMove = event.target.id;
  const computerMove = getComputerMove();

  console.log("Event target:", event.target);
  console.log("Player Move:", playerMove);
  console.log("Computer Move:", computerMove);

  if (playerMove === computerMove) {
    result = `You pick ${playerMove}, AI pick ${computerMove}, it's a tie.`;
    score.tie++;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = `You pick ${playerMove}, AI pick ${computerMove}, You Win.`;
    score.won++;
  } else {
    result = `You pick ${playerMove}, AI pick ${computerMove}, You are loser!!.`;
    score.loss++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScore();
}

function updateScore() {
  console.log("Current score: ", score);
  document.querySelector(".game-result").textContent = `${result}`;
  document.querySelector("#won").textContent = `Won: ${score.won}`;
  document.querySelector("#tie").textContent = `Tie: ${score.tie}`;
  document.querySelector("#loss").textContent = `Loss: ${score.loss}`;
}

function resetGame() {
  score = {
    won: 0,
    loss: 0,
    tie: 0,
  };

  result = "Fight!";

  localStorage.setItem("score", JSON.stringify(score));

  updateScore();
}
