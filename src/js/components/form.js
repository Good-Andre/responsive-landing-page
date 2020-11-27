import vars from '../_vars';

const form = document.querySelector('#footerForm');

function closeModal(e) {
  if(e.target.classList.contains('footer-modal__close') || e.target.classList.contains('_modal-show')) {
    vars.$footerOverlay.classList.remove('_modal-show');
    vars.$footerOverlay.removeEventListener('click', closeModal);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
  vars.$footerOverlay.classList.add('_modal-show');
  vars.$footerOverlay.addEventListener('click', closeModal);
});
