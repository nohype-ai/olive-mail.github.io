(function () {
  "use strict";

  var brand = document.querySelector("a.brand");
  if (brand) {
    brand.addEventListener("click", function (event) {
      event.preventDefault();
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  var install = document.querySelector(".term-install");
  if (install) {
    var label = install.querySelector(".term-copy-label");
    var copiedTimer;

    function copied() {
      if (!label) return;
      label.textContent = "Copied";
      install.classList.add("is-copied");
      clearTimeout(copiedTimer);
      copiedTimer = setTimeout(function () {
        label.textContent = "Copy";
        install.classList.remove("is-copied");
      }, 1600);
    }

    function copyInstall() {
      var command = install.getAttribute("data-copy") || "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(command).then(copied).catch(function () {
          window.prompt("Copy install command:", command);
        });
      } else {
        window.prompt("Copy install command:", command);
      }
    }

    install.addEventListener("click", copyInstall);
    install.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        copyInstall();
      }
    });
  }
})();
