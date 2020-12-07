import Swiper from '../vendor/swiper.min';
import vars from '../_vars';

export const whatSliderInit = () => {

  vars.whatSliderItem = new Swiper(vars.$whatSlider, {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 15,
    grabCursor: true,
    pagination: {
      el: '.what__pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 400,
    breakpoints: {
      630: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  });
}

export const whatSliderDestroy = () => {
  if (vars.$whatSlider.classList.contains('swiper-container-initialized')) {
    vars.whatSliderItem.destroy();
  }
}
