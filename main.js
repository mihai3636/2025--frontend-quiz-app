console.log("Hello world!");

let isDarkTheme = true;
const checkboxThemeEl = document.getElementById("checkboxTheme");

checkboxThemeEl.addEventListener("change", () => {
  isDarkTheme = checkboxThemeEl.checked;
  changeTheme();
});

updateCheckboxThemeUi();

function updateCheckboxThemeUi() {
  if (isDarkTheme) {
    checkboxThemeEl.checked = true;
  } else {
    checkboxThemeEl.checked = false;
  }

  changeTheme(isDarkTheme);
}

function changeTheme() {
  if (isDarkTheme) {
    document.body.className = "theme-dark";
    return;
  }

  document.body.className = "theme-light";
}

function showSection(selector) {
  const el = document.querySelector(selector);
  el.classList.remove(`hidden-${el.dataset.side}`);
  el.classList.add("active");
}

function hideActiveSections() {
  document.querySelectorAll(".active").forEach((el) => {
    let side = el.dataset.side || "right";
    el.classList.remove("active");
    el.classList.add(`hidden-${side}`);
  });
}

document
  .querySelector(".quiz-section--categories > .quiz-list")
  .addEventListener("click", (ev) => {
    if (ev.target === ev.currentTarget) {
      console.log("Clicking in between");
      return;
    }

    const clickedItem = event.target.closest(".quiz-item");
    console.log(`Clicked ${clickedItem.dataset.category}`);

    hideActiveSections();
    showSection(".quiz-section--title-question");
    showSection(".quiz-section--answers");
    showSection(".btn-container");
  });
