(() => {
  "use strict";
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.getElementById("navigation");
  if (!toggle || !navigation) return;
  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      close();
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) close();
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", close);
})();
