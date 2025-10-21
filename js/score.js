import { showSection, hideActiveSections } from "./common.js";

const scoreValueEl = document.querySelector(".score-value");
const constTotalEl = document.getElementById("score-total");

export function showScore({ score, totalScore }) {
  updateScoreData(score, totalScore);

  hideActiveSections();
  showSection(".quiz-section--score");
  showSection(".quiz-section--title-score");
}

function updateScoreData(score, totalScore) {
  scoreValueEl.textContent = score;
  constTotalEl.textContent = totalScore;
}
