import { initTheme } from "./theme.js";
import { initCategories } from "./category.js";
import { loadQuizData } from "./dataService.js";
import { initBackButtonListener } from "./navigator.js";
import { showScore, initBtnPlayAgainClickListener } from "./score.js";
import {
  showQuestion,
  showBtnNext,
  initBtnNextClickListener,
  initBtnQuestionClickListener,
  updateQuestionData,
  showBtnSubmit,
  showQuestionLogo,
  hideQuestionLogo,
} from "./question.js";

// TODO:
/*
  - add play again btn on score screen
  - Navigate the entire app only using their keyboard
*/

let questionIndex = -1;
let score = 0;
let questions = [];
let category = "";
let questionIconPath = "";

initTheme();

let data = await loadQuizData();
console.log(data);

initBackButtonListener();
initCategories(handleCategoryClicked);

initBtnNextClickListener(handleNextClicked);
initBtnQuestionClickListener({
  onCorrect: handleCorrectAnswer,
  onIncorrect: handleIncorrectAnswer,
});
initBtnPlayAgainClickListener(handlePlayAgain);

function handleNextClicked() {
  if (wasLastQuestion()) {
    showScore({ score: score, totalScore: questions.length });
    return;
  }

  updateQuestionData({
    question: getQuestion(),
    index: questionIndex + 1,
    total: questions.length,
  });
  showBtnSubmit();
}

function handleCategoryClicked(categoryName) {
  score = 0;
  questionIndex = 0;
  category = categoryName;
  initQuestions();
  initQuestionIconPath();

  showQuestion({
    question: getQuestion(),
    index: questionIndex + 1,
    total: questions.length,
  });

  showQuestionLogo(questionIconPath, categoryName);

  history.pushState({ screen: "question" }, "", "");
}

function handleCorrectAnswer() {
  score += 1;
  questionIndex += 1;
  showBtnNext();
}

function handleIncorrectAnswer() {
  questionIndex += 1;
  showBtnNext();
}

function handlePlayAgain() {
  window.history.back();
}

function getQuestion() {
  return questions[questionIndex];
}

function initQuestions() {
  questions = data.find((item) => {
    return item.title.toLowerCase() === category;
  }).questions;
}

function initQuestionIconPath() {
  questionIconPath = data.find((item) => {
    return item.title.toLowerCase() === category;
  }).icon;
}

function wasLastQuestion() {
  return questionIndex === questions.length;
}
