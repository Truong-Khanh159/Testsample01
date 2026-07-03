(function () {
  "use strict";

  const body = document.body;
  const mainNav = document.querySelector(".main-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".main-nav__menu");
  const navActions = document.querySelector(".main-nav__actions");
  const navLinks = Array.from(document.querySelectorAll(".main-nav__link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function closeMobileMenu() {
    if (!mainNav || !menuToggle || !navMenu || !navActions) {
      return;
    }

    mainNav.classList.remove("menu-open");
    navMenu.classList.remove("is-open");
    navActions.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    body.classList.remove("is-menu-open");
  }

  function toggleMobileMenu() {
    if (!mainNav || !menuToggle || !navMenu || !navActions) {
      return;
    }

    const isOpen = mainNav.classList.toggle("menu-open");
    navMenu.classList.toggle("is-open", isOpen);
    navActions.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    body.classList.toggle("is-menu-open", isOpen);
  }

  function getHeaderOffset() {
    const header = document.querySelector(".site-header");
    return header ? header.offsetHeight : 0;
  }

  function scrollToTarget(target) {
    const element = document.querySelector(target);

    if (!element) {
      return;
    }

    const top = element.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  }

  function setActiveLink() {
    const scrollPosition = window.pageYOffset + getHeaderOffset() + 80;
    let currentId = sections[0] ? sections[0].id : "";

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === `#${currentId}`);
    });
  }

  function initNavigation() {
    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMobileMenu);
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (href && href.startsWith("#")) {
          event.preventDefault();
          closeMobileMenu();
          scrollToTarget(href);
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        closeMobileMenu();
      }
    });

    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();
  }

  function initSmoothAnchors() {
    const anchors = document.querySelectorAll('a[href^="#"]:not(.main-nav__link)');

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");

        if (!href || href === "#") {
          return;
        }

        const target = document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();
        closeMobileMenu();
        scrollToTarget(href);
      });
    });
  }

  function initPropertyTabs() {
    const tabs = Array.from(document.querySelectorAll(".property-tabs__button"));

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((item) => {
          item.classList.remove("is-active");
          item.setAttribute("aria-selected", "false");
        });

        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
      });
    });
  }

  function initSimpleButtons(selector) {
    const buttons = Array.from(document.querySelectorAll(selector));

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
      });
    });
  }

  function initTestimonialSlider() {
    const quote = document.querySelector(".testimonial__quote blockquote p");
    const name = document.querySelector(".testimonial__quote h3");
    const role = document.querySelector(".testimonial__quote > p:last-child");
    const image = document.querySelector(".testimonial__media img");
    const prev = document.querySelector(".testimonial__arrow--prev");
    const next = document.querySelector(".testimonial__arrow--next");

    if (!quote || !name || !role || !image || !prev || !next) {
      return;
    }

    const testimonials = [
      {
        quote: "We make sure you have a fine distance with the sickness. We make you never lose hope. We make sure you have with the sickness.",
        name: "Yunus Seyhan",
        role: "Postgraduate Student",
        image: "images/customer.jpg",
        alt: "Customer Yunus Seyhan"
      },
      {
        quote: "The property team made every step clear and helped us compare homes without pressure. The process felt simple from search to closing.",
        name: "Mila Johnson",
        role: "Home Buyer",
        image: "images/customer-2.jpg",
        alt: "Customer Mila Johnson"
      },
      {
        quote: "Their listings were accurate, the communication was fast, and the guidance helped us choose the right apartment for our budget.",
        name: "Arman Lee",
        role: "Property Investor",
        image: "images/customer-3.jpg",
        alt: "Customer Arman Lee"
      }
    ];

    let activeIndex = 0;

    function renderTestimonial(index) {
      const item = testimonials[index];

      quote.textContent = item.quote;
      name.textContent = item.name;
      role.textContent = item.role;
      image.setAttribute("src", item.image);
      image.setAttribute("alt", item.alt);
    }

    prev.addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(activeIndex);
    });

    next.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % testimonials.length;
      renderTestimonial(activeIndex);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initSmoothAnchors();
    initPropertyTabs();
    initSimpleButtons(".hero__slide");
    initSimpleButtons(".about__slide");
    initTestimonialSlider();
  });
})();
