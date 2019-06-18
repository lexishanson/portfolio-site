let HEADER_HEIGHT = 100;
let HEADER_ELEMENT = document.getElementById('header');
let MENU_OPEN;
particlesJS.load('particles-js', 'assets/particles-config.json');

/* Mobile Menu */
const closeMenu = () => {
  HEADER_ELEMENT.classList.remove('is-open');
  MENU_OPEN = false;
  const hamburgerIcon = document.querySelectorAll('.menu-toggle svg')[0];
  const closeIcon = document.querySelectorAll('.menu-toggle svg')[1];
  closeIcon.style.display = 'none';
  hamburgerIcon.style.display = 'block';
};

const openMenu = () => {
  HEADER_ELEMENT.classList.add('is-open');
  MENU_OPEN = true;
  const hamburgerIcon = document.querySelectorAll('.menu-toggle svg')[0];
  const closeIcon = document.querySelectorAll('.menu-toggle svg')[1];
  closeIcon.style.display = 'block';
  hamburgerIcon.style.display = 'none';
};

const toggleMenu = () => (MENU_OPEN ? closeMenu() : openMenu());

document.getElementById('menu-toggle').addEventListener('click', toggleMenu);

const onResize = () => {
  if (window.innerWidth < 600) {
    HEADER_ELEMENT.classList.add('hamburger');
  } else {
    HEADER_ELEMENT.classList.remove('hamburger');
  }
  if (MENU_OPEN) {
    toggleMenu();
  }
};
onResize();
window.onresize = onResize;

/* SCROLL */
const scrollIt = e => {
  closeMenu();
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: e.offsetTop
  });
};

const addScrollTo = linkAndSection => {
  console.log('linkAndSection', linkAndSection);
  debugger;
  linkAndSection.link.addEventListener('click', () =>
    scrollIt(linkAndSection.section)
  );
};

const sectionsAndLinks = ['welcome', 'projects', 'about', 'contact'].map(
  linkName => ({
    section: document.querySelector(`.${linkName}-section`),
    link: document.querySelector(`.menu-${linkName}-link`)
  })
);
console.log(sectionsAndLinks);
sectionsAndLinks.forEach(addScrollTo);

const hightlightOnScreenLink = () => {
  let closestElementAbove = undefined;
  let lastClosestHeight = undefined;
  sectionsAndLinks.forEach((sectionAndLink, i) => {
    debugger;
    const topOffset =
      sectionAndLink.section.offsetTop - 50 - window.pageYOffset;
    if (i === 0 || (topOffset <= 50 && topOffset >= lastClosestHeight)) {
      lastClosestHeight = topOffset;
      closestElementAbove = sectionAndLink;
    }
    sectionAndLink.link.classList.remove('active-class');
  });
  closestElementAbove.link.classList.add('active-class');
};

const toggleHeaderFixed = () => {
  if (window.innerHeight < window.pageYOffset + HEADER_HEIGHT) {
    HEADER_ELEMENT.classList.add('stuck-to-top');
  } else {
    HEADER_ELEMENT.classList.remove('stuck-to-top');
  }
};

const onScroll = () => {
  toggleHeaderFixed();
  hightlightOnScreenLink();
};
onScroll();
document.addEventListener('scroll', onScroll);
