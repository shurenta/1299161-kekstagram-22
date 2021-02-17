import {onPopupEscKeydown} from './on-popup-esc-keydown.js';

// закрываем окно
const closeModalPhoto = () => {
  const body = document.querySelector('body');
  const modalPhoto = document.querySelector('.big-picture');
  modalPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

export {closeModalPhoto};
