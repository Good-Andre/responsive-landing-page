import vars from '../_vars';
import { enableScroll } from '../functions/stop-scroll';

for (let item of vars.$anchors) {

  item.addEventListener('click', (e) => {
    if (vars.$headerBurger.classList.contains('_active')) {
      enableScroll();
    }
    let hashVal = item.getAttribute('href');
    let topOfElement = document.querySelector(hashVal).offsetTop - 63;

    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: topOfElement,
    });
    history.pushState(null, null, null);
    e.preventDefault();
  });
}
