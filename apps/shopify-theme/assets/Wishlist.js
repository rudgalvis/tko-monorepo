const LOCAL_STORAGE_WISHLIST_KEY = 'shopify-wishlist';
const LOCAL_STORAGE_DELIMITER = ',';
const BUTTON_ACTIVE_CLASS = 'active';
const GRID_LOADED_CLASS = 'loaded';

const selectors = {
    button: '[button-wishlist]',
    grid: '[grid-wishlist]',
    count: '[data-wishlist-render]',
    productCard: '.product-card',
};

document.addEventListener('DOMContentLoaded', () => {
    /* initButtons();*/
    initGrid();
});

document.addEventListener('shopify-wishlist:updated', (event) => {
    console.log('[Shopify Wishlist] Wishlist Updated ✅', event.detail.wishlist);
    initGrid();
    populateWishlistCount()
});

document.addEventListener('shopify-wishlist:init-product-grid', (event) => {
    console.log('[Shopify Wishlist] Wishlist Product List Loaded ✅', event.detail.wishlist);
    if ($('.wishlist')[0]) {
        var w__length = event.detail.wishlist.length;
        if (w__length == 0) {
            $('.cta-text-content').append('<div class="no-product"><p class="no-product-wishlist">No item found.</p><a class="continue-shopping btn-darrow" href="/collections/all">CONTINUE SHOPPING</a></div>');
        }
    }

    // Set active states for wishlist buttons
    setTimeout(populateWishlistButtons) // Wait a tick for DOM elements to load
});

document.addEventListener('shopify-wishlist:init-buttons', (event) => {
    if (event.detail) console.log('[Shopify Wishlist] Wishlist Buttons Loaded ✅', event.detail.wishlist);

    populateButtons();
});

const fetchProductCardHTML = (handle) => {
    const productTileTemplateUrl = `/products/${handle}?view=card`;
    return fetch(productTileTemplateUrl)
        .then((res) => res.text())
        .then((res) => {
            const text = res;
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, 'text/html');
            const productCard = htmlDocument.documentElement.querySelector(selectors.productCard);
            return productCard.outerHTML;
        })
        .catch((err) => console.error(`[Shopify Wishlist] Failed to load content for handle: ${handle}`, err));
};

const setupGrid = async (grid) => {
    const wishlist = getWishlist();
    const requests = wishlist.map(fetchProductCardHTML);
    const responses = await Promise.all(requests);
    const wishlistProductCards = responses.join('');
    grid.innerHTML = wishlistProductCards;
    grid.classList.add(GRID_LOADED_CLASS);
    //initButtons();

    const event = new CustomEvent('shopify-wishlist:init-product-grid', {
        detail: {wishlist: wishlist}
    });
    document.dispatchEvent(event);
};


/*const setupButtons = (buttons) => {
  buttons.forEach((button) => {
    const productHandle = button.dataset.productHandle || false;
    if (!productHandle) return console.error('[Shopify Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist.');
    if (wishlistContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS);
   
  console.log(wishlistContains(productHandle));

    button.addEventListener('click', () => {
      updateWishlist(productHandle);
      button.classList.toggle(BUTTON_ACTIVE_CLASS);
    });


  });
};*/


$(document).on('click', '.whishlist-btn', function (event) {
    var datahandle = $(this).attr('data-product-handle');

    console.log(this)
    updateWishlist(datahandle);
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
    } else {
        $(this).addClass('active');
    }
});

const initGrid = () => {
    const grid = document.querySelector(selectors.grid) || false;
    if (grid) setupGrid(grid);
};
/*
const initButtons = () => {
  const buttons = document.querySelectorAll(selectors.button) || [];
  if (buttons.length) setupButtons(buttons);
  else return;
  const event = new CustomEvent('shopify-wishlist:init-buttons', {
    detail: { wishlist: getWishlist() }
  });
  document.dispatchEvent(event);
};*/

const getWishlist = () => {
    const wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
    if (wishlist) return wishlist.split(LOCAL_STORAGE_DELIMITER);
    return [];
};

const setWishlist = (array) => {
    const wishlist = array.join(LOCAL_STORAGE_DELIMITER);
    if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);
    else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);

    const event = new CustomEvent('shopify-wishlist:updated', {
        detail: {wishlist: array}
    });
    document.dispatchEvent(event);

    return wishlist;
};

const updateWishlist = (handle) => {
    const wishlist = getWishlist();
    const indexInWishlist = wishlist.indexOf(handle);
    if (indexInWishlist === -1) wishlist.push(handle);
    else wishlist.splice(indexInWishlist, 1);
    return setWishlist(wishlist);
};

const wishlistContains = (handle) => {
    const wishlist = getWishlist();
    return wishlist.includes(handle);
};

const resetWishlist = () => {
    return setWishlist([]);
};

function populateWishlistButtons() {
    $(".whishlist-btn").each(function (index) {
        var datahandle = $(this).attr('data-product-handle');
        if (wishlistContains(datahandle)) {
            $(this).addClass('active');
        }
    });
}

const populateWishlistCount = () => {
    const el = document.querySelector(selectors.count) || false;

    if(!el) return

    el.innerText = getWishlist().length;
}

populateWishlistButtons()
populateWishlistCount()