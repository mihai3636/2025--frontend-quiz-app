import { initTheme } from "./theme.js";
import { initCategories } from "./category.js";
import { loadQuizData } from "./dataService.js";
import { initBackButtonListener } from "./navigator.js";
import { showScore } from "./score.js";
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

let questionIndex = -1;
let score = 0;
let questions = [];
let category = "";
let questionIconPath = "";

history.pushState({ screen: "home" }, "", "");
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

function handleNextClicked() {
  console.log("Next was clicked");
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

  console.log("Category clicked: ", categoryName);

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

/*
    TODOs:

    find a way to make the back btn iterate through questions
    when clicking category, load questions data
    populate each question with its data
    make the submit answer logic work
    make the next question btn work
    make the progress bar work
    show the score screen when questions finished
    make the play again btn show the home screen
  */
