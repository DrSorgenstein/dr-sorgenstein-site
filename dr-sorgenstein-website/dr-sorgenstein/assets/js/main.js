(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu after a link is tapped
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // If the viewport grows past the mobile breakpoint, reset menu state
    var desktopQuery = window.matchMedia("(min-width: 980px)");
    function handleViewportChange(e) {
      if (e.matches) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", handleViewportChange);
    } else if (desktopQuery.addListener) {
      // Safari < 14 fallback
      desktopQuery.addListener(handleViewportChange);
    }
  }
})();
