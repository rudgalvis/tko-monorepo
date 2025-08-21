var mdm = new MobileDetect(window.navigator.userAgent);
var isMobile = mdm.mobile();
var isOS = mdm.os();

/*-------------------------------------------------*/
/*            DRAWER IMAGE MANUPLATION             */
/*-------------------------------------------------*/

rivets.formatters.addsize = function (value) {
  if (value != null && value != "") {
    var image = value;
    var small = image.split("?");
    var url = small[0].slice(0, -4);
    /* var imageType = small[0].slice(small[0]., -4);*/
    var new_url = url + "_200x200";
    var new_url_opt = new_url + ".jpg?" + small[1];
    return new_url_opt;
  }
};

/*-------------------------------------------------*/
/*            DRAWER IMAGE MANUPLATION             */
/*-------------------------------------------------*/

/*-------------------------------------------------*/
/*            DRAWER CLEAN HTML PRICE              */
/*-------------------------------------------------*/

rivets.formatters.removehtml = function (value) {
  var str = value;
  var strippedString = str.replace(/(<([^>]+)>)/gi, "");
  return strippedString;
};

/*-------------------------------------------------*/
/*            DRAWER CLEAN HTML PRICE              */
/*-------------------------------------------------*/

rivets.formatters.formatMoney = function (value) {
  var str = value;
  var firstChar = str.charAt(0);
  var lastChar = str.substr(str.length - 1);
  if (lastChar != "€") {
    var deleteFirst = str.substring(1);
    var decimalit = deleteFirst.split(".");
    var newCurrency = decimalit[0] + " " + firstChar;
    return newCurrency;
  } else {
    return value;
  }
};

/*-------------------------------------------------*/
/*            DRAWER CLEAN PRODUCT NAME             */
/*-------------------------------------------------*/

rivets.formatters.formatName = function (value) {
  var str = value;
  var splitSpecialChar = str.split(":");
  var generatedName = splitSpecialChar[0];
  return generatedName;
};

var getItemCountforVariant = 8;
var productID;
var real_price_sizes;
var show_price_sizes;
var varientID;
var varientID_sale;
var varient_soldout;

$(document).on("touchstart click", ".xfg", function (event) {
  $(this).parent().parent().find(".buy-button").html("ADD TO CART");

  varient_soldout = $(this).attr("data-productavailable");

  if ($(this).hasClass("xfg__soldout")) {
  } else {
    if ($(this).hasClass("xfg__preorder")) {
      $(this).parent().parent().find(".buy-button").html("PRE-ORDER");
    }

    if (varient_soldout == 0) {
      $(this)
        .parent()
        .parent()
        .parent()
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages")
        .addClass("hide_badges");
      $(this)
        .parent()
        .parent()
        .parent()
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages-soldout")
        .removeClass("hide_badges");
    } else {
      $(this)
        .parent()
        .parent()
        .parent()
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages-soldout")
        .addClass("hide_badges");
    }

    $(this)
      .parent()
      .parent()
      .find(".select-size")
      .find("span")
      .css("transform", "rotate(180deg)");
    $(this).parent().find("li").css("display", "none");
    $(this)
      .parent()
      .attr("style", "bottom:" + getItemCountforVariant + "px");
    $(this)
      .parent()
      .parent()
      .find(".select-size")
      .parent()
      .removeClass("activeBuy");
    $(this).parent().parent().find(".select-size").attr("data-open", "0");
    $(this).parent().parent().find(".select-size").css("display", "none");
    $(this).parent().parent().find(".buy-button").addClass("buy-button-active");
    productID = $(this).attr("data-productid");

    var pricelength = $(this)
      .parent()
      .parent()
      .parent()
      .find(".buy-container")
      .find(".productVarient")
      .find(".price-holder")
      .find(".productPrice")
      .find(".money").length;
    for (var i = 0; i < pricelength; i++) {
      varientID = $(this)
        .parent()
        .parent()
        .parent()
        .find(".buy-container")
        .find(".productVarient")
        .find(".price-holder")
        .find(".productPrice")
        .find(".money")
        .eq(i)
        .attr("data-varid");
      if (productID == varientID) {
        $(this)
          .parent()
          .parent()
          .parent()
          .find(".buy-container")
          .find(".productVarient")
          .find(".price-holder")
          .find(".productPrice")
          .find(".money")
          .hide();
        $(this)
          .parent()
          .parent()
          .parent()
          .find(".buy-container")
          .find(".productVarient")
          .find(".price-holder")
          .find(".productPrice")
          .find(".money")
          .eq(i)
          .show();
      }
    }

    /* for (var j = 0; j < pricelength; j++) {
    varientID_sale = $(this).parent().parent().parent().find('.buy-container').find('.productVarient').find('.price-holder').find('.sale_price').eq(j).attr('data-varid');
    if(productID == varientID_sale){
      $(this).parent().parent().parent().find('.buy-container').find('.productVarient').find('.price-holder').find('.sale_price').hide();
      $(this).parent().parent().parent().find('.buy-container').find('.productVarient').find('.price-holder').find('.sale_price').eq(j).show();
    }
}*/

    for (var j = 0; j < pricelength; j++) {
      varientID_sale = $(this)
        .parent()
        .parent()
        .parent()
        .find(".buy-container")
        .find(".productVarient")
        .find(".price-holder")
        .find(".sale_price")
        .eq(j)
        .attr("data-varid");
      if (productID == varientID_sale) {
        $(this)
          .parent()
          .parent()
          .parent()
          .find(".buy-container")
          .find(".productVarient")
          .find(".price-holder")
          .find(".sale_price")
          .hide();
        var trimit = $(this)
          .parent()
          .parent()
          .parent()
          .find(".buy-container")
          .find(".productVarient")
          .find(".price-holder")
          .find(".sale_price")
          .eq(j)
          .html();
        var afterTrim = trimit.replace(/^\s+|\s+$/gm, "");
        if (afterTrim == "") {
        } else {
          $(this)
            .parent()
            .parent()
            .parent()
            .find(".buy-container")
            .find(".productVarient")
            .find(".price-holder")
            .find(".sale_price")
            .eq(j)
            .show();
        }
      }
    }

    $(this).parent().parent().find(".buy-button").attr("data-id", productID);
    real_price_sizes = $(this).find(".original_price").html();
    show_price_sizes = $(this).find(".show_price").html();

    if (real_price_sizes != "") {
      $(this)
        .parent()
        .parent()
        .parent()
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages")
        .removeClass("hide_badges");
      $(this)
        .parent()
        .parent()
        .parent()
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages")
        .show();
    } else {
      $(this)
        .parent()
        .parent()
        .parent()
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages")
        .addClass("hide_badges");
    }
  }
});

/* main slider */

/*-------------------------------------------------*/
/*                HOME PAGE SLIDER                 */
/*-------------------------------------------------*/

$(".tko-main-slider").flickity({
  // options
  cellAlign: "left",
  contain: false,
  ImagesLoaded: true,
  resize: true,
  prevNextButtons: false,
  pageDots: true,
  setGallerySize: true,
  lazyLoad: 2,
});

if ($(".ght")[0]) {
  window.addEventListener("load", (event) => {
    var image = document.querySelector(".ght");
    var isLoaded = image.complete && image.naturalHeight !== 0;
    $(".tko-main-slider").flickity("resize");
  });
}

/*-------------------------------------------------*/
/*                HOME PAGE SLIDER                 */
/*-------------------------------------------------*/

/*-------------------------------------------------*/
/*                ALL SLIDERS                      */
/*-------------------------------------------------*/

$(".trust-copy").flickity({
  // options
  cellAlign: "left",
  contain: false,
  ImagesLoaded: true,
  resize: true,
  prevNextButtons: false,
  pageDots: false,
  autoPlay: 10000,
});

var $carousel2 = $(".meet-the-knitters-carousel").flickity({
  // options
  cellAlign: "left",
  contain: false,
  ImagesLoaded: true,
  resize: true,
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  /* autoPlay: 10000*/
});

/*$('.mtkc-thumb-container').flickity({
          asNavFor: '.meet-the-knitters-carousel',
          contain: true,
          pageDots: false,
           prevNextButtons: false,
          draggable: false
        });*/

$(".mtkc-thumb-container").on("click", ".mtkc-line", function () {
  var selector = $(this).attr("data-selector");
  $carousel2.flickity("selectCell", selector);
  $(".selected-line").css("display", "none");
  $(this).find(".selected-line").css("display", "block");
});

$carousel2.on("select.flickity", function (event, index) {
  $(".selected-line").css("display", "none");
  $(".mtkc-line").eq(index).find(".selected-line").css("display", "block");
});

var $carousel = $(".sliderholder").flickity({
  // options
  cellAlign: "left",
  contain: false,
  ImagesLoaded: true,
  resize: true,
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  /*autoPlay: 10000*/
});

$(".eoy-thumb-container").on("click", ".eoy-line", function () {
  var selector = $(this).attr("data-selector");
  $carousel.flickity("selectCell", selector);
  $(".eoy-selected-line").css("display", "none");
  $(this).find(".eoy-selected-line").css("display", "block");
});

$carousel.on("select.flickity", function (event, index) {
  $(".eoy-selected-line").css("display", "none");
  $(".eoy-line").eq(index).find(".eoy-selected-line").css("display", "block");
});

/* $('.eoy-thumb-container').flickity({
          asNavFor: '.sliderholder',
          contain: true,
          pageDots: false,
           prevNextButtons: false,
          draggable: false
        });*/

$(".banners-container").on("ready.flickity", function () {});

$(".banners-container").flickity({
  // options
  cellAlign: "left",
  contain: false,
  ImagesLoaded: false,
  resize: true,
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
});

$(".mobile-slider").flickity({
  // options
  cellAlign: "left",
  contain: false,
  ImagesLoaded: true,
  resize: true,
  setGallerySize: true,
  prevNextButtons: false,
});

var tapArea, startX;
tapArea = document.querySelectorAll("div.stable");
startX = 0;
for (var item of tapArea) {
  item.ontouchstart = function (e) {
    startX = e.touches[0].clientX;
  };
  item.ontouchmove = function (e) {
    if (Math.abs(e.touches[0].clientX - startX) > 5 && e.cancelable) {
      e.preventDefault();
    }
  };
}

/* fix iOS touchmove issue */

$(document).ready(function () {
  function onLoadeddata(event) {
    var cell = $(".mobile-slider").flickity("getParentCell", event.target);
    $(".mobile-slider").flickity("cellSizeChange", cell && cell.element);
    $(".mobile-slider").flickity("resize");
  }

  $(".mobile-slider")
    .find("video")
    .each(function (i, video) {
      video.play();
      $(video).on("loadeddata", onLoadeddata);
    });
});

Flickity.prototype.dragMove = function (event, pointer, moveVector) {
  if (!this.isDraggable) {
    return;
  }
  event.preventDefault();

  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if (this.options.wrapAround) {
    // wrap around move. #589
    moveVector.x = moveVector.x % this.slideableWidth;
  }
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if (!this.options.wrapAround && this.slides.length) {
    // slow drag
    var originBound = Math.max(-this.slides[0].target, this.dragStartPosition);
    dragX = dragX > originBound ? (dragX + originBound) * 0.5 : dragX;
    var endBound = Math.min(
      -this.getLastSlide().target,
      this.dragStartPosition,
    );
    dragX = dragX < endBound ? (dragX + endBound) * 0.5 : dragX;
  }

  if (this.dragX !== dragX) {
    this.previousDragX = this.dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent("dragMove", event, [pointer, moveVector]);
};

/*-------------------------------------------------*/
/*                ALL SLIDERS                      */
/*-------------------------------------------------*/

/* main slider end */

/* megamenu */

$(".subi").hover(
  function () {
    if ($(this).find(".mega-menu").length != 0) {
      $(this).find(".mega-menu").addClass("active");
    }
  },
  function () {
    $(this).find(".mega-menu").removeClass("active");
  },
);

/* megamenu end */

/*header fixed scroll animation*/

/*nav bar animation*/
var isTimerVisible = $("#masterheader").data("timer-visible");

var announcement = anime({
  targets: ".tko-announcement-bar",
  easing: "easeOutSine",
  height: "0px",
  minHeight: "0px",
  duration: 100,
  autoplay: false,
});

var headerDesktop = anime({
  targets: ".main-header",
  easing: "easeOutSine",
  top: isTimerVisible ? ["53px", "0px"] : "0px",
  duration: 100,
  autoplay: false,
});

var headerMobile = anime({
  targets: ".header-mobile",
  easing: "easeOutSine",
  top: isTimerVisible ? ["53px", "0px"] : "0px",
  duration: 100,
  autoplay: false,
});

/*let mobileSizeColtroller = new ScrollMagic.Controller();
let mobileSize_scene = new ScrollMagic.Scene({
  triggerElement:'.sw-ghost',
  duration: 1000
}).addTo(mobileSizeColtroller);


mobileSize_scene.on('leave', function(event) {
   
  $('.size___wrapper').addClass('size__wrapper_fixedit');

});

mobileSize_scene.on('enter', function(event) {
   
  $('.size___wrapper').removeClass('size__wrapper_fixedit');

});*/

let fifth_controller = new ScrollMagic.Controller();

let fifth_scene = new ScrollMagic.Scene({
  triggerElement: ".mobile-product-slider",
  duration: 1000,
}).addTo(fifth_controller);

fifth_scene.on("leave", function (event) {
  /*  $('#pre-order-mobile-holder').addClass('fixed');*/
});

fifth_scene.on("enter", function (event) {
  /* $('#pre-order-mobile-holder').removeClass('fixed');*/
});

var scrollPoisiton;
var scrollManuplation = 0;

function pageNavSub() {
  /*anime({
    targets:'.thisFixed',
    duration: 200,
    top: ['0px','51px'],
    opacity: [0,1],
    easing: 'easeOutSine',

 });*/
}

$(document).ready(function () {
  if (isMobile != null) {
    $(".mainholder").addClass("nohover");
    $(".slider-mobile-gutter").remove();
  }

  if (isMobile != null) {
    var slideControlf = 0;

    var total_ = 30;
    var screen_height = $(window).innerHeight();

    // $(".size___wrapper").style.bottom = '-20px'

    function sizeFixedPosition() {
      anime({
        targets: ".size___wrapper",
        duration: 300,
        bottom: ["-200px", "-20px"],
        easing: "easeOutSine",
        complete: function (anim) {
          anime({
            targets: "#pre-order-mobile-holder",
            duration: 300,
            bottom: ["0px", "73px"],
            easing: "easeOutSine",
          });
        },
      });
    }

    $(window).scroll(function (event) {
      var scrollPositionforSize = $(window).scrollTop();
      if (scrollPositionforSize >= total_) {
        if (slideControlf == 0 && screen_height <= 692) {
          //sizeFixedPosition();
          sizeFixedPositionNotifyme();
          slideControlf = 1;
        }
      }
    });
  }

  $(".pn-line-container").hide();
  if ($(".page-navigation")[0]) {
    var offsetValue;
    var heightofSticky;
    heightofSticky = $(".page-navigation").height();
    offsetValue = $(".page-navigation").offset();

    $(window).scroll(function (event) {
      scrollPoisiton = $(window).scrollTop();
      if (
        scrollPoisiton > offsetValue.top - heightofSticky &&
        scrollManuplation == 0
      ) {
        $(".page-navigation").addClass("thisFixed");
        $(".gost-container").slideDown();
        $(".pn-line-container").show();
        pageNavSub();
        scrollManuplation = 1;
      }
      if (
        scrollPoisiton < offsetValue.top - heightofSticky &&
        scrollManuplation == 1
      ) {
        $(".gost-container").slideUp();
        $(".page-navigation").removeClass("thisFixed");
        $(".page-navigation").attr("style", "");
        $(".pn-line-container").hide();
        $(".line-second").show();
        scrollManuplation = 0;
      }
    });
  }
});

let tko_navigation_controller = new ScrollMagic.Controller();

let tko_navigation_scene = new ScrollMagic.Scene({
  duration: 100,
  offset: 20,
}).addTo(tko_navigation_controller);

let tko_header_scene = new ScrollMagic.Scene({
  duration: 100,
  offset: 20,
}).addTo(tko_navigation_controller);

let tko_header_scene_mobile = new ScrollMagic.Scene({
  duration: 100,
  offset: 20,
}).addTo(tko_navigation_controller);

// tko_navigation_scene.on("progress", function (event) {
//   announcement.seek(tko_navigation_scene.duration() * event.progress);
// });
//
// tko_header_scene.on("progress", function (event) {
//   headerDesktop.seek(tko_header_scene.duration() * event.progress);
// });
//
// tko_header_scene_mobile.on("progress", function (event) {
//   headerMobile.seek(tko_header_scene_mobile.duration() * event.progress);
// });

/*nav bar animation*/

/*header fixed scroll animatiom*/

/* variant selection change img etc. */

var isOPen;
var productPrice;
var discountPrice;
var variantHolder;
var urlHolder;
var actualVariantURL;
var urlHider;
var discount_price_changer;
var show_price_changer;
var getCurrentID;

$(document).on("touchstart touchend click", ".productColor", function () {
  $(".variant-holder").css("bottom", "-60px");

  const variant_id = this.getAttribute("data-vid");
  const iso_code = document.body.getAttribute("data-iso-code");
  const price = this.getAttribute("data-vprice");
  const compared_at = this.getAttribute("data-rprice");
  const variant = this.closest(".productVarient");
  const productPrice = variant.querySelector("product-price");

  if (productPrice) {
    productPrice.setAttribute("price", price);
    productPrice.setAttribute("compared_at", compared_at);
    productPrice.setAttribute("iso_code", iso_code);
    productPrice.setAttribute("variant_id", variant_id);
  }

  variantHolder = $(this).attr("data-urlcolor");
  urlHolder = $(this).attr("data-url");

  $(".buy-button").removeClass("buy-button-active");
  $(".select-size").attr("style", "bottom:-60px;");
  $(".xfg").css("display", "none");
  if ($(this).hasClass("selectdisable")) {
  } else {
    if ($(this).hasClass("continue_change")) {
    } else {
      actualVariantURL = urlHolder;
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".mainholder")
        .find("a")
        .attr("href", actualVariantURL);
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".productname")
        .find("h2")
        .find("a")
        .attr("href", actualVariantURL);
    }

    var pushId = $(this).attr("data-vid");
    var longpath = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .parent();

    var moneylength = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".price-holder")
      .find(".productPrice")
      .find(".money").length;
    var moneylengthspan = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".price-holder")
      .find(".sale_price").length;

    // for (var i = 0; i < moneylength; i++) {
    //   getCurrentID = $(this)
    //     .parent()
    //     .parent()
    //     .parent()
    //     .parent()
    //     .find(".price-holder")
    //     .find(".productPrice")
    //     .find(".money")
    //     .eq(i)
    //     .attr("data-varid");
    //   if (getCurrentID == pushId) {
    //     $(this)
    //       .parent()
    //       .parent()
    //       .parent()
    //       .parent()
    //       .find(".price-holder")
    //       .find(".productPrice")
    //       .find(".money")
    //       .hide();
    //
    //     $(this)
    //       .parent()
    //       .parent()
    //       .parent()
    //       .parent()
    //       .find(".price-holder")
    //       .find(".productPrice")
    //       .find(".money")
    //       .eq(i)
    //       .show();
    //   }
    // }
    //
    // for (var j = 0; j < moneylength; j++) {
    //   getCurrentIDsale = $(this)
    //     .parent()
    //     .parent()
    //     .parent()
    //     .parent()
    //     .find(".price-holder")
    //     .find(".sale_price")
    //     .eq(j)
    //     .attr("data-varid");
    //   if (getCurrentIDsale == pushId) {
    //     $(this)
    //       .parent()
    //       .parent()
    //       .parent()
    //       .parent()
    //       .find(".price-holder")
    //       .find(".sale_price")
    //       .hide();
    //     var trimit = $(this)
    //       .parent()
    //       .parent()
    //       .parent()
    //       .parent()
    //       .find(".price-holder")
    //       .find(".sale_price")
    //       .eq(j)
    //       .html();
    //     var afterTrim = trimit.replace(/^\s+|\s+$/gm, "");
    //     if (afterTrim == "") {
    //     } else {
    //       $(this)
    //         .parent()
    //         .parent()
    //         .parent()
    //         .parent()
    //         .find(".price-holder")
    //         .find(".sale_price")
    //         .eq(j)
    //         .show();
    //     }
    //   }
    // }

    discountPrice = $(this).attr("data-rprice");

    longpath.find(".productimage").find("img").removeClass("active");

    if (discountPrice != "nodiscount") {
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".mainholder")
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages")
        .css("display", "block");
    } else {
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".mainholder")
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages")
        .hide();
    }

    if ($(this).hasClass("soldout_color")) {
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".mainholder")
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages-soldout")
        .css("display", "block");
    } else {
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".mainholder")
        .find("a")
        .find(".main-image-container")
        .find(".kto-bages-soldout")
        .css("display", "none");
    }

    var sizeDetect = $(this).parent().parent().parent().find("li").length;
    var getMainVariant = $(this).parent().parent().attr("data-variant");
    var mainRoute = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".mainholder")
      .find(".variant-holder");
    var pushRoute = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".mainholder")
      .find(".buy-button");
    var selectSizeRoute = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".mainholder")
      .find(".select-size");
    mainRoute.attr("data-selectedv", getMainVariant);
    mainRoute.find("li").css("display", "none");
    pushRoute.attr("data-id", pushId);
    selectSizeRoute.find("span").css("transform", "rotate(180deg)");
    selectSizeRoute.parent().removeClass("activeBuy");
    selectSizeRoute.attr("data-open", "0");

    if (sizeDetect > 1) {
      for (var i = 0; i < sizeDetect; i++) {
        $(this)
          .parent()
          .parent()
          .parent()
          .find("li")
          .eq(i)
          .find(".color-schema")
          .removeClass("selected");
      }
      $(this).parent().parent().find(".color-schema").addClass("selected");
      var firstImage = $(this).attr("data-vImg");
      var secondImage = $(this).attr("data-sImg");
      var firstImage_mobile = $(this).attr("data-vImg-mobile");
      var secondImage_mobile = $(this).attr("data-sImg-mobile");

      if (isMobile != "" || isMobile != null) {
        longpath
          .find(".productimage")
          .find("img")
          .eq(0)
          .attr("src", secondImage);
        longpath
          .find(".productimage")
          .find("img")
          .eq(1)
          .attr("src", firstImage);
      } else {
        longpath
          .find(".productimage")
          .find("img")
          .eq(0)
          .attr("src", secondImage_mobile);
        longpath
          .find(".productimage")
          .find("img")
          .eq(1)
          .attr("src", firstImage_mobile);
      }
    } else {
    }
  }
});

$(document)
  .on("mouseenter", ".mainholder", function (event) {
    if ($(this).hasClass("nohover")) {
    } else if ($(this).hasClass("only-color-product")) {
      $(this).find(".buy-button").addClass("buy-button-active");
      $(this).find(".select-size").css("bottom", "0px");
      $(this)
        .find("a")
        .find(".main-image-container")
        .find(".productimage")
        .find("img")
        .removeClass("fr");
      $(this)
        .find("a")
        .find(".main-image-container")
        .find(".productimage")
        .find("img")
        .eq(0)
        .fadeOut("fast");
    } else {
      $(this).find(".select-size").css("bottom", "0px");
      $(this)
        .find("a")
        .find(".main-image-container")
        .find(".productimage")
        .find("img")
        .removeClass("fr");
      $(this)
        .find("a")
        .find(".main-image-container")
        .find(".productimage")
        .find("img")
        .eq(0)
        .fadeOut("fast");
    }
  })
  .on("mouseleave", ".mainholder", function () {
    if ($(this).hasClass("nohover")) {
    }

    if ($(this).hasClass("only-color-product")) {
      $(this).find(".buy-button").removeClass("buy-button-active");
      $(this)
        .find("a")
        .find(".main-image-container")
        .find(".productimage")
        .find("img")
        .eq(0)
        .fadeIn("fast");
    } else {
      if ($(this).hasClass("activeBuy")) {
        $(this)
          .find("a")
          .find(".main-image-container")
          .find(".productimage")
          .find("img")
          .eq(0)
          .fadeIn("fast");
      } else {
        $(this).find(".select-size").css("bottom", "-60px");
        $(this)
          .find("a")
          .find(".main-image-container")
          .find(".productimage")
          .find("img")
          .eq(0)
          .fadeIn("fast");
      }
    }
  });

$(".mainholder").bind("touchstart", function (event) {
  event.stopPropagation();
});

$(".mainholder").bind("touchend", function (event) {
  event.stopPropagation();
});

$(document).on("touchstart click", ".select-size", function (event) {
  isOPen = $(this).attr("data-open");
  var holderShortCut = $(this).parent().find(".variant-holder");
  var getHeight = $(this).parent().find(".variant-holder").height();
  var getItemCount = $(this).parent().find(".variant-holder").find("li").length;
  var currentVariant = $(this)
    .parent()
    .find(".variant-holder")
    .attr("data-selectedv");
  /*reset*/
  $(".select-size").find("span").css("transform", "rotate(180deg)");
  $(".select-size").find("span").css("top", "-1px");
  $(".select-size")
    .parent()
    .find(".variant-holder")
    .find("li")
    .css("display", "none");
  $(".select-size")
    .parent()
    .find(".variant-holder")
    .attr("style", "bottom:" + -100 + "px");
  $(".select-size").css("bottom", "-60px");
  $(this).css("bottom", "0px");
  $(".select-size").parent().removeClass("activeBuy");
  $(".select-size").attr("data-open", "0");
  /*reset*/

  if (isOPen == 0) {
    holderShortCut.find(".xfg").each(function (index) {
      var currentVariant2 = $(this).attr("data-productcolor");

      if (currentVariant != currentVariant2) {
        $(this).css("display", "none");
      } else {
        $(this).css("display", "flex");
      }
    });
    holderShortCut.attr("style", "bottom:52px;");
    $(this).parent().addClass("activeBuy");
    $(this).find("span").css("top", "2px");
    $(this).find("span").css("transform", "rotate(0deg)");
    $(this).attr("data-open", "1");
  } else {
    $(this).find("span").css("transform", "rotate(180deg)");
    $(this).find("span").css("top", "-1px");
    holderShortCut.find("li").css("display", "none");
    holderShortCut.attr("style", "bottom:" + -100 + "px");
    $(this).parent().removeClass("activeBuy");
    $(this).attr("data-open", "0");
  }
});

/* add to cart */

$(document).on("click", ".buy-button-active", function (event) {
  var getIDitem = $(this).attr("data-id");

  CartJS.addItem(
    getIDitem,
    1,
    {},
    {
      // Define a success callback to display a success message.
      success: function (data, textStatus, jqXHR) {
        $(".buy-button").removeClass("buy-button-active");
        $(".select-size").attr("data-open", "0");
        $(".select-size").attr("style", "");
        $(".variant-holder").find("li").css("display", "none");
        $(".variant-holder").css("bottom", "-60px");
        $(".main-holder").removeClass("activeBuy");
        isOPen = 0;

        document.dispatchEvent(new CustomEvent("cart:update"));
      },

      error: function (jqXHR, textStatus, errorThrown) {},
    },
  );
});

$(document).on("click", ".product-buy-button-active", function (event) {
  var getIDitem = $(this).attr("data-id");

  let getVariant = $(this).attr("data-variant");

  /*if($(this).hasClass('onesize_button_notifyme')){
        $('#notifyme').attr('data-id',getIDitem);
        $('.notify_me_form_container').slideDown();
        $('#size_up').html(getVariant);
      }*/

  if (
    getIDitem == "" ||
    (getIDitem == null &&
      $(this).parent().parent().find(".sizes").hasClass("one-size-sizes") !=
        true)
  ) {
    $("#warning").slideDown("fast", function () {
      $(this).css("display", "flex");
    });

    return false;
  }

  CartJS.addItem(
    getIDitem,
    1,
    {},
    {
      // Define a success callback to display a success message.
      success: function (data, textStatus, jqXHR) {
        $(".add-to-cart___text").hide();
        $(".buybutton-animation").show();

        document.dispatchEvent(new CustomEvent("cart:update"));

        anime({
          targets: ".drawer-container",
          right: "0px",
          easing: "easeOutSine",
          duration: 300,
        });
      },

      // Define an error callback to display an error message.
      error: function (jqXHR, textStatus, errorThrown) {},
    },
  );
});

$(document).on("click", ".product-buy-button-active-setsave", function (event) {
  var getIDitem = $(this).attr("data-id");

  if (getIDitem == "" || getIDitem == null) {
    $("#warning-setsave").slideDown("fast", function () {
      $(this).css("display", "flex");
    });

    return false;
  }

  CartJS.addItem(
    getIDitem,
    1,
    {},
    {
      // Define a success callback to display a success message.
      success: function (data, textStatus, jqXHR) {
        $(".add-to-cart___text").hide();
        $(".buybutton-animation").show();

        document.dispatchEvent(new CustomEvent("cart:update"));

        anime({
          targets: ".drawer-container",
          right: "0px",
          easing: "easeOutSine",
          duration: 300,
        });
      },

      // Define an error callback to display an error message.
      error: function (jqXHR, textStatus, errorThrown) {},
    },
  );
});

/* add to cart */

/*product image hover*/

$(document).on("click", "#mobile-burger", function () {
  anime({
    targets: "#mobilenavcontainer",
    left: "0",
    easing: "easeOutSine",
    duration: 300,
    complete: function () {
      $("#mobile-close").css("display", "block");
    },
  });
});

$(document).on("click", "#mobile-close", function () {
  anime({
    targets: "#mobilenavcontainer",
    left: "-100%",
    easing: "easeOutSine",
    duration: 300,
    begin: function () {
      $("#mobile-close").css("display", "none");
    },
  });
});

$(document).on("click", ".haschild", function () {
  if (
    $(this).parent().find(".parent_list_nav").hasClass("child-active") == true
  ) {
    $(this).parent().find(".parent_list_nav").removeClass("child-active");
    $(this).find(".child-plus-minus").css("transform", "rotate(0deg)");

    $(this).css("margin-top", "0px");
  } else {
    $(".parent_list_nav").removeClass("child-active");
    $(".child-plus-minus").css("transform", "rotate(0deg)");
    $(this).parent().find(".parent_list_nav").addClass("child-active");
    $(this).find(".child-plus-minus").css("transform", "rotate(45deg)");
    $(".haschild").css("margin-top", "0px");
    $(this).css("margin-top", "0px");
  }
});

$(document).on("click", ".hasgrandchild", function () {
  if (
    $(this)
      .parent()
      .find(".grand_child_list_nav")
      .hasClass("grandchild-active") == true
  ) {
    $(this)
      .parent()
      .find(".grand_child_list_nav")
      .removeClass("grandchild-active");
    $(this).find(".grandchild-plus-minus").css("transform", "rotate(0deg)");
  } else {
    $(".grandchild-plus-minus").css("transform", "rotate(0deg)");
    $(".grand_child_list_nav").removeClass("grandchild-active");
    $(this)
      .parent()
      .find(".grand_child_list_nav")
      .addClass("grandchild-active");
    $(this).find(".grandchild-plus-minus").css("transform", "rotate(45deg)");
  }
});

$(".s3c-item").mouseenter(function () {
  var dataAnim = $(this).attr("data-animation");
  anime({
    targets: "#animid-" + dataAnim + "",
    opacity: "0",
    easing: "easeOutSine",
    duration: 300,
  });
});

$(".s3c-item").mouseleave(function () {
  var dataAnim = $(this).attr("data-animation");
  anime({
    targets: "#animid-" + dataAnim + "",
    opacity: "1",
    easing: "easeOutSine",
    duration: 300,
  });
});

$("#anouncementClose").click(function () {
  anime({
    targets: ".tko-announcement-bar",
    scaleY: "0",
    easing: "easeOutSine",
    duration: 300,
    complete: function () {
      $(".tko-announcement-bar").remove();
      /*$('.main-header').css('top','0px');*/
      $(".main-header").addClass("no-announcement");
      $("body").addClass("top-fixed");
      $(".header-mobile").css("top", "0px");
      $(".header-mobile").addClass("no-announcement");
    },
  });
});

$(document).on("click", "#open-drawer", function () {
  anime({
    targets: ".drawer-container",
    right: "0px",
    easing: "easeOutSine",
    duration: 300,
  });
});

$(document).on("click", "#open-drawer-mobile", function () {
  anime({
    targets: ".drawer-container",
    right: "0px",
    easing: "easeOutSine",
    duration: 300,
  });

  if (isMobile != null) {
    $("body").css("overflow", "hidden");
    $("html").css("overflow", "hidden");
  }
});

$(document).on("click", "#close-drawer", function () {
  anime({
    targets: ".drawer-container",
    right: "-420px",
    easing: "easeOutSine",
    duration: 300,
  });

  $("body").css("overflow", "inherit");
  $("html").css("overflow", "inherit");
});

var currenvyController = 0;
$(document).on("click", "#subcurrencyitem_click", function () {
  if (currenvyController == 0) {
    $(".subcurrencyitem").addClass("subcurrencyitem__show");
    currenvyController = 1;
  } else {
    $(".subcurrencyitem").removeClass("subcurrencyitem__show");
    currenvyController = 0;
  }
});

var currencyHolder;
$(document).on("change", ".mobile-currency-selector", function () {
  currencyHolder = $(this).val();
  location.href = currencyHolder;
});

var fgk;
var productTitleend;
var completeItemArray = [];
var fgkstart;
var productTitlestart;
var cartItemArray = [];

/* cart ready event */

var detect = false;

$(document).on("cart.ready", function (event, cart) {
  var data = $("#data-holder").attr("data-colors");
  var json = "[" + data + "]";
  var text;
  var letter;
  var imgControl;

  var animControl = 0;
  completeItemArray = [];
  fgk = cart.items.length;

  for (let i = 0; i < fgk; i++) {
    if (cart.items[i].sku == cartItemArray[i]) {
      animControl++;
    }
  }

  var lengthofcart = cart.items.length;

  if (fgkstart < fgk && animControl == 0) {
    $(".drawer-product-container")
      .eq(0)
      .fadeOut(0, function () {
        $(".drawer-product-container").eq(0).delay(800).fadeIn();
      });
  }

  if (fgk > 0) {
    if (cart.items[0].handle == "for-the-dream-fund") {
      $(".tko-dream-fund-content").addClass("overflowit");
      anime({
        targets: ".tko-dream-fund-content",
        duration: 200,
        height: "0px",
        paddingTop: "0px",
        easing: "easeOutSine",
        complete: function () {
          anime({
            targets: ".tko-dream-fund-content",
            duration: 200,
            opacity: 0,
            easing: "easeOutSine",
          });
        },
      });
    }
    var detectCounter = 0;
    for (let i = 0; i < lengthofcart; i++) {
      var funddetect = cart.items[i].handle;
      if (funddetect == "for-the-dream-fund") {
        detectCounter++;
      }
    }

    if (detectCounter == 0) {
      anime({
        targets: ".tko-dream-fund-content",
        duration: 500,
        height: "149px",
        paddingTop: "25px",
        easing: "easeOutSine",
        complete: function () {
          anime({
            targets: ".tko-dream-fund-content",
            duration: 200,
            opacity: 1,
            easing: "easeOutSine",
            complete: function () {
              $(".tko-dream-fund-content").removeClass("overflowit");
            },
          });
        },
      });
    }
  } else {
    anime({
      targets: ".tko-dream-fund-content",
      duration: 500,
      height: "149px",
      paddingTop: "25px",
      easing: "easeOutSine",
      complete: function () {
        anime({
          targets: ".tko-dream-fund-content",
          duration: 200,
          opacity: 1,
          easing: "easeOutSine",
        });
        $(".tko-dream-fund-content").removeClass("overflowit");
      },
    });
  }

  $(".color-circle").each(function (index) {
    var getColor = $(this).attr("data-colorselect");
    var dataColorSelected;

    var obj = $.parseJSON(json);
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].name == getColor) {
        text = obj[i].color;
        letter = text.charAt(0);
        if (letter == "#") {
          imgControl = true;
        } else {
          imgControl = false;
        }
        dataColorSelected = obj[i].color;
      }
    }

    if (imgControl == true) {
      $(this).attr("style", "background-color:" + dataColorSelected + ";");
    }
    if (imgControl == false) {
      $(this).attr("style", "background-image:url(" + dataColorSelected + ");");
    }
  });
});

/* cart start event */

$(document).on("cart.requestStarted", function (event, cart) {
  fgkstart = cart.items.length;
  if (fgkstart > 0) {
    cartItemArray = [];
    for (let i = 0; i < fgkstart; i++) {
      cartItemArray.push(cart.items[i].sku);
    }
  }
});

$(document).on("cart.requestComplete", function (event, cart) {
  var data = $("#data-holder").attr("data-colors");
  var json = "[" + data + "]";
  var text;
  var letter;
  var imgControl;
  var animControl = 0;
  completeItemArray = [];
  fgk = cart.items.length;

  for (let i = 0; i < fgk; i++) {
    if (cart.items[i].sku == cartItemArray[i]) {
      animControl++;
    }
  }

  var lengthofcart = cart.items.length;

  /*if(fgkstart < fgk && animControl == 0){
    $('.drawer-product-container').eq(0).fadeOut(0,function(){
      $('.drawer-product-container').eq(0).delay( 800 ).fadeIn();
    });
  }*/

  if (fgk > 0) {
    if (cart.items[0].handle == "for-the-dream-fund") {
      $(".tko-dream-fund-content").addClass("overflowit");
      anime({
        targets: ".tko-dream-fund-content",
        duration: 200,
        height: "0px",
        paddingTop: "0px",
        easing: "easeOutSine",
        complete: function () {
          anime({
            targets: ".tko-dream-fund-content",
            duration: 200,
            opacity: 0,
            easing: "easeOutSine",
          });
        },
      });
    }
    var detectCounter = 0;
    for (let i = 0; i < lengthofcart; i++) {
      var funddetect = cart.items[i].handle;
      if (funddetect == "for-the-dream-fund") {
        detectCounter++;
      }
    }

    if (detectCounter == 0) {
      anime({
        targets: ".tko-dream-fund-content",
        duration: 500,
        height: "149px",
        paddingTop: "25px",
        easing: "easeOutSine",
        complete: function () {
          anime({
            targets: ".tko-dream-fund-content",
            duration: 200,
            opacity: 1,
            easing: "easeOutSine",
            complete: function () {
              $(".tko-dream-fund-content").removeClass("overflowit");
            },
          });
        },
      });
    }
  } else {
    anime({
      targets: ".tko-dream-fund-content",
      duration: 500,
      height: "149px",
      paddingTop: "25px",
      easing: "easeOutSine",
      complete: function () {
        anime({
          targets: ".tko-dream-fund-content",
          duration: 200,
          opacity: 1,
          easing: "easeOutSine",
        });
        $(".tko-dream-fund-content").removeClass("overflowit");
      },
    });
  }

  anime({
    targets: ".drawer-container",
    right: "0px",
    easing: "easeOutSine",
    duration: 300,
  });

  $(".add-to-cart___text").show();
  $(".buybutton-animation").hide();

  $(".color-circle").each(function (index) {
    var getColor = $(this).attr("data-colorselect");
    var dataColorSelected;

    var obj = $.parseJSON(json);
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].name == getColor) {
        text = obj[i].color;
        letter = text.charAt(0);
        if (letter == "#") {
          imgControl = true;
        } else {
          imgControl = false;
        }
        dataColorSelected = obj[i].color;
      }
    }

    if (imgControl == true) {
      $(this).attr("style", "background-color:" + dataColorSelected + ";");
    }
    if (imgControl == false) {
      $(this).attr("style", "background-image:url(" + dataColorSelected + ");");
    }
  });

  if (cart.item_count == 0) {
    $(".tko-dream-fund-content").show();
  }

  $(".color-circle").each(function (index) {
    var getColor = $(this).attr("data-colorselect");
    var dataColorSelected;

    var obj = $.parseJSON(json);
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].name == getColor) {
        text = obj[i].color;
        letter = text.charAt(0);
        if (letter == "#") {
          imgControl = true;
        } else {
          imgControl = false;
        }
        dataColorSelected = obj[i].color;
      }
    }

    if (imgControl == true) {
      $(this).attr("style", "background-color:" + dataColorSelected + ";");
    }
    if (imgControl == false) {
      $(this).attr("style", "background-image:url(" + dataColorSelected + ");");
    }
  });
});

var cureencyControl = 0;
$(".selected--currency").click(function (event) {
  event.preventDefault(); //or return false;
  if (cureencyControl == 0) {
    $(".currency-selector--item").show();
    $(".currency-selector").addClass("currency--shadow");
    $(this).addClass("btn-click");
    cureencyControl = 1;
  } else {
    $(".currency-selector--item").hide();
    $(".currency-selector").removeClass("currency--shadow");
    $(this).removeClass("btn-click");
    cureencyControl = 0;
  }
});

$("#product-select").change(function () {
  var productid = $(this).val();
  $("#donate").attr("data-productID", productid);
});

$("#donate").click(function () {
  var clickproductID = $(this).attr("data-productID");
  var clickproductQunatity = $(this).attr("data-quantity");
  CartJS.addItem(clickproductID, clickproductQunatity);

  document.dispatchEvent(new CustomEvent("cart:update"));
});

$(".product-select2").change(function () {
  var productid = $(this).val();
  $(this)
    .parent()
    .parent()
    .find(".donate-accordion")
    .find(".donate2")
    .attr("data-productID", productid);
});

$(".donate2").each(function (index) {
  $(this).click(function () {
    var clickproductID = $(this).attr("data-productID");
    var clickproductQuantity = $(this).attr("data-quantity");

    CartJS.addItem(
      clickproductID,
      clickproductQuantity,
      {},
      {
        success: function (data, textStatus, jqXHR) {
          $(".add-to-cart___text").hide();
          $(".buybutton-animation").show();

          document.dispatchEvent(new CustomEvent("cart:update"));

          anime({
            targets: ".drawer-container",
            right: "0px",
            easing: "easeOutSine",
            duration: 300,
          });
        },

        error: function (jqXHR, textStatus, errorThrown) {},
      },
    );
  });
});

$(".predictive").click(function (event) {
  event.preventDefault(); //or return false;
  $(this)
    .parent()
    .find(".predictive-search-desktop-component")
    .css("display", "block");
  $(this).addClass("pre-search");
  $("#Search").val("");
  $("#predictive-search").hide();
  $(".rsm-item").eq(1).css("display", "none");
  $(".rsm-item").eq(2).css("display", "none");
  $(".rsm-item").eq(0).css("width", "100%");
  $("#Search").focus();

  $(".predictive-search-desktop-component").css(
    "border-bottom",
    "1px solid black",
  );
  anime({
    targets: ".predictive",
    width: "257px",
    easing: "easeOutSine",
    duration: 300,
  });
});

$("#mobile-search--").click(function (event) {
  event.preventDefault(); //or return false;
  $(".mobile-predictive-search-container")
    .find("predictive-search")
    .css("display", "block");
  $("#search-mobile").focus();
  $("#search-mobile").val("");
  /*$("#search-mobile").focus(function() {
    var tempSouper = $(this);
    setTimeout(function(){
        tempSouper.select();
        tempSouper.css('color','black');
    },100);
});*/

  anime({
    targets: ".mobile-predictive-search",
    left: "0px",
    easing: "easeOutSine",
    duration: 300,
  });
});

$(".mob-search-close").click(function () {
  anime({
    targets: ".mobile-predictive-search",
    left: "100%",
    easing: "easeOutSine",
    duration: 300,
  });
});

$(document).mouseup(function (e) {
  var container = $(".predictive-search-desktop-component");
  var currency_component = $(".selected--currency");
  var infobox = $(".info-window");
  var sizeselector = $(".choose___button");
  var sizeselectorsetsave = $(".choose___button__setsave");

  var filter_color = $(".remove-text");

  var filter_color_ = $("#filter-form");

  var filter_sort_by = $(".sortby-header");

  // if the target of the click isn't the container nor a descendant of the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $(".predictive").removeClass("pre-search");
    $(".rsm-item").eq(1).css("display", "block");
    $(".rsm-item").eq(2).css("display", "block");
    $(".rsm-item").eq(0).css("width", "auto");
    $(".predictive-search-desktop-component").css("border-bottom", "none");
    $(".predictive-search-desktop-component").css("display", "none");
  }

  if (
    !currency_component.is(e.target) &&
    currency_component.has(e.target).length === 0
  ) {
    $(".currency-selector--item").hide();
    /*$(".info-window").hide();
      $(".model-info-button").show();*/
    $(".currency-selector").removeClass("currency--shadow");
    $(".selected--currency").removeClass("btn-click");
    cureencyControl = 0;
  }

  if (!infobox.is(e.target) && infobox.has(e.target).length === 0) {
    $(".info-window").hide();
    $(".model-info-button").show();
    $(".tko-product-dots").css("z-index", "4");
  }

  if (
    !filter_color_.is(e.target) &&
    filter_color_.has(e.target).length === 0 &&
    !filter_color.is(e.target) &&
    filter_color.has(e.target).length === 0
  ) {
    if (isMobile == null) {
      $(".remove-text").attr("open-data", "0");
      $("#filter-form").hide();
      $(".remove-text").find("span").removeClass("btn-click");
    }
  }

  if (
    !filter_sort_by.is(e.target) &&
    filter_sort_by.has(e.target).length === 0
  ) {
    filter_sort_by.attr("open-data", "0");
    filter_sort_by.removeClass("btn-click");
    $(".sortby-list-container").hide();
  }

  if (!sizeselector.is(e.target) && sizeselector.has(e.target).length === 0) {
    if (
      $(".sizes").hasClass("main--") ||
      $(".sizes").hasClass("one-size-sizes")
    ) {
    } else {
      if (isMobile == null) {
        $(".sizes").hide();
        $(".choose___button").removeClass("active");
      }
    }
  }
  if (
    !sizeselectorsetsave.is(e.target) &&
    sizeselectorsetsave.has(e.target).length === 0
  ) {
    if (
      $(".sizes-setsave").hasClass("one-size-choose-setsave") ||
      $(".sizes-setsave").hasClass("one-size-sizes-setsave")
    ) {
    } else {
      if (isMobile == null) {
        $(".sizes-setsave").hide();
        $(".choose___button__setsave").removeClass("active");
        $(".product__info-container").removeClass("info-container__mobile");
      }
    }
  }
});

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

var itemNumber;
$(".knitcare-list").click(function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    //$(this).find('.accordion-heading ').addClass('btn-monument');
    $(this).parent().removeClass("padding-ballance");
    itemNumber = $(this).attr("data-itemnumber");
    $(this)
      .parent()
      .find(".knitcare-item")
      .slideUp("fast", function () {
        $(this).css("display", "none");

        anime({
          targets: "#accor-" + itemNumber + "",
          opacity: [1, 0],
          easing: "easeOutSine",
          duration: 300,
          complete: function () {
            $(this).css("display", "none");
          },
        });
      });

    $(this).parent().find(".accordionbadge").show();
  } else {
    //$(".list-knitcare").removeClass('active');
    //$('.accordion-heading').addClass('btn-darrow');
    //$(this).find('.accordion-heading ').removeClass('btn-monument');
    $(this).addClass("active");
    $(this).parent().addClass("padding-ballance");
    //$('.knitcare-item').removeClass('fade');
    itemNumber = $(this).attr("data-itemnumber");
    $(this)
      .parent()
      .find(".knitcare-item")
      .slideDown("fast", function () {
        $(this).css("display", "flex");
        anime({
          targets: "#accor-" + itemNumber + "",
          opacity: [0, 1],
          easing: "easeOutSine",
          duration: 300,
          complete: function () {
            $(this).css("display", "flex");
          },
        });
      });
    //$('.accordionbadge').show();
    if (isMobile != null) {
      $(this).parent().find(".accordionbadge").show();
    } else {
      $(this).parent().find(".accordionbadge").hide();
    }

    /* $('.accordion-heading').addClass('btn-darrow');*/
  }
});

/*$(".list-dreams").eq(0).find('.dream-arrow').html("↑");
$("#dream-accor-1").css('opacity','1');
$("#dream-accor-1").css('display','flex');*/

var accornum;
$(".dreams-list-content").click(function () {
  //$('.dream-arrow').show();
  if ($(this).hasClass("active")) {
    $(this).parent().find(".dream-arrow").html("↓");
    $(this).parent().parent().removeClass("open-item");
    $(this).removeClass("active");
    accornum = $(this).attr("data-itemnumber");
    anime({
      targets: "#dream-accor-" + accornum + "",
      opacity: [1, 0],
      easing: "easeOutSine",
      duration: 100,
      complete: function () {
        // $(this).parent().parent().find('.dreams-item').css('display','none');
      },
    });

    $(this)
      .parent()
      .parent()
      .find(".dreams-item")
      .slideUp("fast", function () {
        //
      });
  } else {
    $(this).addClass("active");
    accornum = $(this).attr("data-itemnumber");
    $(this).parent().parent().addClass("open-item");
    $(this)
      .parent()
      .parent()
      .find(".dreams-item")
      .slideDown("fast", function () {
        $(this).css("display", "flex");

        anime({
          targets: "#dream-accor-" + accornum + "",
          opacity: [0, 1],
          easing: "easeOutSine",
          duration: 300,
          complete: function () {},
        });
      });
    $(this).parent().find(".dream-arrow").html("↑");
  }
});

/*accordion controller*/
var dataNode;
var dataItem;
$(".accordion-control").click(function (event) {
  event.preventDefault(); //or return false;
  $(".accordion-control").removeClass("active");
  $(this).addClass("active");
  dataNode = $(this).attr("data-navname");
  $(".knitcare-item").attr("style", "");
  $(".list-knitcare").removeClass("active");
  $(".knitcare-list").removeClass("active");
  $(".list-knitcare").removeClass("padding-ballance");
  $(".list-knitcare").hide();
  $(".type-" + dataNode).show();
  // $('.type-'+dataNode).eq(0).addClass('active');
  // $('.type-'+dataNode).eq(0).find('.knitcare-list').addClass('active');
  // $('.type-'+dataNode).eq(0).find('.knitcare-list').find('h3').removeClass('btn-monument');
  // $('.type-'+dataNode).eq(0).find('.knitcare-item').attr('style','display:flex; opacity:1;');
  // $('.type-'+dataNode).eq(0).addClass('padding-ballance');
});
/*accordion controller*/

/*search tab controller*/
var dataNodeSearch;
var dataItemSearch;
$(".searchtab-control").click(function (event) {
  if ($(this).hasClass("disable_a")) {
  } else {
    event.preventDefault(); //or return false;
    $(".searchtab-control").removeClass("active");
    $(this).addClass("active");
    dataNodeSearch = $(this).attr("data-tabname");
    $(".search-product").removeClass("active");
    $("." + dataNodeSearch).addClass("active");
  }
});
/*search tab controller*/

/*Contact Form Select Action*/
var getValueofselect;
$("#ContactReason-").change(function () {
  getValueofselect = $(this).val();
  if (getValueofselect == "customer-support") {
    $(".ordernumber").show();
  }
  if (getValueofselect == "") {
    $(this).css("color", "rgba(0,0,0,.5)");
  } else {
    $(this).css("color", "rgba(0,0,0,1)");
  }
});

/*Contact Form Select Action*/

/* Fullfilled Accordion */
//$("#fullfilleddream-1").css('opacity','1');

var fullfilledItem;
var confort;
$(".dreams-fullfilled-list li").click(function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    fullfilledItem = $(this).attr("data-fullfilleddream");

    confort = $(this);

    anime({
      targets: "#fullfilleddream-" + fullfilledItem + "",
      opacity: [1, 0],
      easing: "easeOutSine",
      duration: 300,
      complete: function () {
        // confort.find('.df-summary').find('.dffs-block').css('display','none');
        confort
          .find(".df-summary")
          .find(".dffs-block")
          .slideUp("fast", function () {
            $(this).removeClass("active");

            // $(this).css('display','none');
          });
      },
    });

    $(this).find(".fullfilled-dr").css("transform", "rotate(0deg)");
  } else {
    $(this).addClass("active");
    fullfilledItem = $(this).attr("data-fullfilleddream");
    $(this)
      .find(".df-summary")
      .find(".dffs-block")
      .slideDown("fast", function () {
        $(this).css("display", "flex");
        anime({
          targets: "#fullfilleddream-" + fullfilledItem + "",
          opacity: [0, 1],
          easing: "easeOutSine",
          duration: 300,
          complete: function () {
            //$(this).css('display','flex');
          },
        });
      });
    $(this).find(".fullfilled-dr").css("transform", "rotate(180deg)");
  }
  // $(this).find('.fullfilled-dr').css('transform','rotate(180deg)');
  //  $(this).find('.df-summary').find('.dffs-block').addClass('fade');
});

/* Fullfilled Accordion */

/*----------------------------------------------------------------*/
/* SMOOTH SCROLL FOR FAQ */
/*----------------------------------------------------------------*/

$('.faqd[href^="#"]').click(function () {
  var the_id = $(this).attr("href");
  var quickCalc = $(the_id).offset().top;
  var absoluteCalc = 180;
  var realCalc = quickCalc - absoluteCalc;
  var calc = realCalc;
  if (the_id === "#") {
    return;
  }

  $("html, body").animate({
    scrollTop: calc,
  });
  return false;
});

/*----------------------------------------------------------------*/
/* SMOOTH SCROLL FOR FAQ END*/
/*----------------------------------------------------------------*/

$('.faqd[accordionbadge^="#"]').click(function () {
  var the_id = $(this).attr("href");
  if (the_id === "#") {
    return;
  }
  $("html, body").animate(
    {
      scrollTop: $(the_id).offset().top - 230,
    },
    300,
  );
  return false;
});

/*----------------------------------------------------------------*/
/* FAQ ACCORDION */
/*----------------------------------------------------------------*/

var isItopen;

$(".faq-holder").each(function () {
  $(this)
    .find("h3")
    .find("a")
    .click(function (event) {
      event.preventDefault(); //or return false;
      isItopen = $(this).attr("data-open");
      if (isItopen == 0) {
        $(this).parent().parent().find(".faq-item-copy").addClass("active");
        $(this).parent().parent().find(".faq-item-copy").addClass("fades");
        $(this).parent().find(".faq-arrow").html("↑");
        $(this).addClass("rotate");
        $(this).attr("data-open", "1");
      } else {
        $(this).parent().parent().find(".faq-item-copy").removeClass("active");
        $(this).parent().parent().find(".faq-item-copy").removeClass("fades");
        $(this).parent().find(".faq-arrow").html("↓");
        $(this).removeClass("rotate");
        $(this).attr("data-open", "0");
      }
    });
});

$(".faq-arrow").each(function () {
  $(this).click(function (event) {
    event.preventDefault(); //or return false;
    isItopen = $(this).parent().find("a").attr("data-open");
    if (isItopen == 0) {
      $(this).parent().parent().find(".faq-item-copy").addClass("active");
      $(this).parent().parent().find(".faq-item-copy").addClass("fades");
      $(this)
        .find("img")
        .attr(
          "src",
          "https://cdn.shopify.com/s/files/1/0548/6644/4336/files/faq-up_arrow.svg?v=1650965565",
        );
      $(this).addClass("rotate");
      $(this).parent().find("a").attr("data-open", "1");
    } else {
      $(this).parent().parent().find(".faq-item-copy").removeClass("active");
      $(this).parent().parent().find(".faq-item-copy").removeClass("fades");
      $(this)
        .find("img")
        .attr(
          "src",
          "https://cdn.shopify.com/s/files/1/0548/6644/4336/files/faq_arrow.svg?v=1650964827",
        );
      $(this).removeClass("rotate");
      $(this).parent().find("a").attr("data-open", "0");
    }
  });
});

/*----------------------------------------------------------------*/
/* FAQ ACCORDION END*/
/*----------------------------------------------------------------*/

/*----------------------------------------------------------------*/
/* FILTERS */
/*----------------------------------------------------------------*/

$(".color-filter").each(function (index) {
  $(this).click(function () {
    if ($("input[type=checkbox]").prop(":checked")) {
      console.log("Check box in Checked" + $(this).val());
    } else {
      console.log("Check box is Unchecked" + $(this).val());
    }
  });
});

$(".size-filter").each(function (index) {
  $(this).click(function () {
    if ($("input[type=checkbox]").prop(":checked")) {
      console.log("Check box in Checked" + $(this).val());
    } else {
      console.log("Check box is Unchecked" + $(this).val());
    }
  });
});

/*----------------------------------------------------------------*/
/* FILTERS END */
/*----------------------------------------------------------------*/

$(document).on("click", ".video-wrapper", function (event) {
  event.preventDefault(); //or return false;
  if ($("#collection-video").get(0).paused) {
    $("#collection-video").trigger("play");
    $("#collection-video-icon").fadeOut(500);
  } else {
    $("#collection-video").trigger("pause");
    $("#collection-video-icon").fadeIn(500);
  }
});

$(document).on("click", ".play-icon", function (event) {
  event.preventDefault(); //or return false;
  if ($(this).parent().find("video").get(0).paused) {
    $(this).parent().find("video").trigger("play");
    $(this).parent().find(".play-icon").fadeOut(500);
  } else {
    $(this).parent().find("video").trigger("pause");
    $(this).parent().find(".play-icon").fadeIn(500);
  }
});

var drawerController = 0;

$(document).on("click", "#filter-draver-opener", function (event) {
  event.preventDefault(); //or return false;
  if (drawerController == 0) {
    $(".mobile-facets__wrapper").slideDown();
    $(".mobile-facets__wrapper").css("display", "flex");
    drawerController = 1;
  } else {
    $(".mobile-facets__wrapper").slideUp();
    drawerController = 0;
  }
});

var clearCount = 0;

var controlFecets;

$(document).on("change", ".mobile-facets__checkbox__control", function (event) {
  controlFecets = $("#clear-count").attr("data-item");

  if (controlFecets == 0) {
    clearCount = 0;
    $("#clear-count").attr("data-item", 1);
  }

  if ($(this).is(":checked")) {
    clearCount++;
    $("#clear-count").html(clearCount);
  } else {
    clearCount--;
    $("#clear-count").html(clearCount);
  }
});

var cmData;
var val1;
var val2;
$(document).on("click", ".model-info-button", function (event) {
  event.preventDefault(); //or return false;
  var firstopening = $(this).parent().find(".imageGender").length;

  if (firstopening > 0) {
    var genderF = $(this).parent().find(".imageGender").attr("data-imgender");
    if (genderF == "male") {
      $(this)
        .parent()
        .find(".infobox")
        .find(".info-window")
        .find(".bodypart_bust")
        .find(".header-info-item")
        .html("Chest: ");
    }
  }

  $(this)
    .parent()
    .find(".infobox")
    .find("ul")
    .find("li")
    .find(".info-value")
    .each(function () {
      cmData = $(this).attr("data-mager");
      val1 = cmData / 2.54;

      val2 = Math.round((val1 * 100) / 100);
      $(this).html(val2 + '"');
    });

  $(this).parent().find("ul").css("display", "flex");

  //$('.tko-product-dots').css('z-index','-1');
  //$(this).hide();
});

$(document).on("touchstart click", ".inches", function (event) {
  $(this)
    .parent()
    .parent()
    .find("li")
    .find(".info-value")
    .each(function () {
      cmData = $(this).attr("data-mager");
      val1 = cmData / 2.54;

      val2 = Math.round((val1 * 100) / 100);
      $(this).html(val2 + '"');
    });

  $(this).parent().find(".cm").prop("disabled", false);
  $(this).prop("disabled", true);

  $(this).parent().find(".cm").removeClass("active");
  $(this).addClass("active");

  $(this).parent().parent().find(".namecm").hide();
  $(this).parent().parent().find(".nameinch").show();
});

$(document).on("touchstart click", ".cm", function (event) {
  $(this)
    .parent()
    .parent()
    .find("li")
    .find(".info-value")
    .each(function () {
      cmData = $(this).attr("data-mager");
      $(this).html(cmData + " cm");
    });
  $(this).parent().find(".inches").prop("disabled", false);
  $(this).prop("disabled", true);
  $(this).parent().find(".inches").removeClass("active");
  $(this).addClass("active");

  $(this).parent().parent().find(".nameinch").hide();
  $(this).parent().parent().find(".namecm").show();
});

var getColorValue;
var datashow;
var variantFirstID;
var getOrder;
var productRprice;
var productCprice;
// Store the current controller

const priceUpdater = (variantId, price, comparedAt) => {
  const productPrice = document.querySelector("product-price");

  if (!productPrice) return;

  const isoCode = document.body.getAttribute("data-iso-code");

  productPrice.setAttribute("price", price);
  productPrice.setAttribute("compared_at", comparedAt);
  productPrice.setAttribute("iso_code", isoCode);
  productPrice.setAttribute("variant_id", variantId);
};

//var buttonName;

$(".color-changer").change(function () {
  /*$('.slider-mobile-gutter').scrollTop(0);*/
  $(".add-to-cart___text").html("ADD TO CART");
  $(".setsave-add-to-cart").html("Complete the look");
  $("#preorderholder").slideUp();
  $("#pre-order-mobile-holder").slideUp();
  $(".product-buy-button-active").prop("disabled", false);

  buttonName = $(".choose___button").html();

  // console.log($(this).attr('data-cprice'))
  // console.log($(this).attr('data-rprice'))

  if (isMobile == null) {
    $("html,body").animate({ scrollTop: 0 }, 300);
  }

  getColorValue = $(this).val();
  variantFirstID =
    $(this).attr("data-fistID") || $(this).attr("data-variant-id");
  getOrder = $(this).attr("data-order");

  productRprice = $(this).attr("data-rprice");
  productCprice = $(this).attr("data-cprice");

  priceUpdater(variantFirstID, productRprice, productCprice);

  /*variant-price*/
  // var pricelength = $(this)
  //   .parent()
  //   .parent()
  //   .parent()
  //   .parent()
  //   .parent()
  //   .parent()
  //   .parent()
  //   .find(".mobile___adjustment")
  //   .find(".price___adjustment")
  //   .find(".price-holder-product")
  //   .find(".productPrice-product")
  //   .find("span").length;

  // for (var i = 0; i < pricelength; i++) {
  //   var varientID = $(this)
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .find(".mobile___adjustment")
  //     .find(".price___adjustment")
  //     .find(".price-holder-product")
  //     .find(".productPrice-product")
  //     .find(".money")
  //     .eq(i)
  //     .attr("data-varid");
  //
  //   if (variantFirstID == varientID) {
  //     $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".mobile___adjustment")
  //       .find(".price___adjustment")
  //       .find(".price-holder-product")
  //       .find(".productPrice-product")
  //       .find(".money")
  //       .hide();
  //     $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".mobile___adjustment")
  //       .find(".price___adjustment")
  //       .find(".price-holder-product")
  //       .find(".productPrice-product")
  //       .find(".money")
  //       .eq(i)
  //       .show();
  //   }
  // }
  //
  // for (var j = 0; j < pricelength; j++) {
  //   var varientID_sale = $(this)
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .find(".mobile___adjustment")
  //     .find(".price___adjustment")
  //     .find(".price-holder-product")
  //     .find(".sale_price-product")
  //     .find("span")
  //     .eq(j)
  //     .attr("data-varid");
  //
  //   // console.log($(this)
  //   //     .parent()
  //   //     .parent()
  //   //     .parent()
  //   //     .parent()
  //   //     .parent()
  //   //     .parent()
  //   //     .parent()
  //   //     .find(".mobile___adjustment")
  //   //     .find(".price___adjustment")
  //   //     .find(".price-holder-product")
  //   //     .find(".sale_price-product")
  //   //     .find("span"))
  //
  //   if (variantFirstID == varientID_sale) {
  //     $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".mobile___adjustment")
  //       .find(".price___adjustment")
  //       .find(".price-holder-product")
  //       .find(".sale_price-product")
  //       .find("span")
  //       .hide();
  //     $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".mobile___adjustment")
  //       .find(".price___adjustment")
  //       .find(".price-holder-product")
  //       .find(".sale_price-product")
  //       .find("span")
  //       .eq(j)
  //       .show();
  //   }
  // }

  /*variant-price*/

  if (productCprice != "nodiscount") {
    //$('.productPrice-product').html(productRprice);
    //$('.sale_price-product').html(productCprice);
  } else {
    //$('.productPrice-product').html(productRprice);
    //$('.sale_price-product').html("");
  }

  if (
    $(".sizes").hasClass("one-size-sizes") ||
    $(".sizes").hasClass("main--")
  ) {
    $(".sizes").show();
  } else {
    $(".sizes").hide();
  }

  $(".choose___button").html("CHOOSE SIZE");
  $(".choose___button").removeClass("active");

  //$(".mobile-product-slider").removeClass('active');
  $("." + getOrder + "").addClass("active");

  $(".mobile-slider").flickity("resize");

  datashow = $(this).attr("data-colorShow");

  $(".empty-circle").removeClass("active");
  $(this).parent().find(".empty-circle").addClass("active");
  $(".size-holder").removeClass("active");
  //$('.pimage-wrapper').removeClass('active');
  if ($(this).hasClass("onlycolor") || $(this).hasClass("one-size-product")) {
    $(".product-buy-button-active").attr("data-id", variantFirstID);
  } else {
    $(".size-holder").find("li").find("a").removeClass("active");
    $(".product-buy-button-active").attr("data-id", "");
  }

  if ($(this).hasClass("no-stock")) {
    var preOrderContent = $(this).attr("data-preorder");

    if (isMobile == null) {
      $("#preorderholder").slideDown();
      $(".add-to-cart___text").html("PRE ORDER");
      $("#preorderholder").addClass("preorder__show_on_desktop");
      $("#preorderholder").html(preOrderContent);
    } else {
      $("#pre-order-mobile-holder").slideDown();
      $("#pre-order-mobile-holder").html(preOrderContent);
      $(".add-to-cart___text").html("PRE ORDER");
    }
  }

  if ($(this).hasClass("sold_out")) {
    $(".add-to-cart___text").html("SOLD OUT");
    $(".product-buy-button-active").prop("disabled", true);
  }

  $(".size-holder").each(function () {
    if ($(this).hasClass(getColorValue) == true) {
      $(this).addClass("active");

      /*Reset Active Size*/
      //$(this).find('li').find('a').removeClass('active');
      //$(this).find('li').eq(0).find('a').addClass('active');
      /*Reset Active Size*/
    }
  });

  /*Color Text Change*/
  if ($(this).hasClass("seasonal") == true) {
    $("#selectedColor").html("");
    $("#selectedColorSeasonal").html(datashow);
  } else {
    $("#selectedColor").html(datashow);
    $("#selectedColorSeasonal").html("");
  }

  /*Color Text Change*/

  $(".pimage-wrapper").each(function () {
    if ($(this).hasClass(getColorValue) == true) {
      $(this).addClass("active");
    }
  });

  if ($(this).hasClass("notify_me_btn")) {
    let getID = $(this).attr("data-fistid");
    let getVariant = $(this).attr("data-colorshow");
    $(".notify_me_form_container").slideDown();
    $(".product-buy-button-active").attr("data-id", "");
    $("#notifyme").attr("data-id", getID);
    $("#size_up").html(getVariant);
    $(".product-buy-button-active").prop("disabled", true);
    $(".product-buy-button-active")
      .find(".add-to-cart___text")
      .html("SOLD OUT");
  } else {
    $(".notify_me_form_container").slideUp();
  }
});

var imgPath;
var productRpriceSetsave;
var productCpriceSetsave;

$(".color-changer-setsave").change(function () {
  $(".product-buy-button-active-setsave")
    .find(".add-to-cart___text")
    .html("Complete the look");
  $(".product-buy-button-active-setsave").prop("disabled", false);

  getColorValue = $(this).val();
  variantFirstID = $(this).attr("data-fistid");
  imgPath = $(this).attr("data-image");

  buttonNameSetSave = $(".choose___button__setsave").html();

  productRpriceSetsave = $(this).attr("data-rprice");
  productCpriceSetsave = $(this).attr("data-cprice");

  /*variant-price*/
  var pricelength = $(".setsave-price").find(".money").length;

  for (var i = 0; i < pricelength; i++) {
    var varientID = $(".setsave-price")
      .find(".show-setsave")
      .eq(i)
      .attr("data-vrid");
    if (variantFirstID == varientID) {
      $(".setsave-price").find(".show-setsave").hide();
      $(".setsave-price").find(".show-setsave").eq(i).show();
    }
  }

  for (var j = 0; j < pricelength; j++) {
    var varientID = $(".setsave-price")
      .find(".sale-setsave")
      .eq(j)
      .attr("data-vrid");
    if (variantFirstID == varientID) {
      $(".setsave-price").find(".sale-setsave").hide();
      $(".setsave-price").find(".sale-setsave").eq(j).show();
    }
  }

  /*variant-price*/

  if (productCpriceSetsave != "nodiscount") {
    //$('#ss-c-price').html(productRpriceSetsave);
    //$('#ss-r-price').html(productCpriceSetsave);
  } else {
    // $('#ss-c-price').html(productRpriceSetsave);
    // $('#ss-r-price').html("");
  }

  if ($(".sizes-setsave").hasClass("one-size-sizes-setsave")) {
    $(".sizes-setsave").show();
  } else {
    $(".sizes-setsave").hide();
  }

  if ($(".choose___button__setsave").hasClass("type__button")) {
    $(".choose___button__setsave").html("CHOOSE TYPE");
  } else {
    $(".choose___button__setsave").html("CHOOSE SIZE");
  }

  $(".choose___button__setsave").removeClass("active");
  $("#imagepath").attr("src", imgPath);
  //$('.product-buy-button-active-setsave').attr('data-id',variantFirstID);
  datashow = $(this).attr("data-colorShow");
  $(".empty-circle-satsave").removeClass("active");
  $(this).parent().find(".empty-circle-satsave").addClass("active");
  $(".size-holder-setsave").removeClass("active");

  if ($(this).hasClass("onlycolorsetsave")) {
    $(".product-buy-button-active-setsave").attr("data-id", variantFirstID);
  } else {
    $(".size-holder-setsave").find("li").find("a").removeClass("active");
    $(".product-buy-button-active-setsave").attr("data-id", "");
  }

  $(".size-holder-setsave").each(function () {
    if ($(this).hasClass(getColorValue) == true) {
      $(this).addClass("active");
      /*Reset Active Size*/
      //$(this).find('li').find('a').removeClass('active');
      //$(this).find('li').eq(0).find('a').addClass('active');
      /*Reset Active Size*/
    }
  });
  /*Color Text Change*/
  if ($(this).hasClass("seasonal") == true) {
    $("#selectedColorsetsave").html("");
    $("#selectedColorsetsaveSeasonal").html(datashow);
  } else {
    $("#selectedColorsetsave").html(datashow);
    $("#selectedColorsetsaveSeasonal").html("");
  }
  /*Color Text Change*/

  if ($(this).hasClass("sold_out")) {
    $(".product-buy-button-active-setsave")
      .find(".add-to-cart___text")
      .html("SOLD OUT");
    $(".product-buy-button-active-setsave").prop("disabled", true);
  }
});

// Function to handle the display of notify_me_form_container
function toggleNotifyMeFormContainer(display) {
  const container = document.querySelector(".notify_me_form_container_march");
  if (!container) return;
  container.style.display = display ? "block" : "none";
}

//Event handler for the .size-selection elements
document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelectorAll(".size-selection").forEach(function (element) {
    element.addEventListener("click", function (event) {
      // Check if the clicked element has the 'notifyme_selection' class
      if (this.classList.contains("notifyme_selection")) {
        let getIDProduct = this.getAttribute("data-variant-id");
        let getVariant = this.getAttribute("data-b");
        document
          .getElementById("notifyme")
          .setAttribute("data-id", getIDProduct);
        document.getElementById("size_up").innerHTML = getVariant;

        // Use the new function to show the notify_me_form_container
        toggleNotifyMeFormContainer(true);

        // Additional code for setting 'SOLD OUT' text and disabling the button
        document
          .querySelectorAll(".add-to-cart___text")
          .forEach(function (element) {
            element.innerHTML = "SOLD OUT";
            element.parentElement.disabled = true;
          });
      } else {
        // If the selected size does not have 'notifyme_selection', hide the container
        toggleNotifyMeFormContainer(false);
      }
    });
  });
});

//START
var getRealPrice;
var getDiccountPrice;
var variantIDgetSize;
var sizeHolder;
var sizeHoldersetsave;
var preordercopy;

$(".size-selection").click(function (event) {
  event.preventDefault(); //or return false;
  $("html").css("overflow", "inherit");
  $("body").css("overflow", "inherit");
  $(".product__info-container").css("z-index", "4");
  $("#warning").slideUp("fast");
  $(".size-selection").removeClass("active");
  $(this).addClass("active");
  $("#email_error").hide();
  sizeHolder = $(this).html();
  if ($(this).hasClass("typeofvalue")) {
    $(".choose___button").html("VALUE: " + sizeHolder);
  } else {
    $(".choose___button").html("SIZE: " + sizeHolder);
  }

  $(".choose___button").removeClass("active");
  $(".sizes").removeClass("active");
  $(".product__info-container").removeClass("info-container__mobile");
  if (
    $(".sizes").hasClass("one-size-sizes") ||
    $(".sizes").hasClass("main--")
  ) {
    $(".sizes").show();
  } else {
    $(".sizes").hide();
  }

  if ($(this).hasClass("no_stock_preorder")) {
    /*desktop*/
    if (isMobile == null) {
      $(".add-to-cart___text").html("PRE ORDER");
      $("#preorderholder").html($(this).attr("data-preorder"));
      $("#preorderholder").slideDown();
      $(".add-to-cart___text").parent().removeAttr("disabled");
      $(".notify_me_form_container").slideUp();
    } else {
      /*mobile*/

      $("#pre-order-mobile-holder").html($(this).attr("data-preorder"));
      $("#pre-order-mobile-holder").slideDown();
      $(".add-to-cart___text").html("PRE ORDER");
      $(".add-to-cart___text").parent().removeAttr("disabled");
      $(".notify_me_form_container").slideUp();
    }
  } else {
    $(".add-to-cart___text").html("ADD TO CART");
    $(".setsave-add-to-cart").html("Complete the look");
    $("#preorderholder").slideUp();
    $("#pre-order-mobile-holder").slideUp();
    $(".add-to-cart___text").parent().removeAttr("disabled");
    $(".notify_me_form_container").slideUp();
  }

  variantIDgetSize = $(this).attr("data-variant-id");

  price = $(this).attr("data-varprice");
  compared_at = $(this).attr("data-vardiscount");

  priceUpdater(variantIDgetSize, price, compared_at);

  /*variant price*/
  // var pricelength = $(this)
  //   .parent()
  //   .parent()
  //   .parent()
  //   .parent()
  //   .parent()
  //   .find(".mobile___adjustment")
  //   .find(".price___adjustment")
  //   .find(".price-holder-product")
  //   .find(".productPrice-product")
  //   .find("span").length;
  //
  // for (var i = 0; i < pricelength; i++) {
  //   var varientID = $(this)
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .find(".mobile___adjustment")
  //     .find(".price___adjustment")
  //     .find(".price-holder-product")
  //     .find(".productPrice-product")
  //     .find("span")
  //     .eq(i)
  //     .attr("data-varid");
  //   if (variantIDgetSize == varientID) {
  //     $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".mobile___adjustment")
  //       .find(".price___adjustment")
  //       .find(".price-holder-product")
  //       .find(".productPrice-product")
  //       .find("span")
  //       .hide();
  //     $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".mobile___adjustment")
  //       .find(".price___adjustment")
  //       .find(".price-holder-product")
  //       .find(".productPrice-product")
  //       .find("span")
  //       .eq(i)
  //       .show();
  //   }
  // }
  //
  // for (var j = 0; j < pricelength; j++) {
  //   var varientID_sale = $(this)
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .find(".mobile___adjustment")
  //     .find(".price___adjustment")
  //     .find(".price-holder-product")
  //     .find(".sale_price-product")
  //     .find("span")
  //     .eq(j)
  //     .attr("data-varid");
  //   if (variantIDgetSize == varientID_sale) {
  //     $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".mobile___adjustment")
  //       .find(".price___adjustment")
  //       .find(".price-holder-product")
  //       .find(".sale_price-product")
  //       .find("span")
  //       .hide();
  //     $(this)
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .parent()
  //       .find(".mobile___adjustment")
  //       .find(".price___adjustment")
  //       .find(".price-holder-product")
  //       .find(".sale_price-product")
  //       .find("span")
  //       .eq(j)
  //       .show();
  //   }
  // }

  $(".productPrice-product").html(getRealPrice);
  $(".sale_price-product").html(getDiccountPrice);
  $(".product-buy-button-active").attr("data-id", variantIDgetSize);
});
//END
$(".size-selection-setsave").click(function (event) {
  event.preventDefault(); //or return false;
  $("#warning-setsave").slideUp("fast");
  $(".size-selection-setsave").removeClass("active");
  $("html").css("overflow", "inherit");
  $("body").css("overflow", "inherit");
  $(".product__info-container").css("z-index", "4");
  $(this).addClass("active");
  sizeHoldersetsave = $(this).html();
  $(".choose___button__setsave").html("SIZE: " + sizeHoldersetsave);
  $(".choose___button__setsave").removeClass("active");
  $(".sizes-setsave").removeClass("active");
  $(".product__info-container").removeClass("info-container__mobile");
  if ($(".sizes-setsave").hasClass("one-size-sizes-setsave")) {
    $(".sizes-setsave").show();
  } else {
    $(".sizes-setsave").hide();
  }

  getRealPrice = $(this).attr("data-varprice");
  getDiccountPrice = $(this).attr("data-vardiscount");

  variantIDgetSize = $(this).attr("data-variant-id");

  getRealPrice2 = $(this).find(".original_price").html();
  getDiccountPrice2 = $(this).find(".show_price").html();

  var pricelength = $(".setsave-price").find(".money").length;

  for (var i = 0; i < pricelength; i++) {
    var varientID = $(".setsave-price")
      .find(".show-setsave")
      .eq(i)
      .attr("data-vrid");
    if (variantIDgetSize == varientID) {
      $(".setsave-price").find(".show-setsave").hide();
      $(".setsave-price").find(".show-setsave").eq(i).show();
    }
  }

  for (var j = 0; j < pricelength; j++) {
    var varientID = $(".setsave-price")
      .find(".sale-setsave")
      .eq(j)
      .attr("data-vrid");
    if (variantIDgetSize == varientID) {
      $(".setsave-price").find(".sale-setsave").hide();
      $(".setsave-price").find(".sale-setsave").eq(j).show();
    }
  }

  $(".product-buy-button-active-setsave").attr("data-id", variantIDgetSize);
});

var openControl;
$(".desc-item").click(function () {
  openControl = $(this).attr("data-open");
  if (openControl == 0) {
    $(this).find("p").slideDown("fast");
    $(this)
      .find(".pdesc-arrow")
      .find("img")
      .attr(
        "src",
        "https://cdn.shopify.com/s/files/1/0548/6644/4336/files/pdp_arrows__up_2.png?v=1646145829",
      );
    $(this).find(".pdesc-arrow").addClass("active");
    $(this).attr("data-open", "1");
  } else {
    $(this).find("p").slideUp("fast");
    $(this)
      .find(".pdesc-arrow")
      .find("img")
      .attr(
        "src",
        "https://cdn.shopify.com/s/files/1/0548/6644/4336/files/pdp_arrows_2.png?v=1646145714",
      );
    $(this).find(".pdesc-arrow").removeClass("active");
    $(this).attr("data-open", "0");
  }
});

/*----------------------------------------------------------------*/
/* CM & INCH CONVERTER */
/*----------------------------------------------------------------*/
var dataLengthfirst;
var tdLengthfirst;
var getcharfirst;
var masterDetect = [];
var converNumFirst;
var norm;

function isNumeric(num) {
  return !isNaN(num);
}

$("#size-guide , #size-guide2").click(function () {
  dataLengthfirst = $(".sizeguidetable")
    .find(".table")
    .find("table")
    .find("tbody")
    .find("tr").length;

  /**/
  for (var kk = 0; kk < dataLengthfirst; kk++) {
    tdLengthfirst = $(".sizeguidetable")
      .find(".table")
      .find("table")
      .find("tbody")
      .find("tr")
      .eq(kk)
      .find("td")
      .eq(0).length;

    for (var mm = 0; mm < tdLengthfirst; mm++) {
      getcharfirst = $(".sizeguidetable")
        .find(".table")
        .find("table")
        .find("tbody")
        .find("tr")
        .eq(kk)
        .find("td")
        .eq(0)
        .html();

      converNumFirst = parseFloat(getcharfirst).toFixed(2);
      if (getcharfirst.charAt(0) == "#" && isNumeric(converNumFirst) == false) {
        $(".sizeguidetable")
          .find(".table")
          .find("table")
          .find("tbody")
          .find("tr")
          .eq(kk)
          .find("td")
          .eq(0)
          .html(getcharfirst.substring(1));
        masterDetect.push(kk);
      } else if (
        getcharfirst.charAt(0) != "#" &&
        isNumeric(converNumFirst) == false
      ) {
        masterDetect.push(0);
      }
    }
  }
});

var switcherControl = 0;
var switchWidth;
var circleWidth;
var widthResult;

$(".size-switcher").click(function () {
  switchWidth = $(this).find(".switcher").innerWidth();
  circleWidth = $(this).find(".switcher").find("#switcher-dot").width();
  widthResult = switchWidth - circleWidth - 2;

  var dataLength;
  var tdLength;

  var cmConvert;
  var cmHolder;
  var convertChar;
  var converNum;
  var getchar;

  var splitChar;
  var SplitCharHolder = [];

  var SplitCharHolderArray;
  var spl;
  var transporter;

  dataLength = $(".sizeguidetable")
    .find(".table")
    .find("table")
    .find("tbody")
    .find("tr").length;

  /*CM*/
  if (switcherControl == 0) {
    anime({
      targets: "#switcher-dot",
      left: widthResult + "px",
      easing: "easeOutSine",
      duration: 300,
    });

    /**/

    for (var i = 0; i < dataLength; i++) {
      tdLength = $(".sizeguidetable")
        .find(".table")
        .find("table")
        .find("tbody")
        .find("tr")
        .eq(i)
        .find("td").length;
      for (var j = 0; j < tdLength; j++) {
        getchar = $(".sizeguidetable")
          .find(".table")
          .find("table")
          .find("tbody")
          .find("tr")
          .eq(i)
          .find("td")
          .eq(j)
          .html();

        converNum = parseFloat(getchar).toFixed(2);

        if (getchar.charAt(0) == "#") {
          $(".sizeguidetable")
            .find(".table")
            .find("table")
            .find("tbody")
            .find("tr")
            .eq(i)
            .find("td")
            .eq(j)
            .html(getchar);
          transporter = i;
        } else {
          if (isNumeric(converNum) == false) {
            $(".sizeguidetable")
              .find(".table")
              .find("table")
              .find("tbody")
              .find("tr")
              .eq(i)
              .find("td")
              .eq(j)
              .html(getchar);
          } else {
            if (masterDetect[i] != i) {
              $(".sizeguidetable")
                .find(".table")
                .find("table")
                .find("tbody")
                .find("tr")
                .eq(i)
                .find("td")
                .eq(j)
                .attr("data-first", getchar);
              var convertChar = parseFloat(getchar).toFixed(2);
              cmConvert = convertChar * 2.54;
              cmHolder = Math.round(cmConvert);

              $(".sizeguidetable")
                .find(".table")
                .find("table")
                .find("tbody")
                .find("tr")
                .eq(i)
                .find("td")
                .eq(j)
                .html(cmHolder);
            }
          }
        }
      }
    }

    switcherControl = 1;

    /*CM*/

    /*INCH*/
  } else {
    anime({
      targets: "#switcher-dot",
      left: "2px",
      easing: "easeOutSine",
      duration: 300,
    });
    dataLength = $(".sizeguidetable")
      .find(".table")
      .find("table")
      .find("tbody")
      .find("tr").length;

    for (var i = 0; i < dataLength; i++) {
      tdLength = $(".sizeguidetable")
        .find(".table")
        .find("table")
        .find("tbody")
        .find("tr")
        .eq(i)
        .find("td").length;
      for (var j = 0; j < tdLength; j++) {
        getchar = $(".sizeguidetable")
          .find(".table")
          .find("table")
          .find("tbody")
          .find("tr")
          .eq(i)
          .find("td")
          .eq(j)
          .html();
        converNum = parseFloat(getchar).toFixed(2);

        if (getchar.charAt(0) == "#") {
          $(".sizeguidetable")
            .find(".table")
            .find("table")
            .find("tbody")
            .find("tr")
            .eq(i)
            .find("td")
            .eq(j)
            .html(getchar);
          transporter = i;
        } else {
          if (isNumeric(converNum) == false) {
            $(".sizeguidetable")
              .find(".table")
              .find("table")
              .find("tbody")
              .find("tr")
              .eq(i)
              .find("td")
              .eq(j)
              .html(getchar);
          } else {
            if (masterDetect[i] != i) {
              var firstData = $(".sizeguidetable")
                .find(".table")
                .find("table")
                .find("tbody")
                .find("tr")
                .eq(i)
                .find("td")
                .eq(j)
                .attr("data-first");
              $(".sizeguidetable")
                .find(".table")
                .find("table")
                .find("tbody")
                .find("tr")
                .eq(i)
                .find("td")
                .eq(j)
                .html(firstData);
            }
          }
        }
      }
    }
    switcherControl = 0;
  }

  /*INCH*/
});

/*----------------------------------------------------------------*/
/* CM & INCH CONVERTER */
/*----------------------------------------------------------------*/
$(document).on("touchstart click", ".co-wrapper", function (event) {
  $("#checkout-text").html("PLEASE WAIT...");
  $(this).find("button").css("background-color", "grey");

  setTimeout(() => {
    $("#checkout-text").html("CHECKOUT");
    $(this).find("button").css("background-color", "black");
  }, 5000);
});

$("#mobile-nav-search").on("click", function (event) {
  event.preventDefault(); //or return false;
  $(".mobile-predictive-search-container")
    .find("predictive-search")
    .css("display", "flex");
  $("#search-mobile").focus();
  $("#search-mobile").val("");
  anime({
    targets: ".mobile-predictive-search",
    left: "0px",
    easing: "easeOutSine",
    duration: 300,
  });

  anime({
    targets: "#mobilenavcontainer",
    left: "-100%",
    easing: "easeOutSine",
    duration: 300,
    begin: function () {
      $("#mobile-close").css("display", "none");
    },
  });
});

$("#mobile-nav-cart").on("click", function (event) {
  event.preventDefault(); //or return false;
  anime({
    targets: ".drawer-container",
    right: "0px",
    easing: "easeOutSine",
    duration: 300,
  });

  anime({
    targets: "#mobilenavcontainer",
    left: "-100%",
    easing: "easeOutSine",
    duration: 300,
    begin: function () {
      $("#mobile-close").css("display", "none");
    },
  });
});

$(".shopify-currency-form select").on("change", function () {
  $(this).parents("form").submit();
});

$(document).ready(function () {
  var json = {
    popularproduct: {
      product: [],
    },
  };

  var data_popular_search = $("#masterheader").attr("data-popular");
  var data_popular_parse = data_popular_search.split(",");

  for (let kkk = 0; kkk < data_popular_parse.length; kkk++) {
    var obj = {
      name: data_popular_parse[kkk],
    };
    json.popularproduct.product.push(obj);
  }

  function delay(fn, ms) {
    let timer = 0;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(fn.bind(this, ...args), ms || 0);
    };
  }

  let chars;
  let regXValue;
  $(document).on(
    "keyup touchend",
    "#Search",
    delay(function (event) {
      chars = $(this).val();
      if (chars === "") {
        return;
      }
      var regex = new RegExp(chars, "i");
      var output = "";
      $.each(json.popularproduct.product, function (key, value) {
        if (value.name.search(regex) != -1 || value.name.search(regex) != -1) {
          output +=
            '<li role="option" class="result-item"><a class="popular_item" href="https://www.theknottyones.com/search?q=' +
            value.name +
            '">';
          output += value.name;
          output += "</li></a>";

          $(".popular-heading").show();
        } else {
          $(".popular-heading").hide();
        }
      });
      $(".popular-result").html(output);
    }, 600),
  );

  $(document).on(
    "keyup touchend",
    "#search-mobile",
    delay(function (event) {
      chars = $(this).val();
      if (chars === "") {
        return;
      }
      var regex = new RegExp(chars, "i");
      var output = "";
      $.each(json.popularproduct.product, function (key, value) {
        if (value.name.search(regex) != -1 || value.name.search(regex) != -1) {
          output +=
            '<li role="option" class="result-item"><a class="popular_item" href="https://www.theknottyones.com/search?q=' +
            value.name +
            '">';
          output += value.name;
          output += "</li></a>";

          $(".popular-heading").show();
        } else {
          $(".popular-heading").hide();
        }
      });
      $(".popular-result").html(output);
    }, 600),
  );
});
/*

$('#getrecover').on('click', function(event){
  event.preventDefault();
  $('#recover-tko').css('display','block');
  $('#login-tko').css('display','none');
     
});*/

var products_on_page = $(".products-on-page");
var pageAttribute = 2;
var next_url = "/collections/all?page=" + pageAttribute + "";
var new_url;
var totalProduct = products_on_page.data("total-product");
var paginationSize = products_on_page.data("pagination");
var mathforPagination = Math.ceil(totalProduct / paginationSize);

$(".load-more").on("click", function (event) {
  if (mathforPagination == pageAttribute) {
    $(this).hide();
  }

  $.ajax({
    url: next_url,
    type: "GET",
    dataType: "html",
  }).done(function (next_page) {
    if (mathforPagination > pageAttribute - 1) {
      var new_products = $(next_page).find(".products-on-page");
      pageAttribute = pageAttribute + 1;
      new_url = "/collections/all?page=" + pageAttribute + "";

      next_url = new_url;

      products_on_page.append(new_products.html());
    }
  });
});

var urlLEM = window.location.href;

function myPopup(myURL, title, myWidth, myHeight) {
  var left = (screen.width - myWidth) / 2;
  var top = (screen.height - myHeight) / 4;
  var myWindow = window.open(
    myURL,
    title,
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
      myWidth +
      ", height=" +
      myHeight +
      ", top=" +
      top +
      ", left=" +
      left,
  );
}

$("#twitter-button").click(function () {
  var getText = $("#majorText").html();
  var noSpecial = getText.replace("%", "");
  var getURL = window.location.href;
  myPopup(
    "https://twitter.com/intent/tweet?text=" +
      noSpecial +
      "%20%40theknottyones%20" +
      getURL,
    getText,
    375,
    400,
  );
});

$("#linkedin-button").click(function () {
  var getText = $("#majorText").html();
  var getURL = window.location.href;
  var getImg = $("#getImgB").attr("src");
  myPopup(
    "https://www.linkedin.com/shareArticle?mini=true&url=" +
      getURL +
      "&title=&summary=" +
      getText,
    getText,
    375,
    400,
  );
});

$("#facebook-button").click(function () {
  var getURL = window.location.href;
  myPopup(
    "https://www.facebook.com/sharer/sharer.php?u=" + getURL,
    null,
    375,
    400,
  );
});

$(document).ready(function () {
  $(".section-nav").find("a").css("opacity", ".5");
  $(".section-nav").find("a").eq(0).css("opacity", "1");

  var position_item_length = $(".myclass").length;
  var position_item = [];

  for (let p = 0; p < position_item_length; p++) {
    var position_calc = $(".myclass").eq(p).find(".section-nav").offset().left;
    position_item.push(position_calc);
  }

  function myScroll(selectedClass, scrollContainer) {
    var self = selectedClass;

    var leftOffset =
      self.offset().left -
      scrollContainer.offset().left +
      scrollContainer.scrollLeft() -
      6.5;
    scrollContainer.animate({ scrollLeft: leftOffset });
  }

  var page_navigation_controller = new ScrollMagic.Controller();
  var page_navigation_scene;
  var page_navigation_scene_2;
  var page_navigation_scene_3;
  var page_navigation_scene_4;
  var page_navigation_scene_5;

  if ($("#section-1")[0]) {
    page_navigation_scene = new ScrollMagic.Scene({
      triggerElement: "#section-1",
      duration: $("#section-1").outerHeight(),
    }).addTo(page_navigation_controller);
  }

  if ($("#section-2")[0]) {
    page_navigation_scene_2 = new ScrollMagic.Scene({
      triggerElement: "#section-2",
      duration: $("#section-2").outerHeight(),
    }).addTo(page_navigation_controller);
  }

  if ($("#section-3")[0]) {
    page_navigation_scene_3 = new ScrollMagic.Scene({
      triggerElement: "#section-3",
      duration: $("#section-3").outerHeight(),
    }).addTo(page_navigation_controller);
  }

  if ($("#section-4")[0]) {
    page_navigation_scene_4 = new ScrollMagic.Scene({
      triggerElement: "#section-4",
      duration: $("#section-4").outerHeight(),
    }).addTo(page_navigation_controller);
  }

  if ($("#section-5")[0]) {
    page_navigation_scene_5 = new ScrollMagic.Scene({
      triggerElement: "#section-5",
      duration: $("#section-5").outerHeight(),
    }).addTo(page_navigation_controller);
  }

  if ($("#section-1")[0]) {
    page_navigation_scene.on("enter", function (event) {
      if ($("#sec-1").hasClass("no-action")) {
      } else {
        myScroll($("#sec-1"), $(".page-navigation"));
      }

      $(".section-nav").find("a").css("opacity", ".5");
      $("#sec-1").find("a").css("opacity", "1");
    });
  }

  if ($("#section-2")[0]) {
    page_navigation_scene_2.on("enter", function (event) {
      if ($("#sec-2").hasClass("no-action")) {
      } else {
        myScroll($("#sec-2"), $(".page-navigation"));
      }

      $(".section-nav").find("a").css("opacity", ".5");
      $("#sec-2").find("a").css("opacity", "1");
    });
  }

  if ($("#section-3")[0]) {
    page_navigation_scene_3.on("enter", function (event) {
      if ($("#sec-3").hasClass("no-action")) {
      } else {
        myScroll($("#sec-3"), $(".page-navigation"));
      }
      $(".section-nav").find("a").css("opacity", ".5");
      $("#sec-3").find("a").css("opacity", "1");
    });
  }

  if ($("#section-4")[0]) {
    page_navigation_scene_4.on("enter", function (event) {
      if ($("#sec-4").hasClass("no-action")) {
      } else {
        myScroll($("#sec-4"), $(".page-navigation"));
      }
      $(".section-nav").find("a").css("opacity", ".5");
      $("#sec-4").find("a").css("opacity", "1");
    });
  }

  if ($("#section-5")[0]) {
    page_navigation_scene_5.on("enter", function (event) {
      if ($("#sec-5").hasClass("no-action")) {
      } else {
        myScroll($("#sec-5"), $(".page-navigation"));
      }
      $(".section-nav").find("a").css("opacity", ".5");
      $("#sec-5").find("a").css("opacity", "1");
    });
  }

  var videocontainercontrol = new ScrollMagic.Controller();
  var videocontainer_scene;

  if ($("#about_video")[0]) {
    videocontainer_scene = new ScrollMagic.Scene({
      triggerElement: ".video-container",
      duration: $(".video-container").outerHeight() + 350,
    }).addTo(videocontainercontrol);

    videocontainer_scene.on("leave", function (event) {
      player.setVolume(0);
      controlSound = 0;
      $(".video-container")
        .find(".video-content")
        .find(".mute-icon--")
        .find("img")
        .attr(
          "src",
          "https://cdn.shopify.com/s/files/1/0548/6644/4336/files/mute_br.svg?v=1648411552",
        );
    });
  }

  var wherethe_section;
  var wherethe_section_2;
  var wherethe_section_3;
  var wherethe_section_4;
  var wherethe_section_5;

  if ($("#section-1")[0]) {
    $("#section-1-button").click(function () {
      $(".section-nav").addClass("no-action");

      wherethe_section = $("#section-1").offset();
      $("html, body").animate(
        {
          scrollTop: wherethe_section.top - 83,
        },
        function () {
          $(".page-navigation").animate(
            {
              scrollLeft: position_item[0] - 6.5,
            },
            300,
          );
          $(".section-nav").removeClass("no-action");
        },
      );
    });
  }

  if ($("#section-2")[0]) {
    $("#section-2-button").click(function () {
      $(".section-nav").addClass("no-action");
      wherethe_section_2 = $("#section-2").offset();

      $("html, body").animate(
        {
          scrollTop: wherethe_section_2.top - 83,
        },
        function () {
          $(".page-navigation").animate(
            {
              scrollLeft: position_item[1] - 6.5,
            },
            300,
          );
          $(".section-nav").removeClass("no-action");
        },
      );
    });
  }

  if ($("#section-3")[0]) {
    $("#section-3-button").click(function () {
      $(".section-nav").addClass("no-action");
      wherethe_section_3 = $("#section-3").offset();
      $("html, body").animate(
        {
          scrollTop: wherethe_section_3.top - 83,
        },
        function () {
          $(".page-navigation").animate(
            {
              scrollLeft: position_item[2] - 6.5,
            },
            300,
          );
          $(".section-nav").removeClass("no-action");
        },
      );
    });
  }

  if ($("#section-4")[0]) {
    $("#section-4-button").click(function () {
      $(".section-nav").addClass("no-action");
      wherethe_section_4 = $("#section-4").offset();
      $("html, body").animate(
        {
          scrollTop: wherethe_section_4.top - 83,
        },
        function () {
          $(".page-navigation").animate(
            {
              scrollLeft: position_item[3] - 6.5,
            },
            300,
          );
          $(".section-nav").removeClass("no-action");
        },
      );
    });
  }

  if ($("#section-5")[0]) {
    $("#section-5-button").click(function () {
      $(".section-nav").addClass("no-action");
      wherethe_section_5 = $("#section-5").offset();
      $("html, body").animate(
        {
          scrollTop: wherethe_section_5.top - 83,
        },
        function () {
          $(".page-navigation").animate(
            {
              scrollLeft: position_item[4] - 6.5,
            },
            300,
          );
          $(".section-nav").removeClass("no-action");
        },
      );
    });
  }
});

$(document).on("mouseenter", ".nohover", function (event) {
  if (isMobile == null) {
    $(this).find(".counter-holder").find("a").show();
  }
});
$(document).on("mouseleave", ".nohover", function (event) {
  if (isMobile == null) {
    $(this).find(".counter-holder").find("a").hide();
  }
});

$(".choose___button").click(function () {
  if ($(this).hasClass("active")) {
    $(".choose___button").removeClass("active");
    $(".sizes").hide();
    $(".product__info-container").css("z-index", "1");
    $("body").css("overflow", "inherit");
    $("html").css("overflow", "inherit");
    $(".product__info-container").removeClass("info-container__mobile");
  } else {
    $(".sizes").show();
    $(this).addClass("active");
    $(".product__info-container").addClass("info-container__mobile");

    if (isMobile != null) {
      $(".product__info-container").css("z-index", "11");
      $("body").css("overflow", "hidden");
      $("html").css("overflow", "hidden");
    }
  }
});

$(".choose___button__setsave").click(function () {
  if ($(this).hasClass("active")) {
    $(".choose___button__setsave").removeClass("active");
    $(".sizes-setsave").hide();
    $(".product__info-container").css("z-index", "1");
    $("body").css("overflow", "inherit");
    $("html").css("overflow", "inherit");
    $(".product__info-container").removeClass("info-container__mobile");
  } else {
    $(".sizes-setsave").show();
    $(this).addClass("active");
    $(".product__info-container").addClass("info-container__mobile");

    if (isMobile != null) {
      $(".product__info-container").css("z-index", "11");
      $("body").css("overflow", "hidden");
      $("html").css("overflow", "hidden");
    }
  }
});

$(".close-x").click(function () {
  $(".choose___button").removeClass("active");
  $(".sizes").hide();
  $(".product__info-container").removeClass("info-container__mobile");
  $(".product__info-container").css("z-index", "4");
  $("html").css("overflow", "inherit");
  $("body").css("overflow", "inherit");
});

$(".close-x-setsave").click(function () {
  $(".choose___button__setsave").removeClass("active");
  $(".sizes-setsave").hide();
  $(".product__info-container").removeClass("info-container__mobile");
  $(".product__info-container").css("z-index", "4");
  $("html").css("overflow", "inherit");
  $("body").css("overflow", "inherit");
});

$(".pimage-wrapper").scroll(function () {});

var openControl;

$(".money-changer").click(function () {
  openControl = $(this).attr("data-open-currency");
  /*$(this).css('z-index','2');*/
  if (openControl == 0) {
    $(this)
      .parent()
      .find(".show-selection")
      .find("ul")
      .find(".found-meta")
      .css("display", "flex");
    $(this).attr("data-open-currency", "1");
  } else {
    $(this)
      .parent()
      .find(".show-selection")
      .find("ul")
      .find(".found-meta")
      .css("display", "none");
    $(this).attr("data-open-currency", "0");
  }
});

var openControl_drawer;

$(".money-changer-drawer").click(function () {
  openControl_drawer = $(this).attr("data-open-currency");
  if (openControl_drawer == 0) {
    $(".found-meta-drawer").css("display", "flex");
    $(this).attr("data-open-currency", "1");
  } else {
    $(".found-meta-drawer").css("display", "none");
    $(this).attr("data-open-currency", "0");
  }
});

var newfoundHolder;
var getPriceHolder;
var donateQuantity;
$(".found-meta").click(function () {
  /*$(this).parent().parent().parent().find('.money-changer').css('z-index','3');*/
  newfoundHolder = $(this).attr("data-value");
  donateQuantity = $(this).attr("data-itemsize");
  $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".donate-accordion")
    .find("button")
    .attr("data-quantity", donateQuantity);
  getPriceHolder = $(this).html();
  // $(this).parent().parent().parent().parent().find('.donate-accordion').find('button').attr('data-productid',newfoundHolder);
  $(this).parent().find(".found-meta").css("display", "none");
  $(this)
    .parent()
    .parent()
    .parent()
    .find(".money-changer")
    .attr("data-open-currency", "0");
  $(this)
    .parent()
    .parent()
    .parent()
    .find(".currency-holder")
    .html(getPriceHolder);
});

var newfoundHolder_drawer;
var getPriceHolder_drawer;
var getquantity_drawer;
$(".found-meta-drawer").click(function () {
  newfoundHolder_drawer = $(this).attr("data-value");
  getquantity_drawer = $(this).attr("data-itemsize");
  getPriceHolder_drawer = $(this).html();
  // $('#donate').attr('data-productid',newfoundHolder_drawer);
  $("#donate").attr("data-quantity", getquantity_drawer);
  $(".found-meta-drawer").css("display", "none");
  $(".money-changer-drawer").attr("data-open-currency", "0");
  $(".currency-holder-drawer").html(getPriceHolder_drawer);
});

$(document).on("click", ".heder_custom", function (event) {
  event.preventDefault(); //or return false;
  if (onclickit == 0) {
    $(".sort_custom").addClass("hideitoff");
    $(".sortby_container").addClass("filter--shadow");
    $(this).addClass("btn-click");
    onclickit = 1;
  } else {
    $(".sort_custom").removeClass("hideitoff");
    $(".sortby_container").removeClass("filter--shadow");
    $(this).removeClass("btn-click");
    onclickit = 0;
  }
});

$(document).on("click", ".infobox_close", function (event) {
  event.preventDefault();
  $(".info-window").hide();
});

$(function () {
  $(window).on("unload", function (e) {
    var scrollPosition = $("div#element").scrollTop();
    localStorage.setItem("scrollPosition", scrollPosition);
  });
  if (localStorage.scrollPosition) {
    $("div#element").scrollTop(localStorage.getItem("scrollPosition"));
  }
});

/*window.addEventListener('popstate', (event) => {
    location.reload();
   });*/

var currentMnHeight;
$(document).ready(function () {
  if ($(".page-nav-master")[0]) {
    // currentMnHeight =  $('.page-nav-master').outerWidth();
    //$('.page-nav-master').width(currentMnHeight+282);
  }
});

/* var offsetValue;

   offsetValue = $( '.page-navigation' ).offset();
 
 
   let page_nav_controller = new ScrollMagic.Controller();
   let page_nav_scene = new ScrollMagic.Scene({
     duration: offsetValue.top,*/

// A $( document ).ready() block.
var sizeOffset;
var scrollv;
var scrollControl = 0;
var ghostHight;

$(document).ready(function () {
  if ($(".size___wrapper")[0]) {
    if (isMobile != null) {
      sizeOffset = $(".size___wrapper").offset();
      ghostHight = $(".size___wrapper").outerHeight();
      $(window).scroll(function (event) {
        scrollv = $(window).scrollTop();
        if ($(".size___wrapper").hasClass("no_manuplation")) {
          console.log("already fixed");
        } else {
        }
      });
    }
  }
});

$(document).on("touchstart click", ".warning_close", function (event) {
  $("#warning").slideUp("fast");
});

$(document).on("click", ".currency-button", function (event) {
  event.preventDefault(); //or return false;
  var getChangeCurrency = $(this).attr("data-getcurreny");
  $(".currency-switcher").val(getChangeCurrency).trigger("change");
  $(".selected--currency").html(getChangeCurrency);
  var currency_length = $(".doubly-wrapper").attr("data-currency");
  var currency__array = currency_length.split(",");
  var currency_length_get = currency__array.length;
  $(".currency-selector--item").remove();
  for (let i = 0; i < currency_length_get; i++) {
    if (getChangeCurrency != currency__array[i]) {
      $(".currency-selector").append(
        '<div class="currency-selector--item"><a class="currency-button" href="javascript:void(0)" data-getcurreny="' +
          currency__array[i] +
          '">' +
          currency__array[i] +
          "</a></div>",
      );
    }
  }
});

var $content = $(".doubly-wrapper");
// var intervalId = setInterval(function () {
//   if (!$content.is(":empty")) {
//     var selectedCurrency = $(".money").attr("doubly-currency");
//     $(".selected--currency").html(selectedCurrency);
//     $(".currency-selector").show();
//     var all__currency = $(".doubly-wrapper").attr("data-currency");
//     var currency__array = all__currency.split(",");
//     var currency_length = currency__array.length;
//
//     for (let i = 0; i < currency_length; i++) {
//       if (selectedCurrency != currency__array[i]) {
//         $(".currency-selector").append(
//           '<div class="currency-selector--item"><a class="currency-button" href="javascript:void(0)" data-getcurreny="' +
//             currency__array[i] +
//             '">' +
//             currency__array[i] +
//             "</a></div>",
//         );
//       }
//     }
//
//     clearInterval(intervalId);
//   }
// }, 1000);

$(document).ready(function () {
  var knitcare_product;

  $(".knitcare_service").click(function () {
    knitcare_product = $("#hp-product-header").offset();

    if (isMobile == null) {
      $("html, body").animate(
        {
          scrollTop: knitcare_product.top,
        },
        300,
      );
    } else {
      $("html, body").animate(
        {
          scrollTop: knitcare_product.top - 40,
        },
        300,
      );
    }
  });
});

$(".faq-main-header").click(function () {
  if (isMobile != null) {
    if ($(this).next().hasClass("active")) {
      $(this).next().css("display", "none");
      $(this).next().removeClass("active");
    } else {
      $(this).next().css("display", "block");
      $(this).next().addClass("active");
    }
  }
});

$(document).ready(function () {
  if (isMobile != null && $(".rte")[0]) {
    if (isOS != "AndroidOS") {
      $(".page-width")
        .find("strong")
        .each(function (index) {
          $(this).addClass("ios_device");
        });
    } else {
      $(".page-width")
        .find("strong")
        .each(function (index) {
          $(this).addClass("android_device");
        });
    }
  }

  if (isMobile != null && $(".fc-right")[0]) {
    if (isOS != "AndroidOS") {
      $(".fc-right")
        .find("strong")
        .each(function (index) {
          $(this).addClass("ios_device");
        });
    } else {
      $(".fc-right")
        .find("strong")
        .each(function (index) {
          $(this).addClass("android_device");
        });
    }
  }
});

var detectVariant;
var sizeClick = 0;
var colorClick = 0;
var data_url_selection;
var productOption1;
var productOption2;
var productIDInsta;

/*Product Data Variables for Insta App*/

var InstaproductName;
var InstaproductType;
var InstaproductOption1;
var InstaproductOption2;
var InstaproductImage;
var getVariantType;

$(document).ready(function () {
  $(document).on("click", ".fs-entry-container", function () {
    console.log("click");
  });
});

/*Product Data Variables for Insta App*/
$(document).on("touchstart click", ".fs-shopify-add-cart", function (event) {
  sizeClick = 0;
  colorClick = 0;

  var data_url = $(this).attr("data-product-url");
  var data_url_format = data_url.split("/");
  data_url_selection = data_url_format[2];
  jQuery.getJSON(
    window.Shopify.routes.root + "products/" + data_url_selection + ".js",
    function (product) {
      detectVariant = product.variants.length;
      InstaproductName = product.title;
      getVariantType = product.variants[0].option2;

      console.log(detectVariant);
      console.log(InstaproductName);
      console.log(getVariantType);
    },
  );
  if ($(".fs-detail-container").hasClass("fs-slid")) {
    console.log("active");
  } else {
    $(".fs-detail-container").addClass("fs-slid");
  }

  $(".fs-Color")
    .find(".fs-variant-select")
    .find("input")
    .each(function () {
      $(this).prop("checked", false);
    });

  $(".fs-Size")
    .find(".fs-variant-select")
    .find("input")
    .each(function () {
      $(this).prop("checked", false);
    });

  $(".fs-Color").find(".fs-variant-select").attr("style", "");
  $(".fs-Size").find(".fs-variant-select").attr("style", "");

  $(".fs-complete-purchase").remove();
});

$(document).on("touchstart click", ".fs-option", function (event) {
  var clickVariantType = $(this).attr("name");
  if (clickVariantType == "Size") {
    sizeClick = 0;
    sizeClick++;
    productOption1 = $(this).parent().find("label").html();
  }
  if (clickVariantType == "Color") {
    colorClick = 0;
    colorClick++;
    productOption2 = $(this).parent().find("label").html();
  }

  console.log(productOption1);
  console.log(productOption2);

  if (sizeClick == 1 && colorClick == 1) {
    jQuery.getJSON(
      window.Shopify.routes.root + "products/" + data_url_selection + ".js",
      function (product) {
        for (let i = 0; i < detectVariant; i++) {
          var variantOp1Control = product.variants[i].option1;
          var variantOp2Control = product.variants[i].option2;
          console.log(variantOp1Control + "/" + productOption1);
          if (
            variantOp2Control == productOption1 &&
            variantOp1Control == productOption2
          ) {
            productIDInsta = product.variants[i].id;
            console.log(productIDInsta);
            $(".fs-button-bar").find(".buy-insta").remove();
            $(".fs-button-bar").prepend(
              '<a type="button" class="fs-buy-button fs-medium-text product-buy-button-active buy-insta" data-id="' +
                productIDInsta +
                '">Add to Cart</a>',
            );
          }
        }
      },
    );
  }

  InstaproductImage = $("#fs-buffer").attr("src");
  console.log(InstaproductImage);
});

$(document).on("touchstart click", ".buy-insta", function (event) {
  $(".fs-buy-container").find("div").remove();

  $(".fs-buy-container").append(
    '<div class="fs-added-notification fs-buy-now-form"></div>',
  );
  $(".fs-added-notification").append(
    '<div class="fs-large-text">Added to Cart</div>',
  );
  $(".fs-added-notification").append('<div class="fs-isolation"></div>');
  $(".fs-added-notification").append(
    '<div class="fs-large-text">' +
      InstaproductName +
      " - " +
      productOption1 +
      " / " +
      productOption2 +
      "</div>",
  );
  $(".fs-added-notification").append(
    '<img id="fs-buy-featured-image" src="' + InstaproductImage + '" style="">',
  );
  $(".fs-added-notification").append(
    '<div class="fs-medium-text">Your cart now has <span class="" data-cart-render="item_count"></span> item</div>',
  );
  $(".fs-added-notification").append('<div class="fs-button-bar"></div>');
  $(".fs-button-bar").append(
    '<a class="fs-buy-button fs-medium-text" data-turbolinks="false" data-no-instant="" href="/cart/" tabindex="0" id="fs-proceed" style="display: block;">Proceed to Checkout</a>',
  );
  $(".fs-button-bar").append(
    '<a class="continuedis fs-buy-button fs-medium-text" tabindex="0" id="">Continue Shopping</a>',
  );
});

$(document).on("touchstart click", ".continuedis", function (event) {
  /*$('.fs-added-notification').css('opacity','0');*/
  /*$('.fs-detail-container').css('transform','translateX(0px) scale(1)');
       $('.fs-buy-container').css('z-index','-1');*/
  $(".fs-detail-container").removeClass("fs-slid");
  $(".fs-buy-container").addClass("fs-unslid");
});

function IsEmail(email) {
  var regex =
    /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}

$(document).on("touchstart click", "#notifyme", function (event) {
  event.preventDefault();
  let getVariantID = $(this).data("id");
  let getEmail = $("#notifyMeEmail").val();

  if (IsEmail(getEmail) == false) {
    console.log("Enter correct email");
    $("#email_error").show();
    $("#email_error").html("* Please enter correnct email address");
    return false;
  } else {
    $("#email_error").hide();
    $.ajax({
      type: "POST",
      url: "https://a.klaviyo.com/onsite/components/back-in-stock/subscribe",
      data: {
        a: "WMbGWk",
        email: getEmail,
        variant: getVariantID,
        platform: "shopify",
      },
      success: function (response) {
        $(".notify_me_form_holder").remove();
        $("#success_message").html("Thank you. Keep an eye on your inbox.");
      },
    });
  }
});

$(document).on("touchstart click", "#notifyme-archive", function (event) {
  event.preventDefault();
  let getVariantID = $(this).data("id");
  let getEmail = $("#notifyMeEmail").val();

  if (IsEmail(getEmail) == false) {
    console.log("Enter correct email");
    $("#email_error").show();
    $("#email_error").html("* Please enter correnct email address");
    return false;
  }

  $("#email_error").hide();

  const requestData = {
    data: {
      type: "subscription",
      attributes: {
        profile: {
          data: {
            type: "profile",
            attributes: {
              email: getEmail,
              properties: { variantID: getVariantID },
            },
          },
        },
        custom_source: "Archive",
      },
      relationships: {
        list: {
          data: {
            type: "list",
            id: "YgLSw8",
          },
        },
      },
    },
  };

  $.ajax({
    type: "POST",
    headers: { revision: "2024-02-15", "content-type": "application/json" },
    url: "https://a.klaviyo.com/client/subscriptions/?company_id=WMbGWk",
    data: JSON.stringify(requestData),
    success: function (response) {
      $(".notify_me_form_holder").remove();
      $("#success_message").html("Thank you. Keep an eye on your inbox.");
    },
    error: function (xhr, status, error) {
      // Handle errors
      console.error("Error subscribing: ", error);
      $("#email_error")
        .show()
        .html("* There was an error subscribing. Please try again.");
    },
  });
});
