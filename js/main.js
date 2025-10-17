import { initTheme } from "./theme.js";
import { initCategories } from "./category.js";
import { loadQuizData } from "./dataService.js";
import { initBackButtonListener } from "./navigator.js";
import { showQuestion } from "./question.js";

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

function handleCategoryClicked(categoryName) {
  questionIndex = 0;
  category = categoryName;
  initQuestions();

  showQuestion({
    question: getQuestion(),
    index: 1,
    total: questions.length,
    onCorrect: () => {
      console.log("Correct answer");
    },
    onIncorrect: null,
  });
  history.pushState({ screen: "question" }, "", "");
}

function getQuestion() {
  return questions[questionIndex];
}

function initQuestions() {
  questions = data.find((item) => {
    return item.title.toLowerCase() === category;
  }).questions;
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
