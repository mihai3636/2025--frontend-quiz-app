import { showSection, hideActiveSections } from "./common.js";

export function initCategories() {
  document
    .querySelector(".quiz-section--categories > .quiz-list")
    .addEventListener("click", (ev) => {
      if (ev.target === ev.currentTarget) {
        return;
      }

      const clickedItem = event.target.closest(".quiz-item");
      console.log(`Clicked ${clickedItem.dataset.category}`);

      hideActiveSections();
      showSection(".quiz-section--title-question");
      showSection(".quiz-section--answers");
      showSection(".btn-container");

      history.pushState({ screen: "quiz" }, "", "");
    });
}

export function showCategories() {
  hideActiveSections();
  showSection(".quiz-section--title");
  showSection(".quiz-section--categories");
}
