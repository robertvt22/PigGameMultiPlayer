const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const dice = document.querySelector(".dice");

const player0Box = document.querySelector(".player--0");
const player1Box = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = "";
  score1El.textContent = "";
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice.classList.add("hidden");
  player0Box.classList.remove("player--winner");
  player1Box.classList.remove("player--winner");
  player0Box.classList.add("player--active");
  player1Box.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  if (activePlayer === 0) activePlayer = 1;
  else activePlayer = 0;
  player0Box.classList.toggle("player--active");
  player1Box.classList.toggle("player--active");
  dice.classList.add("hidden");
};

btnNew.addEventListener("click", init);

btnRoll.addEventListener("click", function () {
  if (playing) {
    dice.classList.remove("hidden");
    let luckyNumber = Math.trunc(Math.random() * 6) + 1;
    dice.style.background = `url(img/dice-${luckyNumber}.png) no-repeat center center/cover`;
    if (luckyNumber !== 1) {
      currentScore += luckyNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing && currentScore !== 0) {
    dice.classList.add("hidden");
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else switchPlayer();
  } else if (playing) {
    alert("roll the dice");
  }
});
