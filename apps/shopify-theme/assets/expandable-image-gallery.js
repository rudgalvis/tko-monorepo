// File#: _3_expandable-img-gallery
// Usage: codyhouse.co/license

(function () {
  function adjustGalleryControls() {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const mobileGallery = document.getElementById("mobile-gallery");
    const desktopGallery = document.getElementById("desktop-gallery");

    // Toggle 'data-controls' based on the viewport
    toggleDataControls(mobileGallery, !isDesktop);
    toggleDataControls(desktopGallery, isDesktop);
  }

  function toggleDataControls(element, shouldSet) {
    if (element) {
      shouldSet
        ? element.setAttribute("data-controls", "expLightbox")
        : element.removeAttribute("data-controls");
    }
  }

  // Execute on page load and window resize
  adjustGalleryControls();
  window.addEventListener("resize", adjustGalleryControls);

  var ExpGallery = function (element) {
    this.element = element;
    this.slideshow = this.element.getElementsByClassName(
      "js-exp-lightbox__body",
    )[0];
    this.slideshowList = this.element.getElementsByClassName(
      "js-exp-lightbox__slideshow",
    )[0];
    this.slideshowId = this.element.getAttribute("id");
    this.gallery = document.querySelector(
      '[data-controls="' + this.slideshowId + '"]',
    );
    this.galleryItems = this.gallery.getElementsByClassName(
      "js-exp-gallery__item",
    );

    this.lazyload = this.gallery.getAttribute("data-placeholder");
    this.animationRunning = false;
    // menu bar
    this.menuBar = this.element.getElementsByClassName("js-menu-bar");
    initNewContent(this);
    initLightboxMarkup(this);
    lazyLoadLightbox(this);
    initSlideshow(this);
    initModal(this);
    initModalEvents(this);
  };

  //obeserver to update list of images when color is changed
  const galleryObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type == "childList") {
        updateGalleries();
      }
    });
  });

  galleryObserver.observe(document.querySelector("#desktop-gallery"), {
    childList: true,
    subtree: true,
  });

  galleryObserver.observe(document.querySelector("#mobile-gallery"), {
    childList: true,
    subtree: true,
  });

  function updateGalleries() {
    //ExpGallery should be cleaned up?
    expGalleriesArray = [];
    const expGalleries = document.getElementsByClassName("js-exp-lightbox");
    animationSupported =
      window.requestAnimationFrame &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    for (var i = 0; i < expGalleries.length; i++) {
      expGalleriesArray.push([new ExpGallery(expGalleries[i])]);
    }
  }

  function initNewContent(gallery) {
    // if the gallery uses the infinite load - make sure to update the modal gallery when new content is loaded
    gallery.infiniteScrollParent = gallery.gallery.closest("[data-container]");
    if (
      !gallery.infiniteScrollParent &&
      gallery.gallery.classList.contains("js-infinite-scroll")
    ) {
      gallery.infiniteScrollParent = gallery.gallery;
    }

    if (gallery.infiniteScrollParent) {
      gallery.infiniteScrollParent.addEventListener(
        "content-loaded",
        function (event) {
          initLightboxMarkup(gallery);
          initSlideshow(gallery);
        },
      );
    }
  }

  function initLightboxMarkup(gallery) {
    // create items inside lightbox - modal slideshow
    var slideshowContent = "";
    for (var i = 0; i < gallery.galleryItems.length; i++) {
      var caption = gallery.galleryItems[i].getElementsByClassName(
          "js-exp-gallery__caption",
        ),
        image = gallery.galleryItems[i].getElementsByTagName("img")[0],
        caption = gallery.galleryItems[i].getElementsByClassName(
          "js-exp-gallery__caption",
        );
      // details
      var src = image.getAttribute("data-modal-src");

      if (!src) src = image.getAttribute("data-src");
      if (!src) src = image.getAttribute("src");
      var altAttr = image.getAttribute("alt");
      altAttr = altAttr ? 'alt="' + altAttr + '"' : "";
      var draggable =
        gallery.slideshow.getAttribute("data-swipe") == "on"
          ? 'draggable="false" ondragstart="return false;"'
          : "";
      var imgBlock = gallery.lazyload
        ? '<img data-src="' +
          src +
          '" data-loading="lazy" src="' +
          gallery.lazyload +
          '" ' +
          altAttr +
          " " +
          draggable +
          ' class=" ei1-pointer-events-auto">'
        : '<img src="' +
          src +
          '" data-loading="lazy" ' +
          draggable +
          ' class=" ei1-pointer-events-auto">';
      var captionBlock =
        caption.length > 0
          ? '<figcaption class="exp-lightbox__caption ei1-pointer-events-auto">' +
            caption[0].textContent +
            "</figcaption>"
          : "";

      slideshowContent =
        slideshowContent +
        '<li class="slideshow__item js-slideshow__item"><figure class="exp-lightbox__media"><div class="exp-lightbox__media-outer"><div class="exp-lightbox__media-inner">' +
        imgBlock +
        "</div></div>" +
        captionBlock +
        "</li>";
    }
    gallery.slideshowList.innerHTML = slideshowContent;
    gallery.slides =
      gallery.slideshowList.getElementsByClassName("js-slideshow__item");

    // append the morphing image - we will animate it from the selected slide to the final position (and viceversa)
    var imgMorph = document.createElement("div");
    imgMorph.setAttribute("aria-hidden", "true");
    imgMorph.setAttribute(
      "class",
      "exp-lightbox__clone-img-wrapper js-exp-lightbox__clone-img-wrapper",
    );
    imgMorph.setAttribute("data-exp-morph", gallery.slideshowId);
    imgMorph.innerHTML =
      '<svg><defs><clipPath id="' +
      gallery.slideshowId +
      '-clip"><rect/></clipPath></defs><image height="100%" width="100%" clip-path="url(#' +
      gallery.slideshowId +
      '-clip)"></image></svg>';
    document.body.appendChild(imgMorph);
    gallery.imgMorph = document.querySelector(
      '.js-exp-lightbox__clone-img-wrapper[data-exp-morph="' +
        gallery.slideshowId +
        '"]',
    );
    gallery.imgMorphSVG = gallery.imgMorph.getElementsByTagName("svg")[0];
    gallery.imgMorphRect = gallery.imgMorph.getElementsByTagName("rect")[0];
    gallery.imgMorphImg = gallery.imgMorph.getElementsByTagName("image")[0];

    // append image for zoom in effect
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (gallery.slideshow.getAttribute("data-zoom") == "on" && isDesktop) {
      var zoomImg = document.createElement("div");
      zoomImg.setAttribute("aria-hidden", "true");
      zoomImg.setAttribute(
        "class",
        "exp-lightbox__zoom exp-lightbox__zoom--no-transition js-exp-lightbox__zoom",
      );
      zoomImg.innerHTML = "<img>";
      gallery.element.appendChild(zoomImg);
      gallery.zoomImg = gallery.element.getElementsByClassName(
        "js-exp-lightbox__zoom",
      )[0];
    }
  }

  function attachTapListener(image, imageContainer) {
    const maxScale = 5;
    const element = image;
    const hammertime = new Hammer(element, {});

    // pinch is usually disabled as it makes the element
    // blocking, and pan is limited to x-axis, so enable these
    hammertime.get("pinch").set({ enable: true });
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    const container = imageContainer;
    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;
    const elementHeight = element.clientHeight;
    const elementWidth = element.clientWidth;

    let currentScale = 1,
      offsetX = 0,
      offsetY = 0,
      panOffsetX = 0,
      panOffsetY = 0,
      pinchCentreX = 0,
      pinchCentreY = 0;

    hammertime.on("pinchstart", function (e) {
      // record starting offset at beginning of pinch operation
      panOffsetX = offsetX;
      panOffsetY = offsetY;

      // record the original centre point of the pinch, relative to the element
      // e.center seems to return values relative to screen, so use screen dimensions.
      pinchCentreX = Math.round(
        (e.center.x - panOffsetX - screenWidth / 2) / currentScale,
      );
      pinchCentreY = Math.round(
        (e.center.y - panOffsetY - screenHeight / 2) / currentScale,
      );
    });

    hammertime.on("pinch", function (e) {
      // don't allow scales less than 1, or greater than maxScale
      // e.scale is relative to the start of the current pinch operation, not the last event
      let scale = Math.min(maxScale, Math.max(1, currentScale * e.scale));

      offsetX = panOffsetX + Math.round(pinchCentreX * (1 - e.scale));
      offsetY = panOffsetY + Math.round(pinchCentreY * (1 - e.scale));

      // allow for dragging (i.e. panning) while pinching
      offsetX += e.deltaX;
      offsetY += e.deltaY;

      // constrain edges
      let overlapX = Math.max(
        0,
        Math.round((elementWidth * scale - containerWidth) / 2),
      );
      let overlapY = Math.max(
        0,
        Math.round((elementHeight * scale - containerHeight) / 2),
      );
      offsetX = Math.max(-overlapX, Math.min(overlapX, offsetX));
      offsetY = Math.max(-overlapY, Math.min(overlapY, offsetY));
      // order of transforms is important
      let transforms = [
        "translate(" + offsetX + "px," + offsetY + "px)",
        "scale(" + scale + ")",
      ];
      element.style.transform = transforms.join(" ");
    });

    hammertime.on("pinchend", function (e) {
      // update current scale ready for next pinch or pan operation
      currentScale = Math.min(maxScale, Math.max(1, currentScale * e.scale));
    });

    hammertime.on("panstart", function () {
      panOffsetX = offsetX;
      panOffsetY = offsetY;
    });

    hammertime.on("tap", function (e) {
      // Increase the scale slightly on each tap
      currentScale += 1;

      // Don't allow scales greater than maxScale
      currentScale = Math.min(maxScale, currentScale);

      // Apply the new scale to the image
      let transforms = [
        "translate(" + offsetX + "px," + offsetY + "px)",
        "scale(" + currentScale + ")",
      ];
      element.style.transform = transforms.join(" ");
    });

    hammertime.on("panmove", function (e) {
      let overlapX = Math.max(
          0,
          Math.round((elementWidth * currentScale - containerWidth) / 2),
        ),
        overlapY = Math.max(
          0,
          Math.round((elementHeight * currentScale - containerHeight) / 2),
        );

      panOffsetX = Math.max(-overlapX, Math.min(overlapX, offsetX + e.deltaX));
      panOffsetY = Math.max(-overlapY, Math.min(overlapY, offsetY + e.deltaY));
      // order of transforms is important
      transforms = [
        "translate(" + panOffsetX + "px," + panOffsetY + "px)",
        "scale(" + currentScale + ")",
      ];
      element.style.transform = transforms.join(" ");
    });

    hammertime.on("panend", function (e) {
      // Record final position here to take account of constraint calculations in
      // panmove handler; magnitude of e.deltaX may have been limited.
      offsetX = panOffsetX;
      offsetY = panOffsetY;
    });
  }

  function lazyLoadLightbox(gallery) {
    // lazyload media of selected slide/prev slide/next slide
    gallery.slideshow.addEventListener("newItemSelected", function (event) {
      // 'newItemSelected' is emitted by the Slideshow object when a new slide is selected
      gallery.selectedSlide = event.detail;
      lazyLoadSlide(gallery);
      // menu element - trigger new slide event
      triggerMenuEvent(gallery);
    });
    gallery.slideshow.addEventListener("imagesLoaded", function () {
      gallery.imagesLoadedFlag = true; // Set the flag to true
    });
  }

  function resetZoomForCurrentSlide(gallery) {
    var currentSlide = gallery.slides[gallery.selectedSlide];
    var image = currentSlide.querySelector("img");
    if (image) {
      image.style.transform = "scale(1)";
      // Reset any other transformations if necessary
    }
  }

  function lazyLoadSlide(gallery) {
    setSlideMedia(gallery, gallery.selectedSlide);
    setSlideMedia(gallery, gallery.selectedSlide + 1);
    setSlideMedia(gallery, gallery.selectedSlide - 1);
    resetZoomForCurrentSlide(gallery);
  }

  function setSlideMedia(gallery, index) {
    if (index < 0) index = gallery.slides.length - 1;
    if (index > gallery.slides.length - 1) index = 0;

    var imgs = gallery.slides[index].querySelectorAll("img[data-src]");

    for (var i = 0; i < imgs.length; i++) {
      imgs[i].onload = () => {
        if (index === gallery.selectedSlide) {
          var selectedSlide = gallery.slides[gallery.selectedSlide];
          var image = selectedSlide.querySelector("img");
          const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
          if (!isDesktop) {
            attachTapListener(image, image.parentElement);
          }
        }
      };
      imgs[i].src = imgs[i].getAttribute("data-src");
    }
  }

  function initSlideshow(gallery) {
    // reset slideshow navigation
    resetSlideshowControls(gallery);
    gallery.slideshowNav = gallery.element.getElementsByClassName(
      "js-slideshow__control",
    );

    if (gallery.slides.length <= 1) {
      toggleSlideshowElements(gallery, true);
      return;
    }

    var swipe =
      gallery.slideshow.getAttribute("data-swipe") &&
      gallery.slideshow.getAttribute("data-swipe") == "on"
        ? true
        : false;

    gallery.slideshowObj = new Slideshow({
      element: gallery.slideshow,
      navigation: false,
      autoplay: false,
      swipe: swipe,
    });
  }

  function resetSlideshowControls(gallery) {
    var arrowControl = gallery.element.getElementsByClassName(
      "js-slideshow__control",
    );
    if (arrowControl.length == 0) return;
    var controlsWrapper = arrowControl[0].parentElement;
    if (!controlsWrapper) return;
    controlsWrapper.innerHTML = controlsWrapper.innerHTML;
  }

  function toggleSlideshowElements(gallery, bool) {
    // hide slideshow controls if gallery is composed by one item only
    if (gallery.slideshowNav.length > 0) {
      for (var i = 0; i < gallery.slideshowNav.length; i++) {
        bool
          ? gallery.slideshowNav[i].classList.add("ei1-hide")
          : gallery.slideshowNav[i].classList.remove("ei1-hide");
      }
    }
  }
  function initModal(gallery) {
    gallery.element.classList.add("exp-lightbox--no-transition"); // add no-transition class to lightbox - used to select the first visible slide
    gallery.element.addEventListener("modalIsClose", function (event) {
      // add no-transition class
      gallery.element.classList.add("exp-lightbox--no-transition");
      gallery.imgMorph.style = "";
    });

    // trigger modal lightbox
    gallery.gallery.addEventListener("click", function (event) {
      // Check if the click target is an infobox or a descendant of an infobox
      if (
        event.target.classList.contains("infobox") ||
        event.target.closest(".infobox") ||
        event.target.tagName.toLowerCase() === "a"
      ) {
        // Prevent the default behavior
        event.preventDefault();
      } else {
        openModalLightbox(gallery, event);
      }
    });
  }

  function initModalEvents(gallery) {
    if (gallery.zoomImg) {
      // image zoom
      gallery.slideshow.addEventListener("click", function (event) {
        if (
          event.target.tagName.toLowerCase() == "img" &&
          event.target.closest(".js-slideshow__item") &&
          !gallery.modalSwiping
        )
          modalZoomImg(gallery, event.target);
      });

      gallery.zoomImg.addEventListener("click", function (event) {
        modalZoomImg(gallery, false);
      });

      gallery.element.addEventListener("modalIsClose", function (event) {
        modalZoomImg(gallery, false); // close zoom-in image if open
        closeModalAnimation(gallery);
      });
    }
    if (!gallery.slideshowObj) return;
  }

  function modalZoomImg(gallery, img) {
    // toggle zoom-in image
    if (!gallery.zoomImg) return;
    var bool = false;
    if (img) {
      // open zoom-in image
      gallery.originImg = img;
      gallery.zoomImg.children[0].setAttribute("src", img.getAttribute("src"));
      bool = true;
    }
    animationSupported
      ? requestAnimationFrame(function () {
          animateZoomImg(gallery, bool);
        })
      : gallery.zoomImg.classList.toggle(
          "exp-lightbox__zoom--is-visible",
          bool,
        );
  }

  function animateZoomImg(gallery, bool) {
    if (!gallery.originImg) return;

    var originImgPosition = gallery.originImg.getBoundingClientRect(),
      originStyle =
        "translateX(" +
        originImgPosition.left +
        "px) translateY(" +
        (originImgPosition.top + gallery.zoomImg.scrollTop) +
        "px) scale(" +
        originImgPosition.width / gallery.zoomImg.scrollWidth +
        ")",
      finalStyle = "scale(1)";

    if (bool) {
      gallery.zoomImg.children[0].style.transform = originStyle;
    } else {
      gallery.zoomImg.addEventListener("transitionend", function cb() {
        gallery.zoomImg.classList.add("exp-lightbox__zoom--no-transition");
        gallery.zoomImg.scrollTop = 0;
        gallery.zoomImg.removeEventListener("transitionend", cb);
      });
    }
    setTimeout(function () {
      gallery.zoomImg.classList.remove("exp-lightbox__zoom--no-transition");
      gallery.zoomImg.classList.toggle("exp-lightbox__zoom--is-visible", bool);
      gallery.zoomImg.children[0].style.transform = bool
        ? finalStyle
        : originStyle;
    }, 50);
  }

  function openModalLightbox(gallery, event) {
    var item = event.target.closest(".js-exp-gallery__item");
    if (!item) return;
    // reset slideshow items visibility
    resetSlideshowItemsVisibility(gallery);
    gallery.selectedSlide = Array.prototype.indexOf.call(
      gallery.galleryItems,
      item,
    );
    setSelectedItem(gallery);
    lazyLoadSlide(gallery);
    if (animationSupported) {
      // start expanding animation
      window.requestAnimationFrame(function () {
        animateSelectedImage(gallery);
        openModal(gallery, item);
      });
    } else {
      // no expanding animation -> show modal
      openModal(gallery, item);
      gallery.element.classList.remove("exp-lightbox--no-transition");
    }
    // menu element - trigger new slide event
    triggerMenuEvent(gallery);
  }

  function resetSlideshowItemsVisibility(gallery) {
    var index = 0;
    for (var i = 0; i < gallery.galleryItems.length; i++) {
      var itemVisible = isVisible(gallery.galleryItems[i]);
      if (itemVisible) {
        index = index + 1;
        gallery.slides[i].classList.remove("ei1-hide");
      } else {
        gallery.slides[i].classList.add("ei1-hide");
      }
    }
    toggleSlideshowElements(gallery, index < 2);
  }

  function setSelectedItem(gallery) {
    // if a specific slide was selected -> make sure to show that item first
    var lastSelected = gallery.slideshow.getElementsByClassName(
      "slideshow__item--selected",
    );
    if (lastSelected.length > 0)
      lastSelected[0].classList.remove("slideshow__item--selected");
    gallery.slides[gallery.selectedSlide].classList.add(
      "slideshow__item--selected",
    );
    if (gallery.slideshowObj)
      gallery.slideshowObj.selectedSlide = gallery.selectedSlide;
  }

  function openModal(gallery, item) {
    gallery.element.dispatchEvent(
      new CustomEvent("openModal", { detail: item }),
    );
    gallery.modalSwiping = false;
  }

  function closeModal(gallery) {
    gallery.modalSwiping = true;
    gallery.element.dispatchEvent(new CustomEvent("closeModal"));
  }

  function closeModalAnimation(gallery) {
    // modal is already closing -> start image closing animation
    gallery.selectedSlide = gallery.slideshowObj
      ? gallery.slideshowObj.selectedSlide
      : 0;
    // on close - make sure last selected image (of the gallery) is in the viewport
    var boundingRect =
      gallery.galleryItems[gallery.selectedSlide].getBoundingClientRect();
    if (boundingRect.topf < 0 || boundingRect.top > window.innerHeight) {
      var windowScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      window.scrollTo(0, boundingRect.top + windowScrollTop);
    }
    // animate on close
    animateSelectedImage(gallery, true);
  }

  function animateSelectedImage(gallery, bool) {
    // create morphing image effect
    var imgInit =
        gallery.galleryItems[gallery.selectedSlide].getElementsByTagName(
          "img",
        )[0],
      imgInitPosition = imgInit.getBoundingClientRect(),
      imgFinal =
        gallery.slides[gallery.selectedSlide].getElementsByTagName("img")[0],
      imgFinalPosition = imgFinal.getBoundingClientRect();

    if (bool) {
      runAnimation(
        gallery,
        imgInit,
        imgInitPosition,
        imgFinal,
        imgFinalPosition,
        bool,
      );
    } else {
      imgFinal.style.visibility = "hidden";
      gallery.animationRunning = false;
      var image = new Image();
      image.onload = function () {
        if (gallery.animationRunning) return;
        imgFinalPosition = imgFinal.getBoundingClientRect();
        runAnimation(
          gallery,
          imgInit,
          imgInitPosition,
          imgFinal,
          imgFinalPosition,
          bool,
        );
      };
      image.src = imgFinal.getAttribute("data-src")
        ? imgFinal.getAttribute("data-src")
        : imgFinal.getAttribute("src");
      if (image.complete) {
        gallery.animationRunning = true;
        imgFinalPosition = imgFinal.getBoundingClientRect();
        runAnimation(
          gallery,
          imgInit,
          imgInitPosition,
          imgFinal,
          imgFinalPosition,
          bool,
        );
      }
    }
  }

  function runAnimation(
    gallery,
    imgInit,
    imgInitPosition,
    imgFinal,
    imgFinalPosition,
    bool,
  ) {
    // retrieve all animation params
    var scale =
      imgFinalPosition.width > imgFinalPosition.height
        ? imgFinalPosition.height / imgInitPosition.height
        : imgFinalPosition.width / imgInitPosition.width;
    var initHeight =
        imgFinalPosition.width > imgFinalPosition.height
          ? imgInitPosition.height
          : imgFinalPosition.height / scale,
      initWidth =
        imgFinalPosition.width > imgFinalPosition.height
          ? imgFinalPosition.width / scale
          : imgInitPosition.width;

    var initTranslateY = (imgInitPosition.height - initHeight) / 2,
      initTranslateX = (imgInitPosition.width - initWidth) / 2,
      initTop = imgInitPosition.top + initTranslateY,
      initLeft = imgInitPosition.left + initTranslateX;

    // get final states
    var translateX = imgFinalPosition.left - imgInitPosition.left,
      translateY = imgFinalPosition.top - imgInitPosition.top;

    var finTranslateX = translateX - initTranslateX,
      finTranslateY = translateY - initTranslateY;

    var initScaleX = imgInitPosition.width / initWidth,
      initScaleY = imgInitPosition.height / initHeight,
      finScaleX = 1,
      finScaleY = 1;

    if (bool) {
      // update params if this is a closing animation
      scale = 1 / scale;
      finScaleX = initScaleX;
      finScaleY = initScaleY;
      initScaleX = 1;
      initScaleY = 1;
      finTranslateX = -1 * finTranslateX;
      finTranslateY = -1 * finTranslateY;
      initTop = imgFinalPosition.top;
      initLeft = imgFinalPosition.left;
      initHeight = imgFinalPosition.height;
      initWidth = imgFinalPosition.width;
    }

    if (!bool) {
      imgFinal.style.visibility = ""; // reset visibility
    }

    // set initial status
    gallery.imgMorph.setAttribute(
      "style",
      "height: " +
        initHeight +
        "px; width: " +
        initWidth +
        "px; top: " +
        initTop +
        "px; left: " +
        initLeft +
        "px;",
    );
    gallery.imgMorphSVG.setAttribute(
      "viewbox",
      "0 0 " + initWidth + " " + initHeight,
    );
    gallery.imgMorphImg.setAttribute("xlink:href", imgInit.getAttribute("src"));
    gallery.imgMorphImg.setAttribute("href", imgInit.getAttribute("src"));
    gallery.imgMorphRect.setAttribute(
      "style",
      "height: " + initHeight + "px; width: " + initWidth + "px;",
    );
    gallery.imgMorphRect.setAttribute(
      "transform",
      "translate(" +
        (initWidth / 2) * (1 - initScaleX) +
        " " +
        (initHeight / 2) * (1 - initScaleY) +
        ") scale(" +
        initScaleX +
        "," +
        initScaleY +
        ")",
    );

    // reveal image and start animation
    gallery.imgMorph.classList.add(
      "exp-lightbox__clone-img-wrapper--is-visible",
    );
    gallery.slideshowList.classList.add("slideshow__content--is-hidden");
    gallery.galleryItems[gallery.selectedSlide].classList.add(
      "exp-gallery-item-hidden",
    );

    gallery.imgMorph.addEventListener("transitionend", function cb(event) {
      // reset elements once animation is over
      if (event.propertyName.indexOf("transform") < 0) return;
      gallery.element.classList.remove("exp-lightbox--no-transition");
      gallery.imgMorph.classList.remove(
        "exp-lightbox__clone-img-wrapper--is-visible",
      );
      gallery.slideshowList.classList.remove("slideshow__content--is-hidden");
      gallery.imgMorph.removeAttribute("style");
      gallery.imgMorphRect.removeAttribute("style");
      gallery.imgMorphRect.removeAttribute("transform");
      gallery.imgMorphImg.removeAttribute("href");
      gallery.imgMorphImg.removeAttribute("xlink:href");
      gallery.galleryItems[gallery.selectedSlide].classList.remove(
        "exp-gallery-item-hidden",
      );
      gallery.imgMorph.removeEventListener("transitionend", cb);
    });

    // trigger expanding/closing animation
    gallery.imgMorph.style.transform =
      "translateX(" +
      finTranslateX +
      "px) translateY(" +
      finTranslateY +
      "px) scale(" +
      scale +
      ")";
    animateRectScale(
      gallery.imgMorphRect,
      initScaleX,
      initScaleY,
      finScaleX,
      finScaleY,
      initWidth,
      initHeight,
    );
  }

  function animateRectScale(
    rect,
    scaleX,
    scaleY,
    finScaleX,
    finScaleY,
    width,
    height,
  ) {
    var currentTime = null,
      duration =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--exp-gallery-animation-duration",
          ),
        ) * 1000 || 300;

    var animateScale = function (timestamp) {
      if (!currentTime) currentTime = timestamp;
      var progress = timestamp - currentTime;
      if (progress > duration) progress = duration;

      var valX = easeOutQuad(progress, scaleX, finScaleX - scaleX, duration),
        valY = easeOutQuad(progress, scaleY, finScaleY - scaleY, duration);

      rect.setAttribute(
        "transform",
        "translate(" +
          (width / 2) * (1 - valX) +
          " " +
          (height / 2) * (1 - valY) +
          ") scale(" +
          valX +
          "," +
          valY +
          ")",
      );
      if (progress < duration) {
        window.requestAnimationFrame(animateScale);
      }
    };

    function easeOutQuad(t, b, c, d) {
      t /= d;
      return -c * t * (t - 2) + b;
    }

    window.requestAnimationFrame(animateScale);
  }

  function keyboardNavigateLightbox(gallery, direction) {
    if (!gallery.element.classList.contains("modal--is-visible")) return;
    if (
      !document.activeElement.closest(".js-exp-lightbox__body") &&
      document.activeElement.closest(".js-modal")
    )
      return;
    if (!gallery.slideshowObj) return;
    direction == "next"
      ? gallery.slideshowObj.showNext()
      : gallery.slideshowObj.showPrev();
  }

  function triggerMenuEvent(gallery) {
    if (gallery.menuBar.length < 1) return;
    var event = new CustomEvent("update-menu", {
      detail: {
        index: gallery.selectedSlide,
        item: gallery.slides[gallery.selectedSlide],
      },
    });
    gallery.menuBar[0].dispatchEvent(event);
  }

  function isVisible(element) {
    return (
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  }

  window.ExpGallery = ExpGallery;

  // init ExpGallery objects
  var expGalleries = document.getElementsByClassName("js-exp-lightbox"),
    animationSupported =
      window.requestAnimationFrame &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (expGalleries.length > 0) {
    var expGalleriesArray = [];
    for (var i = 0; i < expGalleries.length; i++) {
      (function (i) {
        expGalleriesArray.push(new ExpGallery(expGalleries[i]));
      })(i);

      // Lightbox gallery navigation with keyboard
      window.addEventListener("keydown", function (event) {
        if (
          (event.keyCode && event.keyCode == 39) ||
          (event.key && event.key.toLowerCase() == "arrowright")
        ) {
          updateLightbox("next");
        } else if (
          (event.keyCode && event.keyCode == 37) ||
          (event.key && event.key.toLowerCase() == "arrowleft")
        ) {
          updateLightbox("prev");
        }
      });

      function updateLightbox(direction) {
        for (var i = 0; i < expGalleriesArray.length; i++) {
          (function (i) {
            keyboardNavigateLightbox(expGalleriesArray[i], direction);
          })(i);
        }
      }
    }
  }
})();
