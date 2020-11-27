import vars from '../_vars';

export const disableScroll = () => {
  let paddingOffset = window.innerWidth - vars.$body.offsetWidth + 'px';
  vars.$body.style.paddingRight = paddingOffset;
  vars.$header.style.paddingRight = paddingOffset;
	let pagePosition = window.scrollY;
	vars.$body.classList.add('_disable-scroll');
	vars.$body.dataset.position = pagePosition;
  vars.$body.style.top = -pagePosition + 'px';
  vars.$header.style.top = window.scrollY;
}

export const enableScroll = () => {
	let pagePosition = parseInt(vars.$body.dataset.position, 10);
	vars.$body.style.top = 'auto';
  vars.$body.classList.remove('_disable-scroll');
  vars.$body.style.paddingRight = '0px';
	window.scroll({top: pagePosition, left: 0});
  vars.$body.removeAttribute('data-position');
  vars.$header.style.paddingRight = '0px';
}
