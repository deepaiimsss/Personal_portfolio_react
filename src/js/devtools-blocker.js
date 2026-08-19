(function () {
  // Do not block developer tools if developing on localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return;
  }

  // Disable right-click context menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Disable common DevTools keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // F12
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I (Inspect)
    if (
      e.ctrlKey &&
      e.shiftKey &&
      (e.key === "I" || e.key === "i" || e.keyCode === 73)
    ) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+J (Console)
    if (
      e.ctrlKey &&
      e.shiftKey &&
      (e.key === "J" || e.key === "j" || e.keyCode === 74)
    ) {
      e.preventDefault();
      return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === "U" || e.key === "u" || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+C (Inspect Element)
    if (
      e.ctrlKey &&
      e.shiftKey &&
      (e.key === "C" || e.key === "c" || e.keyCode === 67)
    ) {
      e.preventDefault();
      return false;
    }
  });
})();
