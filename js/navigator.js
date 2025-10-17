import { showCategories } from "./category.js";

export function initBackButtonListener() {
  window.addEventListener("popstate", (event) => {
    showCategories();
  });
}
