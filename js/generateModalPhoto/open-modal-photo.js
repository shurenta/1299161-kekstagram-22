import {onPopupEscKeydown} from './on-popup-esc-keydown.js';
import {generateBigPhoto} from './generate-big-photo.js';
import {generateQuantityLikesBigPhoto} from './generate-quantity-likes.js';
import {generateQuantityCommentsBigPhoto} from './generate-quantity-comments.js';
import {generateDataCommentsBigPhoto} from './generate-data-comments.js';

//открывает модольное окно
const openModalPhoto = (evt) => {
  const modalPhoto = document.querySelector('.big-picture');
  const commentCount = modalPhoto.querySelector('.social__comment-count');
  const commentLoader = modalPhoto.querySelector('.comments-loader');
  const body = document.querySelector('body');
  modalPhoto.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');
  generateBigPhoto(evt);
  generateQuantityLikesBigPhoto(evt);
  generateQuantityCommentsBigPhoto(evt);
  generateDataCommentsBigPhoto(evt);
  document.addEventListener('keydown', onPopupEscKeydown);
}
export {openModalPhoto};
