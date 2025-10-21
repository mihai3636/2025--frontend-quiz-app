import { showCategories } from "./category.js";
import { hideQuestionLogo } from "./question.js";

export function initBackButtonListener() {
  window.addEventListener("popstate", (event) => {
    showCategories();
    hideQuestionLogo();
  });
}
