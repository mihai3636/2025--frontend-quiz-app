let isDarkTheme = true;
let checkboxThemeEl = document.getElementById("checkboxTheme");

export function initTheme() {
  checkboxThemeEl.addEventListener("change", () => {
    isDarkTheme = checkboxThemeEl.checked;
    applyTheme();
  });

  updateCheckboxThemeUi();
  applyTheme(isDarkTheme);
}

function updateCheckboxThemeUi() {
  if (isDarkTheme) {
    checkboxThemeEl.checked = true;
  } else {
    checkboxThemeEl.checked = false;
  }
}

function applyTheme() {
  if (isDarkTheme) {
    document.body.className = "theme-dark";
    return;
  }

  document.body.className = "theme-light";
}
