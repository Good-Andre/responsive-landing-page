// import Swiper from 'swiper';
import Swiper from '../vendor/swiper.min';
import vars from '../_vars';

const bannerSlider = new Swiper(vars.$blogSlider, {
  loop: true,
  // containerModifierClass: 'blog__slider-',
  // slidesPerView: 4,
  spaceBetween: 30,
  // grabCursor: true,
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
      // spaceBetween: 30,
    },
    930: {
      slidesPerView: 3,
      // spaceBetween: 100,
    },
    630: {
      slidesPerView: 2,
      // spaceBetween: 50,
    },
    320: {
      slidesPerView: 1,
      // spaceBetween: 100,
    },
  },
});

// function slidesHeihts() {
//   const slider = bannerSlider;
//   const wrapper = bannerSlider.wrapperEl;

//   [].forEach.call(slider.slides, function (slide) {
//     slide.style.height = '';
//   });

//   [].forEach.call(slider.slides, function (slide) {
//     slide.style.height = wrapper.clientHeight + 'px';
//   });
// }

// slidesHeihts();