let isDarkTheme = true;
const checkboxThemeEl = document.getElementById("checkboxTheme");
const labelThemeSwitcherEl = document.querySelector(
  ".theme-switcher-btn-container"
);

export function initTheme() {
  checkboxThemeEl.addEventListener("change", () => {
    isDarkTheme = checkboxThemeEl.checked;
    applyTheme();
  });

  labelThemeSwitcherEl.addEventListener(
    "keydown",
    handleLabelThemeSwitcherKeyPress
  );

  updateCheckboxThemeUi();
  applyTheme(isDarkTheme);
}

function handleLabelThemeSwitcherKeyPress(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    isDarkTheme = !isDarkTheme;
    updateCheckboxThemeUi();
    applyTheme();
  }
}

function updateCheckboxThemeUi() {
  checkboxThemeEl.checked = isDarkTheme;
  labelThemeSwitcherEl.setAttribute("aria-checked", isDarkTheme);
}

function applyTheme() {
  if (isDarkTheme) {
    document.body.className = "theme-dark";
    return;
  }

  document.body.className = "theme-light";
}
