(function () {
  "use strict";

  var LIST_TO = "hi@nohype.ai";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(value) {
    return EMAIL_RE.test(value);
  }

  function mailtoFor(email) {
    var subject = "Please add me to the olive-mail email list";
    var body =
      "Hello,\n\n" +
      "Please append the following address to the olive-mail email list:\n\n" +
      email +
      "\n\nThank you.\n";
    return (
      "mailto:" +
      LIST_TO +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  function setStatus(form, message, kind) {
    var hint = form.parentElement.querySelector("[data-join-status]");
    if (!hint) return;
    hint.textContent = message;
    hint.classList.toggle("is-error", kind === "error");
    hint.classList.toggle("is-ok", kind === "ok");
    if (kind === "error") hint.setAttribute("role", "alert");
    else hint.removeAttribute("role");
  }

  function onSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var input = form.querySelector('input[type="email"]');
    var email = (input.value || "").trim();

    if (!isValidEmail(email)) {
      setStatus(form, "Enter a valid email address.", "error");
      input.focus();
      return;
    }

    setStatus(
      form,
      "Your mail app should open a draft to " + LIST_TO + ".",
      "ok"
    );
    window.location.href = mailtoFor(email);
  }

  document.querySelectorAll("form.join").forEach(function (form) {
    form.addEventListener("submit", onSubmit);
  });

  var brand = document.querySelector("a.brand");
  if (brand) {
    brand.addEventListener("click", function (event) {
      event.preventDefault();
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }
})();
