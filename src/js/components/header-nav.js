import { disableScroll, enableScroll } from '../functions/stop-scroll';
import vars from '../_vars';

const burgerActive = () => {
  vars.$headerBurger.classList.toggle('_active');
  if (vars.$headerBurger.classList.contains('_active')) {
    vars.$headerNav.classList.add('_active');
    disableScroll();
  } else {
    vars.$headerNav.classList.remove('_active');
    enableScroll();
  }
}

const menuHide = (e) => {
  if (vars.$headerBurger.classList.contains('_active')) {
    vars.$headerBurger.classList.remove('_active');
    vars.$headerNav.classList.remove('_active');
    if (!e.target.classList.contains('nav__link')) {
      enableScroll();
    }
  }
}

vars.$headerBurger.addEventListener('click', burgerActive);
vars.$headerNav.addEventListener('click', menuHide);

export const headerMenuToggle = () => {
  if (window.innerWidth > 768) {
    if (vars.$resizeFlag == true) {
      vars.$resizeFlag = false;
      vars.$headerBurger.classList.remove('_active');
      vars.$headerNav.classList.remove('_active');
      vars.$headerBurger.removeEventListener('click', burgerActive);
      vars.$headerNav.removeEventListener('click', menuHide);
      if (vars.$body.classList.contains('_disable-scroll')) {
        enableScroll();
      }
    }
  } else if (window.innerWidth <= 768) {
    if (vars.$resizeFlag == false) {
      vars.$resizeFlag = true;
      vars.$headerBurger.addEventListener('click', burgerActive);
      vars.$headerNav.addEventListener('click', menuHide);
    }
  }
}