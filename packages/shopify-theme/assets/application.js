if ("ontouchstart" in document.documentElement) {
  document.body.classList.add("touch-device");
} else {
  document.body.classList.add("hover-device");
}

const componentLibRelay = () => {
  const VERBOSE = true

  // Extend console log for easier debugging
  const c = {
    log: (...args) => {
      console.log("dump", ...args);
    },
    verbose: (...args) => {
      if (!VERBOSE) return;

      console.log("dump", ...args);
    }
  }

  const updatePreorderStrip = (content) => {
    const preorderStrip = document.querySelector("pre-order-strip");

    if (!preorderStrip) return c.verbose('Preorder strip not found');

    preorderStrip.setAttribute("message", content);
  };

  const handleColorOrSizeChange = (e) => {
    const { preorderContent } = e.target.dataset;

    updatePreorderStrip(preorderContent);
  }

  const listen = () => {
    $(".color-changer").on("click", handleColorOrSizeChange);
    $(".size-holder li a").on("click", handleColorOrSizeChange);
  };

  listen();
};

componentLibRelay();
