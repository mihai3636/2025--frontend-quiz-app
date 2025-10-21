import { showSection, hideActiveSections, capitalize } from "./common.js";

const currentQuestionIndexEl = document.getElementById("currentQuestionIndex");
const totalQuestionsEl = document.getElementById("totalQuestions");
const questionTextEl = document.querySelector(".question-text");
const progressBarEl = document.querySelector(".progress-bar");
const radioBtnsEl = document.querySelectorAll(`input[type="radio"]`);

const btnQuestion = document.querySelector("#btnSubmit");
const btnNext = document.querySelector("#btnNext");

const btnErrorEl = document.querySelector(".btn-error");

const answersSectionEl = document.querySelector(".quiz-section--answers");

const headerEl = document.querySelector("header");

const imgLogoIcon = headerEl.querySelector(".logo-icon");

const logoContainerEl = headerEl.querySelector(".logo-container");

const logoTitleTextEl = headerEl.querySelector(".title-text");

let correctAnswer = "";

export function showQuestion({ question, index, total }) {
  updateQuestionData({
    question: question,
    index: index,
    total: total,
  });

  hideActiveSections();
  showSection(".quiz-section--title-question");
  showSection(".quiz-section--answers");
  showSection(".btn-container");
  showBtnSubmit();
}

export function updateQuestionData({ question, index, total }) {
  correctAnswer = question.answer;
  updateAnswers(question.options);

  unmarkTrueCorrectFromAll();
  markTrueCorrect();

  enableRadios();
  hideCorrect();
  hideIncorrect();
  hideError();

  resetSelectedAnswer();
  updateProgressBar(index, total);
  updateQuestionText(question.question);
  updateQuestionIndex(index);
  updateTotalQuestions(total);
}

export function showQuestionLogo(iconPath, categorySelected) {
  console.log(`Trying to show icon: ${iconPath}`);
  imgLogoIcon.src = iconPath;
  clearLogoStyles();
  logoContainerEl.classList.add(`logo--${categorySelected}`);

  let title =
    categorySelected.length <= 4
      ? categorySelected.toUpperCase()
      : capitalize(categorySelected);

  logoTitleTextEl.textContent = title;

  headerEl.classList.remove("hidden-logo");
}

export function hideQuestionLogo() {
  headerEl.classList.add("hidden-logo");
}

function updateQuestionIndex(newValue) {
  console.log(`Updating question index: ${newValue}`);
  currentQuestionIndexEl.textContent = newValue;
}

function updateTotalQuestions(newValue) {
  totalQuestionsEl.textContent = newValue;
}

function updateQuestionText(newValue) {
  questionTextEl.textContent = newValue;
}

function updateProgressBar(index, total) {
  let percentage = (index * 100) / total;
  progressBarEl.style.setProperty("--percentage", `${percentage}%`);
}

function resetSelectedAnswer() {
  radioBtnsEl.forEach((radio) => {
    radio.checked = false;
  });
}

function updateAnswers(options) {
  let answers = document.querySelectorAll(".quiz-section--answers .item-title");
  answers.forEach((title, index) => {
    title.textContent = options[index] || "";
  });
}

function showError() {
  btnErrorEl.classList.add("btn-error--visible");
}

function hideError() {
  btnErrorEl.classList.remove("btn-error--visible");
}

function showCorrect() {
  answersSectionEl.classList.add("quiz-section--correct");
}

function hideCorrect() {
  answersSectionEl.classList.remove("quiz-section--correct");
}

function showIncorrect() {
  answersSectionEl.classList.add("quiz-section--incorrect");
}

function hideIncorrect() {
  answersSectionEl.classList.remove("quiz-section--incorrect");
}

function markTrueCorrect() {
  let radioTrueCorrect = getTrueCorrectInputRadio();
  radioTrueCorrect.classList.add("true-correct");
}

function unmarkTrueCorrectFromAll() {
  radioBtnsEl.forEach((radio) => {
    radio.classList.remove("true-correct");
  });
}

function getTrueCorrectInputRadio() {
  let correctTitle = Array.from(
    document.querySelectorAll(".quiz-section--answers .item-title")
  ).find((title) => title.textContent === correctAnswer);

  return correctTitle.closest("li").querySelector('input[type="radio"]');
}

function disableRadios() {
  radioBtnsEl.forEach((radio) => {
    radio.disabled = true;
  });
}

function enableRadios() {
  radioBtnsEl.forEach((radio) => {
    radio.disabled = false;
  });
}

function isAnswerValid() {
  let isValid = Array.from(radioBtnsEl).find((radio) => radio.checked);

  return !!isValid;
}

function isAnswerCorrect() {
  let radioChecked = Array.from(radioBtnsEl).find((radio) => radio.checked);
  let currentAnswer = radioChecked
    .closest("li")
    .querySelector(".item-title").textContent;

  if (currentAnswer === correctAnswer) {
    return true;
  }

  return false;
}

export function showBtnSubmit() {
  btnQuestion.classList.remove("hidden");
  btnNext.classList.add("hidden");
}

export function showBtnNext() {
  btnQuestion.classList.add("hidden");
  btnNext.classList.remove("hidden");
}

export function initBtnNextClickListener(onClick) {
  btnNext.addEventListener("click", (ev) => {
    onClick();
  });
}

export function initBtnQuestionClickListener({ onCorrect, onIncorrect }) {
  btnQuestion.addEventListener("click", (ev) => {
    let isValid = isAnswerValid();
    if (!isValid) {
      showError();
      return;
    }
    hideError();

    disableRadios();

    if (isAnswerCorrect()) {
      showCorrect();
      onCorrect();
      return;
    }

    showIncorrect();
    onIncorrect();
  });
}

function clearLogoStyles() {
  logoContainerEl.classList.forEach((cls) => {
    if (cls.startsWith("logo--")) {
      logoContainerEl.classList.remove(cls);
    }
  });
}
