import Swiper from '../vendor/swiper.min';
import vars from '../_vars';

export const priceSliderInit = () => {
  vars.$priceSliderItem = new Swiper(vars.$priceSlider, {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 40,
    pagination: {
      el: '.price__pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 400,
    breakpoints: {
      627: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  });
}

export const priceSliderDestroy = () => {
  if (vars.$priceSlider.classList.contains('swiper-container-initialized')) {
    vars.$priceSliderItem.destroy();
  }
}
