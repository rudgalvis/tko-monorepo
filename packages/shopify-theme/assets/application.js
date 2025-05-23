if ("ontouchstart" in document.documentElement) {
  document.body.classList.add("touch-device");
} else {
  document.body.classList.add("hover-device");
}

const VERBOSE = true;

// Extend console log for easier debugging
const c = {
  log: (...args) => {
    console.log("dump", ...args);
  },
  verbose: (...args) => {
    if (!VERBOSE) return;

    console.log("dump", ...args);
  },
};

function clearAllStorageExceptCart() {
  // ------ CLEAR LOCAL STORAGE ------
  // Define only the essential Shopify cart keys to keep
  const cartKeysToKeep = [
    "cart",
    "shopify_cart_token",
    "cart_ts",
    "cart_sig",
    "_shopify_cart",
  ];

  // Aggressively clear localStorage except cart items
  Object.keys(localStorage).forEach((key) => {
    if (
      !cartKeysToKeep.includes(key) &&
      !key.startsWith("cart_") &&
      !key.includes("cart")
    ) {
      localStorage.removeItem(key);
    }
  });

  // ------ CLEAR SESSION STORAGE ------
  // Completely clear sessionStorage (rarely contains cart data)
  sessionStorage.clear();

  // ------ CLEAR COOKIES ------
  // Define only the essential Shopify cart cookies to keep
  const cartCookiesToKeep = [
    "cart",
    "cart_sig",
    "cart_ts",
    "cart_ver",
    "_shopify_cart",
  ];

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

    // Only keep the specific cart cookies
    if (!cartCookiesToKeep.includes(name) && !name.startsWith("cart_")) {
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";

      // Also clear with domain path to ensure complete removal
      document.cookie =
        name +
        "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" +
        window.location.hostname;
    }
  }

  console.log("Storage cleared except for cart data");

  // Set flag to avoid clearing again in this session if needed
  localStorage.setItem("storage_cleared", "true");
}

const init = async () => {
  if (!window.UI) {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return init();
  }

  // Add a unique version/timestamp identifier
  const clearingVersion = "2023-05-23-v1"; // Change this when you need to trigger clearing again

  // Check if we've cleared for this specific version
  if (localStorage.getItem("storage_cleared_version") !== clearingVersion) {
    clearAllStorageExceptCart();
    localStorage.setItem("storage_cleared_version", clearingVersion);
    setTimeout(() => {
      // Reload to ensure a cache is refreshed
      window.location.reload(true);
    })
  }

  window.UI.stores.displayCurrency.subscribe(e => {
    if(!e)  window.UI.stores.displayCurrency.set(window.Shopify.currency.active);
  })

  window.UI.stores.marketCurrency.set(window.Shopify.currency.active);
};

const componentLibRelay = () => {
  const VERBOSE = true;

  // Extend console log for easier debugging
  const c = {
    log: (...args) => {
      console.log("dump", ...args);
    },
    verbose: (...args) => {
      if (!VERBOSE) return;

      console.log("dump", ...args);
    },
  };

  const updatePreorderStrip = (content) => {
    const preorderStrip = document.querySelector("pre-order-strip");

    if (!preorderStrip) return c.verbose("Preorder strip not found");

    preorderStrip.setAttribute("message", content);
  };

  const handleColorOrSizeChange = (e) => {
    const { preorderContent } = e.target.dataset;

    updatePreorderStrip(preorderContent);
  };

  const listen = () => {
    $(".color-changer").on("click", handleColorOrSizeChange);
    $(".size-holder li a").on("click", handleColorOrSizeChange);
  };

  listen();
};

init();
componentLibRelay();
