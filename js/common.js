export function showSection(selector) {
  const el = document.querySelector(selector);
  el.classList.remove(`hidden-${el.dataset.side}`);
  el.classList.add("active");

  updateSectionTabbableState(el, true);
}

export function hideActiveSections() {
  document.querySelectorAll(".active").forEach((el) => {
    let side = el.dataset.side || "right";
    el.classList.remove("active");
    el.classList.add(`hidden-${side}`);

    updateSectionTabbableState(el, false);
  });
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateSectionTabbableState(sectionEl, isTabbable) {
  if (!sectionEl) return;

  const focusables = sectionEl.querySelectorAll("[tabindex]");

  focusables.forEach((el) => {
    el.setAttribute("tabindex", isTabbable ? "0" : "-1");
  });
}
