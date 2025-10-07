console.log("Hello world!");

let isDarkTheme = false;
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
