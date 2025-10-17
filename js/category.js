import { showSection, hideActiveSections } from "./common.js";

export function initCategories(onCategoryClicked) {
  initCategoryClickListener(onCategoryClicked);
}

export function showCategories() {
  hideActiveSections();
  showSection(".quiz-section--title");
  showSection(".quiz-section--categories");
}

function initCategoryClickListener(onCategoryClicked) {
  document
    .querySelector(".quiz-section--categories > .quiz-list")
    .addEventListener("click", (ev) => {
      if (ev.target === ev.currentTarget) {
        return;
      }

      const clickedItem = event.target.closest(".quiz-item");
      onCategoryClicked(clickedItem.dataset.category);
    });
}
