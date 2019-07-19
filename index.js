// const DEBOUNCE_TIME = 300;
const MOBILE_BREAKPOINT = 767;
const NAV_ELEMENT = document.getElementById('nav');
const MENU_TOGGLE = document.querySelector('.menu-toggle');
let NAV_HEIGHT = 100;
let IS_MOBILE = false;
let navOffset = 48;

particlesJS.load('particles-js', 'assets/particles-config.json');

/* Mobile Menu */
const closeMenu = () => {
  const [menuIcon, closeIcon] = document.querySelectorAll('.menu-toggle svg');
  NAV_ELEMENT.setAttribute('aria-expanded', false);
  closeIcon.style.display = 'none';
  menuIcon.style.display = 'inline';
};

const openMenu = () => {
  const [menuIcon, closeIcon] = document.querySelectorAll('.menu-toggle svg');
  NAV_ELEMENT.setAttribute('aria-expanded', true);
  closeIcon.style.display = 'inline';
  menuIcon.style.display = 'none';
};

const toggleMenu = () => {
  NAV_ELEMENT.getAttribute('aria-expanded') === 'true'
    ? closeMenu()
    : openMenu();
};

/* Scroll */
const scrollTop = top => {
  if (NAV_ELEMENT.getAttribute('aria-expanded') === 'true') closeMenu();
  console.log(top);
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top
  });
};

const scrollToSection = linkAndSection => {
  linkAndSection.link.addEventListener('click', () => {
    const offsetY = linkAndSection.section.offsetTop - navOffset;
    console.log(
      'section offsettop',
      linkAndSection.section.offsetTop,
      'navoffset',
      navOffset,
      'offsety',
      offsetY
    );
    scrollTop(offsetY);
  });
};

const sectionsAndLinks = ['welcome', 'projects', 'about', 'contact'].map(
  linkName => ({
    section: document.querySelector(`.${linkName}-section`),
    link: document.querySelector(`.nav-page-link__${linkName}`)
  })
);
sectionsAndLinks.forEach(scrollToSection);

const hightlightOnScreenLink = () => {
  let nextHighlightedEl = undefined;
  let lastClosestHeight = undefined;
  sectionsAndLinks.forEach((sectionAndLink, i) => {
    const topOffset = sectionAndLink.section.offsetTop - window.pageYOffset;
    if (i === 0 || (topOffset <= navOffset && topOffset >= lastClosestHeight)) {
      lastClosestHeight = topOffset;
      nextHighlightedEl = sectionAndLink;
    }
  });

  if (!nextHighlightedEl.link.classList.contains('active')) {
    sectionsAndLinks.forEach(item => {
      if (item.link.classList.contains('active')) {
        item.link.classList.remove('active');
      }
      nextHighlightedEl.link.classList.add('active');
    });
  }
};

/* Sticky Nav */
const toggleNavFixed = () => {
  if (IS_MOBILE || window.innerHeight < window.pageYOffset + NAV_HEIGHT) {
    NAV_ELEMENT.classList.add('nav--sticky');
    // navOffset = getComputedStyle(NAV_ELEMENT).lineHeight;
    navOffset = document.querySelector('.nav--sticky').offsetHeight;
  } else {
    NAV_ELEMENT.classList.remove('nav--sticky');
  }
};

/* Event Handlers */
const onResize = () => {
  console.log('resized');
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    NAV_ELEMENT.classList.add('nav--sticky');
    IS_MOBILE = true;
  } else {
    console.log('yee');
    NAV_ELEMENT.classList.remove('nav--sticky');
    IS_MOBILE = false;
  }
};

const onLoad = () => {
  onResize();
  onScroll();
};

const onScroll = () => {
  toggleNavFixed();
  hightlightOnScreenLink();
};

// const debounce = (func, delay) => {
//   let inDebounce;
//   return function() {
//     const context = this;
//     const args = arguments;
//     clearTimeout(inDebounce);
//     inDebounce = setTimeout(() => func.apply(context, args), delay);
//   };
// };

// const throttle = (func, limit) => {
//   let inThrottle;
//   return (...args) => {
//     if (!inThrottle) {
//       func(...args);
//       inThrottle = setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// };

/* Event Listeners */
document.addEventListener('DOMContentLoaded', onLoad);
document.addEventListener('scroll', onScroll);
window.addEventListener('resize', onResize());
MENU_TOGGLE.addEventListener('click', toggleMenu);
