const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isExpanded));
        siteNav.classList.toggle("is-open", !isExpanded);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.setAttribute("aria-expanded", "false");
            siteNav.classList.remove("is-open");
        });
    });
}

const initializeCarousel = (carousel) => {
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    const previousButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const autoplayEnabled = carousel.dataset.carouselAutoplay === "true";
    const autoplayDelay = Number(carousel.dataset.carouselDelay || 5000);

    if (slides.length === 0) {
        return;
    }

    let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    let timer = null;
    let pointerStartX = null;
    let suppressClick = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (activeIndex < 0) {
        activeIndex = 0;
    }

    const setActiveSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-pressed", String(isActive));
        });
    };

    const stopRotation = () => {
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
    };

    const startRotation = () => {
        if (!autoplayEnabled || reducedMotion || slides.length < 2) {
            return;
        }

        stopRotation();
        timer = window.setInterval(() => {
            setActiveSlide(activeIndex + 1);
        }, autoplayDelay);
    };

    const showPrevious = () => {
        if (slides.length < 2) {
            return;
        }

        setActiveSlide(activeIndex - 1);
        startRotation();
    };

    const showNext = () => {
        if (slides.length < 2) {
            return;
        }

        setActiveSlide(activeIndex + 1);
        startRotation();
    };

    const resetPointer = () => {
        pointerStartX = null;
    };

    const consumeSuppressClick = () => {
        const wasSuppressed = suppressClick;
        suppressClick = false;
        return wasSuppressed;
    };

    const handlePointerDown = (event) => {
        if (slides.length < 2) {
            return;
        }

        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }

        pointerStartX = event.clientX;
    };

    const handlePointerUp = (event) => {
        if (pointerStartX === null) {
            return;
        }

        const deltaX = event.clientX - pointerStartX;
        resetPointer();

        if (Math.abs(deltaX) < 40) {
            suppressClick = false;
            return;
        }

        suppressClick = true;

        if (deltaX < 0) {
            showNext();
            return;
        }

        showPrevious();
    };

    previousButton?.addEventListener("click", showPrevious);

    nextButton?.addEventListener("click", showNext);

    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            setActiveSlide(dotIndex);
            startRotation();
        });
    });

    carousel.addEventListener("pointerdown", handlePointerDown);
    carousel.addEventListener("pointerup", handlePointerUp);
    carousel.addEventListener("pointercancel", resetPointer);
    carousel.addEventListener("pointerleave", resetPointer);
    carousel.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });

    if (autoplayEnabled) {
        carousel.addEventListener("mouseenter", stopRotation);
        carousel.addEventListener("mouseleave", startRotation);
        carousel.addEventListener("focusin", stopRotation);
        carousel.addEventListener("focusout", startRotation);
    }

    setActiveSlide(activeIndex);
    startRotation();

    carousel._carouselApi = {
        slides,
        setActiveSlide,
        showNext,
        showPrevious,
        getActiveIndex: () => activeIndex,
        consumeSuppressClick
    };
};

document.querySelectorAll("[data-carousel]").forEach(initializeCarousel);

const siteBaseUrl = new URL("/", window.location.origin);
const formsubmitMailboxLocalPart = ["kleine", "klus", "koning"].join("");
const formsubmitMailboxDomain = ["gmail", "com"].join(".");

document.querySelectorAll("form[data-formsubmit-next-path]").forEach((form) => {
    const nextPath = form.dataset.formsubmitNextPath;
    const nextInput = form.querySelector('input[name="_next"]');
    form.action = `https://formsubmit.co/${formsubmitMailboxLocalPart}@${formsubmitMailboxDomain}`;

    if (nextPath && nextInput) {
        const normalizedNextPath = nextPath.replace(/^\/+/, "");
        nextInput.value = new URL(normalizedNextPath, siteBaseUrl).toString();
    }
});

const lightbox = document.querySelector("[data-lightbox]");

if (lightbox) {
    const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
    const lightboxTitle = lightbox.querySelector("[data-lightbox-title]");
    const lightboxCounter = lightbox.querySelector("[data-lightbox-counter]");
    const lightboxClose = lightbox.querySelector("[data-lightbox-close]");
    const lightboxPrevious = lightbox.querySelector("[data-lightbox-prev]");
    const lightboxNext = lightbox.querySelector("[data-lightbox-next]");
    const lightboxStage = lightbox.querySelector("[data-lightbox-stage]");

    let activeCarouselApi = null;
    let activeSlides = [];
    let activeTitle = "";
    let activeIndex = 0;
    let lastFocusedElement = null;
    let lightboxPointerStartX = null;

    const syncLightboxSlide = () => {
        if (!lightboxImage || activeSlides.length === 0) {
            return;
        }

        const currentSlide = activeSlides[activeIndex];
        const currentImage = currentSlide.querySelector("img");

        if (!currentImage) {
            return;
        }

        lightboxImage.src = currentImage.currentSrc || currentImage.src;
        lightboxImage.alt = currentImage.alt;

        if (lightboxTitle) {
            lightboxTitle.textContent = activeTitle;
        }

        if (lightboxCounter) {
            lightboxCounter.textContent = `Foto ${activeIndex + 1} van ${activeSlides.length}`;
        }

        lightboxPrevious?.toggleAttribute("disabled", activeSlides.length < 2);
        lightboxNext?.toggleAttribute("disabled", activeSlides.length < 2);
    };

    const setLightboxSlide = (index) => {
        if (activeSlides.length === 0) {
            return;
        }

        activeIndex = (index + activeSlides.length) % activeSlides.length;
        activeCarouselApi?.setActiveSlide(activeIndex);
        syncLightboxSlide();
    };

    const closeLightbox = () => {
        lightbox.hidden = true;
        lightbox.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
        lightboxPointerStartX = null;
        lightboxImage?.removeAttribute("src");

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    };

    const openLightbox = (carouselElement, slideIndex) => {
        activeCarouselApi = carouselElement._carouselApi || null;
        activeSlides = activeCarouselApi?.slides || [];
        activeTitle = carouselElement.closest(".project-card")?.querySelector(".project-copy h3")?.textContent?.trim() || "Projectfoto";

        if (activeSlides.length === 0) {
            return;
        }

        lastFocusedElement = document.activeElement;
        lightbox.hidden = false;
        lightbox.classList.add("is-open");
        document.body.classList.add("lightbox-open");
        setLightboxSlide(slideIndex);
        lightboxClose?.focus();
    };

    const showPreviousInLightbox = () => {
        setLightboxSlide(activeIndex - 1);
    };

    const showNextInLightbox = () => {
        setLightboxSlide(activeIndex + 1);
    };

    const handleLightboxPointerDown = (event) => {
        if (activeSlides.length < 2) {
            return;
        }

        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }

        lightboxPointerStartX = event.clientX;
    };

    const handleLightboxPointerUp = (event) => {
        if (lightboxPointerStartX === null) {
            return;
        }

        const deltaX = event.clientX - lightboxPointerStartX;
        lightboxPointerStartX = null;

        if (Math.abs(deltaX) < 40) {
            return;
        }

        if (deltaX < 0) {
            showNextInLightbox();
            return;
        }

        showPreviousInLightbox();
    };

    document.querySelectorAll(".project-gallery[data-carousel]").forEach((gallery) => {
        const frame = gallery.querySelector(".project-gallery-frame");
        const projectTitle = gallery.closest(".project-card")?.querySelector(".project-copy h3")?.textContent?.trim() || "projectfoto";

        if (!frame || !gallery._carouselApi) {
            return;
        }

        frame.setAttribute("tabindex", "0");
        frame.setAttribute("role", "button");
        frame.setAttribute("aria-label", `Open grote galerij voor ${projectTitle}`);

        frame.addEventListener("click", (event) => {
            if (gallery._carouselApi.consumeSuppressClick()) {
                return;
            }

            if (event.target.closest("button")) {
                return;
            }

            openLightbox(gallery, gallery._carouselApi.getActiveIndex());
        });

        frame.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            event.preventDefault();
            openLightbox(gallery, gallery._carouselApi.getActiveIndex());
        });
    });

    lightbox.addEventListener("click", (event) => {
        if (!event.target.closest("[data-lightbox-dialog]") || event.target.closest("[data-lightbox-dismiss]")) {
            closeLightbox();
        }
    });

    lightboxStage?.addEventListener("pointerdown", handleLightboxPointerDown);
    lightboxStage?.addEventListener("pointerup", handleLightboxPointerUp);
    lightboxStage?.addEventListener("pointercancel", () => {
        lightboxPointerStartX = null;
    });
    lightboxStage?.addEventListener("pointerleave", () => {
        lightboxPointerStartX = null;
    });
    lightboxStage?.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });

    lightboxClose?.addEventListener("click", closeLightbox);
    lightboxPrevious?.addEventListener("click", showPreviousInLightbox);
    lightboxNext?.addEventListener("click", showNextInLightbox);

    document.addEventListener("keydown", (event) => {
        if (lightbox.hidden) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
            return;
        }

        if (event.key === "ArrowLeft") {
            showPreviousInLightbox();
            return;
        }

        if (event.key === "ArrowRight") {
            showNextInLightbox();
        }
    });
}
