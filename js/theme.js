let isDarkTheme = true;
let checkboxThemeEl;

export function initTheme() {
  console.log("Init theme called");
  checkboxThemeEl = document.getElementById("checkboxTheme");

  checkboxThemeEl.addEventListener("change", () => {
    isDarkTheme = checkboxThemeEl.checked;
    applyTheme();
  });

  updateCheckboxThemeUi();
}

function updateCheckboxThemeUi() {
  if (isDarkTheme) {
    checkboxThemeEl.checked = true;
  } else {
    checkboxThemeEl.checked = false;
  }

  applyTheme(isDarkTheme);
}

function applyTheme() {
  if (isDarkTheme) {
    document.body.className = "theme-dark";
    return;
  }

  document.body.className = "theme-light";
}
