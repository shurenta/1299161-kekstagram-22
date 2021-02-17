import {isEscEvent} from '../utils.js';

const onPopupEscKeydown = (evt) => {
  const modalPhoto = document.querySelector('.big-picture');
  const body = document.querySelector('body');
  if (isEscEvent(evt)) {
    modalPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
  }
}

export {onPopupEscKeydown};
