export function showSection(selector) {
  const el = document.querySelector(selector);
  el.classList.remove(`hidden-${el.dataset.side}`);
  el.classList.add("active");
}

export function hideActiveSections() {
  document.querySelectorAll(".active").forEach((el) => {
    let side = el.dataset.side || "right";
    el.classList.remove("active");
    el.classList.add(`hidden-${side}`);
  });
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
