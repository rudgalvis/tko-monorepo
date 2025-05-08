if ("ontouchstart" in document.documentElement) {
  document.body.classList.add("touch-device");
} else {
  document.body.classList.add("hover-device");
}

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


const init = async () => {
  if(!window.UI) {
    await new Promise(resolve => setTimeout(resolve, 25));
    return init();
  }

  window.UI.stores.marketCurrency.set(window.Shopify.currency.active);
  window.UI.stores.displayCurrency.set(window.Shopify.currency.active);
}

async function changeCurrency(newCurrency) {
  try {
    const response = await fetch('/cart/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: newCurrency,
        sections: 'cart-items,cart-footer' // Add your cart sections if needed
      })
    });

    if (response.ok) {
      // Refresh the page to update all prices
      window.location.reload();
    }
  } catch (error) {
    console.error('Error changing currency:', error);
  }
}

window['changeCurrency'] = changeCurrency


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

init()
componentLibRelay();
