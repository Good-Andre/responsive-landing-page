// import Swiper from 'swiper';
import Swiper from '../vendor/swiper.min';
import vars from '../_vars';

const testiSlider = new Swiper(vars.$testiSlider, {
  loop: true,
  // containerModifierClass: 'blog__slider-',
  slidesPerView: 1,
  // spaceBetween: 30,
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
  // grabCursor: true,
});

// let swiper = new Swiper('blog__slider', {
//   slidesPerView: 4,
//   centeredSlides: true,
//   spaceBetween: 30,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });
