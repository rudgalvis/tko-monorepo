// File#: _1_swipe-content (Updated with Hammer.js)
(function () {
  var SwipeContent = function (element) {
    this.element = element;
    initSwipeContent(this);
  };

  function initSwipeContent(content) {
    // Initialize Hammer.js on the element
    var hammertime = new Hammer(content.element);

    // Handle swipeleft and swiperight
    hammertime.on("swipeleft", function (ev) {
      emitSwipeEvents(content, "swipeLeft");
    });
    hammertime.on("swiperight", function (ev) {
      emitSwipeEvents(content, "swipeRight");
    });
  }

  function emitSwipeEvents(content, eventName) {
    var event = new CustomEvent(eventName, {
      detail: { origin: content.element },
    });
    content.element.dispatchEvent(event);
  }

  window.SwipeContent = SwipeContent;

  // Initialize the SwipeContent objects
  var swipe = document.getElementsByClassName("js-swipe-content");
  if (swipe.length > 0) {
    for (var i = 0; i < swipe.length; i++) {
      (function (i) {
        new SwipeContent(swipe[i]);
      })(i);
    }
  }
})();
