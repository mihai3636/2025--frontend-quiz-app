import { initTheme } from "./theme.js";
import { initCategories, showCategories } from "./category.js";
import { loadQuizData } from "./dataService.js";

console.log("Hello world!");

initTheme();

let data = await loadQuizData();
console.log(data);

initCategories();

window.addEventListener("popstate", (event) => {
  showCategories();
});

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
