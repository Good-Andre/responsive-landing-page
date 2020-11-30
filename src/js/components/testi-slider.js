import Swiper from '../vendor/swiper.min';
import vars from '../_vars';

const testiSlider = new Swiper(vars.$testiSlider, {
  loop: true,
  slidesPerView: 1,
  grabCursor: true,
  navigation: {
    nextEl: '.testi-slider__button-next',
    prevEl: '.testi-slider__button-prev',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 700,
  pagination: {
		el: '.swiper-pagination',
		clickable: true,
  },
});
