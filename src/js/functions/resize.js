import vars from '../_vars';
import {
  portfolioSliderInit,
  portfolioSliderDestroy,
} from '../components/portfolio-slider';
import { whatSliderInit, whatSliderDestroy } from '../components/what-slider';
import {
  priceSliderInit,
  priceSliderDestroy,
} from '../components/price-slider';
import { headerMenuToggle } from '../components/header-nav';

export const resizeContent = (
  selector,
  mobileWidth = 576,
  isPlugin,
  desktopAction = null,
  mobileAction = null
) => {
  if (!isPlugin) {
    if (window.innerWidth > mobileWidth) {
      desktopAction();
    } else {
      mobileAction();
    }
  } else {
    if (
      window.innerWidth <= mobileWidth &&
      selector.dataset.pluginActivated == 'false'
    ) {
      mobileAction();
      selector.dataset.pluginActivated = 'true';
    }
    if (window.innerWidth > mobileWidth) {
      desktopAction();
      selector.dataset.pluginActivated = 'false';
    }
  }
};

// filterDesktopInit();

// init slider mibile if width <= 768

resizeContent(
  vars.$portfolioSlider,
  768,
  false,
  portfolioSliderDestroy,
  portfolioSliderInit
);

resizeContent(
  vars.$priceSlider,
  768,
  false,
  priceSliderDestroy,
  priceSliderInit
);

resizeContent(vars.$whatSlider, 768, false, whatSliderDestroy, whatSliderInit);

window.addEventListener('resize', () => {
  resizeContent(
    vars.$portfolioSlider,
    768,
    true,
    portfolioSliderDestroy,
    portfolioSliderInit
  );

  resizeContent(
    vars.$priceSlider,
    768,
    true,
    priceSliderDestroy,
    priceSliderInit
  );

  resizeContent(vars.$whatSlider, 768, true, whatSliderDestroy, whatSliderInit);

  headerMenuToggle();
});
