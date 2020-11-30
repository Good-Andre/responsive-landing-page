import Swiper from '../vendor/swiper.min';
import vars from '../_vars';

const bannerSlider = new Swiper(vars.$blogSlider, {
  loop: true,
  spaceBetween: 30,
  grabCursor: true,
  navigation: {
    nextEl: '.swiper-button-next-unique',
    prevEl: '.swiper-button-prev-unique',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 400,
  breakpoints: {
    1222: {
      slidesPerView: 4,
    },
    930: {
      slidesPerView: 3,
    },
    630: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
});
