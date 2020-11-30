import Swiper from '../vendor/swiper.min';
import vars from '../_vars';

export const portfolioSliderInit = () => {
  vars.$dataCat.forEach((item) => {
    item.style.display = 'block';
  });

  vars.$portSliderItem = new Swiper(vars.$portfolioSlider, {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 2,
    grabCursor: true,
    navigation: {
      nextEl: '.portfolio-slider__button-next',
      prevEl: '.portfolio-slider__button-prev',
    },
    pagination: {
      el: '.portfolio__pagination',
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

export const portfolioSliderDestroy = () => {
  if (vars.$portfolioSlider.classList.contains('swiper-container-initialized')) {
    vars.$portSliderItem.destroy();
  }
}
