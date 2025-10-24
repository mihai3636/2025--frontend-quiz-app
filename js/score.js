import { showSection, hideActiveSections } from "./common.js";

const scoreValueEl = document.querySelector(".score-value");
const constTotalEl = document.getElementById("score-total");
const btnPlayAgain = document.getElementById("btnPlayAgain");

export function showScore({ score, totalScore }) {
  updateScoreData(score, totalScore);

  hideActiveSections();
  showSection(".quiz-section--score");
  showSection(".quiz-section--title-score");
  showSection(".btn--score");
}

export function initBtnPlayAgainClickListener(onClick) {
  btnPlayAgain.addEventListener("click", (ev) => {
    console.log("Mihai btn play again clicked");
    onClick();
  });
}

function updateScoreData(score, totalScore) {
  scoreValueEl.textContent = score;
  constTotalEl.textContent = totalScore;
}
