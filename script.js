const header = document.querySelector(".header");
const revealItems = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const hero = document.querySelector(".hero");
const bgVideo = document.querySelector(".site-bg-video video");
const heroGrid = document.querySelector(".hero-grid");
const introScreen = document.getElementById("intro-screen");
const introCount = document.getElementById("intro-count");
const introBlack1 = document.getElementById("intro-black-1");
const introLogoStage = document.getElementById("intro-logo-stage");
const introBlack2 = document.getElementById("intro-black-2");
const introNumber = document.getElementById("intro-number");
const pageContent = document.getElementById("page-content");

function showStage(stage) {
  [introCount, introBlack1, introLogoStage, introBlack2].forEach((item) => {
    item.classList.remove("active");
  });
  stage.classList.add("active");
}

function revealOnScroll() {
  revealItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.9;

    if (top < trigger) {
      item.classList.add("active");
    }
  });
}

function cinematicParallax() {
  if (!hero || !bgVideo || !heroGrid) return;

  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  if (scrollY <= heroHeight) {
    const bgMove = scrollY * 0.05;
    const contentMove = scrollY * 0.1;
    const contentOpacity = 1 - scrollY / (heroHeight * 0.95);

    bgVideo.style.transform =
      `translate(-50%, calc(-50% + ${bgMove}px)) scale(1.04)`;

    heroGrid.style.transform = `translateY(${contentMove}px)`;
    heroGrid.style.opacity = Math.max(contentOpacity, 0);
  } else {
    heroGrid.style.opacity = "0";
  }
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  revealOnScroll();
  cinematicParallax();
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("load", () => {
  const sequence = [
    { value: "3", duration: 700 },
    { value: "2", duration: 700 },
    { value: "1", duration: 700 }
  ];

  let totalDelay = 0;

  sequence.forEach((step) => {
    setTimeout(() => {
      showStage(introCount);
      introNumber.textContent = step.value;
    }, totalDelay);

    totalDelay += step.duration;
  });

  setTimeout(() => {
    showStage(introBlack1);
  }, totalDelay);

  totalDelay += 350;

  setTimeout(() => {
    showStage(introLogoStage);
  }, totalDelay);

  totalDelay += 950;

  setTimeout(() => {
    showStage(introBlack2);
  }, totalDelay);

  totalDelay += 350;

  setTimeout(() => {
    introScreen.classList.add("hidden");
    pageContent.classList.remove("is-hidden");
    revealOnScroll();
    cinematicParallax();
  }, totalDelay);
});