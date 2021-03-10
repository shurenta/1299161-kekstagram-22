import './photo-preview.js';
import {isEscEvent} from './util.js';

const COMMENTS_FIRST = 0;
const COMMENTS_QUANTITY = 5;

const buttonComments = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const containerMiniPhotos = document.querySelector('.pictures');
const modalPhoto = document.querySelector('.big-picture');
const onButtonCloseModal = document.querySelector('.big-picture__cancel');
const commentsAmount = document.querySelector('.social__amount');
const bigImg = document.querySelector('.big-picture__img img');
const descriptionBigPhoto = document.querySelector('.social__caption');
const commentsBigPhoto = modalPhoto.querySelector('.comments-count');

// генерирует счетки загруженных кометариев
const manageCommentsCount = (comments, currentCommentNumber) => {
  const lastComment = currentCommentNumber >= comments.length
  commentsAmount.textContent = lastComment ? comments.length : currentCommentNumber;

  if (lastComment) {
    buttonComments.classList.add('hidden');
  }
}

const showModal = (photo) => {
  let start = COMMENTS_FIRST;
  let end = COMMENTS_QUANTITY;
  document.querySelector('.likes-count').textContent = photo.likes;
  const loadNextComments = () => {
    const commentsItem = document.querySelector('#comment').content;
    const similarFragmentComment = document.createDocumentFragment();

    photo.comments.slice(start, end).forEach(({avatar, message, name}) => {
      const comment = commentsItem.cloneNode(true);
      const avatarComment = comment.querySelector('.social__picture');
      const textComment = comment.querySelector('.social__text');

      avatarComment.src = avatar;
      avatarComment.alt = name;
      textComment.textContent = message;

      similarFragmentComment.appendChild(comment);
    });

    commentsList.appendChild(similarFragmentComment);

    manageCommentsCount(photo.comments, end);
  }

  // по клику меняются значения для метода slice
  const onButtonCommentsClick = () => {
    start += COMMENTS_QUANTITY;
    end += COMMENTS_QUANTITY;
    loadNextComments(photo, start, end);
  }

  // закрываем окно
  const closeModalPhoto = () => {
    modalPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', closeModalPhoto);
    buttonComments.removeEventListener('click', onButtonCommentsClick);
    buttonComments.classList.remove('hidden');
    commentsList.innerHTML = '';
  }

  //Закрытие окна клавишей Esc
  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      closeModalPhoto();
    }
  }

  const onPopupCloseClick = () => closeModalPhoto();

  modalPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigImg.src = photo.url;
  descriptionBigPhoto.textContent = photo.description;
  commentsBigPhoto.textContent = photo.comments.length;

  loadNextComments(photo, start, end);

  onButtonCloseModal.addEventListener('click', onPopupCloseClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  buttonComments.addEventListener('click', onButtonCommentsClick);
}

const generateModalPhoto = (photos) => {
  const openModalPhoto = (evt) => {
    const photoId = evt.target.dataset.id;
    const photo = photos.find(img => img.id === Number(photoId));
    showModal(photo)
  }

  containerMiniPhotos.addEventListener('click', (evt) => {
    if (evt.target.className === 'picture__img') {
      openModalPhoto(evt);
    }
  });
}
export {generateModalPhoto};
