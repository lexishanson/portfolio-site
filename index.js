const DEBOUNCE_TIME = 3000;
const MOBILE_BREAKPOINT = 767;
const NAV_ELEMENT = document.getElementById('nav');
const MENU_TOGGLE = document.querySelector('.menu-toggle');
let NAV_HEIGHT = 100;
let IS_MOBILE = false;
let navOffset = 48;

particlesJS.load('particles-js', 'assets/particles-config.json');

/* Mobile Menu */
const closeMenu = () => {
  // NAV_ELEMENT.classList.remove('is-open');
  NAV_ELEMENT.setAttribute('aria-expanded', false);
  // MENU_OPEN = false;
  //when menu-toggle data-src is false, show hamburger

  const [menuIcon, closeIcon] = document.querySelectorAll('.menu-toggle svg');
  closeIcon.style.display = 'none';
  menuIcon.style.display = 'inline';
};

const openMenu = () => {
  // NAV_ELEMENT.classList.add('is-open');
  NAV_ELEMENT.setAttribute('aria-expanded', true);
  // MENU_OPEN = true
  const [menuIcon, closeIcon] = document.querySelectorAll('.menu-toggle svg');
  // const [, closeIcon] = document.querySelectorAll('.menu-toggle svg');
  closeIcon.style.display = 'inline';
  menuIcon.style.display = 'none';
};

const toggleMenu = () => {
  NAV_ELEMENT.getAttribute('aria-expanded') === 'true'
    ? closeMenu()
    : openMenu();
};

document.getElementById('menu-toggle').addEventListener('click', toggleMenu);

const onResize = () => {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    NAV_ELEMENT.classList.add('nav--sticky');
    IS_MOBILE = true;
  } else {
    NAV_ELEMENT.classList.remove('nav--sticky');
    IS_MOBILE = false;
  }
  // navOffset = getComputedStyle(NAV_ELEMENT).lineHeight;
  // console.log(navOffset);
  // if (NAV_ELEMENT.dataset.isOpen === 'true') {
  //   toggleMenu();
  // }
};
// TODO: turn into IIFE?
onResize();
window.onresize = onResize;

/* SCROLL */
const scrollTop = top => {
  closeMenu();
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top
  });
};

const scrollToSection = linkAndSection => {
  linkAndSection.link.addEventListener('click', () => {
    const offsetY = linkAndSection.section.offsetTop - navOffset;
    scrollTop(offsetY);
  });
};

const sectionsAndLinks = ['welcome', 'projects', 'about', 'contact'].map(
  linkName => ({
    section: document.querySelector(`.${linkName}-section`),
    // link: document.querySelector(`.menu-${linkName}-link`)
    link: document.querySelector(`.nav-page-link__${linkName}`)
  })
);
sectionsAndLinks.forEach(scrollToSection);

const hightlightOnScreenLink = () => {
  let closestElementAbove = undefined;
  let lastClosestHeight = undefined;
  sectionsAndLinks.forEach((sectionAndLink, i) => {
    const topOffset = sectionAndLink.section.offsetTop - window.pageYOffset;
    if (sectionAndLink.section.classList.contains('about-section')) {
    }

    if (i === 0 || (topOffset <= navOffset && topOffset >= lastClosestHeight)) {
      lastClosestHeight = topOffset;
      closestElementAbove = sectionAndLink;
    }
    sectionAndLink.link.classList.remove('active');
  });
  closestElementAbove.link.classList.add('active');
};

const toggleNavFixed = () => {
  if (IS_MOBILE || window.innerHeight < window.pageYOffset + NAV_HEIGHT) {
    NAV_ELEMENT.classList.add('nav--sticky');
    // navOffset = getComputedStyle(NAV_ELEMENT).lineHeight;
    navOffset = document.querySelector('.nav--sticky').offsetHeight;
  } else {
    NAV_ELEMENT.classList.remove('nav--sticky');
  }
};

const onScroll = () => {
  //TODO: debounce/throttle fn here...
  // TODO: don't call highlight every time for every element

  // check navShouldBeFixed(offset = 50);
  // if yes, make it sticky
  // console.log('getting called');
  // with each scroll...
  // check the offsetTop of each sectionAndLink.section...
  // whichever is the smallest (and still above zero)
  toggleNavFixed();
  // console.log('foo');
  hightlightOnScreenLink();
};

// const debounce = (fn, debounceTime) => {
//   // console.log(debounceTime);
//   return setTimeout(fn, debounceTime);
// };

const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = setTimeout(() => (inThrottle = false), limit);
    }
  };
};
const debouncedHandleScroll = () => throttle(onScroll, DEBOUNCE_TIME);

onScroll();

document.addEventListener('scroll', onScroll);
