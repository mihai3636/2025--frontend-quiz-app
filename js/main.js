import { initTheme } from "./theme.js";
import { initCategories } from "./category.js";
import { loadQuizData } from "./dataService.js";
import { initBackButtonListener } from "./navigator.js";
import {
  showQuestion,
  showBtnNext,
  initBtnNextClickListener,
  initBtnQuestionClickListener,
  updateQuestionData,
  showBtnSubmit,
} from "./question.js";

let questionIndex = -1;
let score = 0;
let questions = [];
let category = "";

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
    console.log("It was last question, doing nothing");
    return;
  }

  updateQuestionData({
    question: getQuestion(),
    index: questionIndex + 1,
    total: questions.length,
    onCorrect: handleCorrectAnswer,
    onIncorrect: handleIncorrectAnswer,
  });
  showBtnSubmit();
}

function handleCategoryClicked(categoryName) {
  questionIndex = 0;
  category = categoryName;
  initQuestions();

  showQuestion({
    question: getQuestion(),
    index: questionIndex + 1,
    total: questions.length,
  });
  history.pushState({ screen: "question" }, "", "");
}

function handleCorrectAnswer() {
  console.log("Correct answer");
  score += 1;
  questionIndex += 1;
  showBtnNext();
}

function handleIncorrectAnswer() {
  console.log("Incorrect answer");
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
