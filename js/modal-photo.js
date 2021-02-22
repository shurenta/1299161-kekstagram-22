import './photo-preview.js';
import {photos} from './photo-preview.js';
import {isEscEvent} from './util.js';

//ищет id элемента по которому кликнули
const getPhoto = (evt) => {
  const id = evt.target.dataset.id;
  return photos.find(img => img.id === Number(id));
}


//подставляет фото и описание
const renderBigPhoto = (photo) => {
  const bigImgContainer = document.querySelector('.big-picture__img');
  const bigImg = bigImgContainer.querySelector('img');
  bigImg.src = photo.url;
  //подстовляет описание фото
  const descriptionBigPhoto = document.querySelector('.social__caption');
  descriptionBigPhoto.textContent = photo.description;
}


//подставляет данные в список коментариев
const commentsList = document.querySelector('.social__comments');
const renderDataCommentsBigPhoto = (photo) => {
  const commentsArray = photo.comments;
  const templateCommentsItem = document.querySelector('#comment').content;
  const similarFragmentComment = document.createDocumentFragment();
  commentsArray.forEach(({avatar, message, name}) => {
    const elementComment = templateCommentsItem.cloneNode(true);
    const templateAvatarComment = elementComment.querySelector('.social__picture');
    templateAvatarComment.src = avatar;
    templateAvatarComment.alt = name;
    const templateTextComment = elementComment.querySelector('.social__text');
    templateTextComment.textContent = message;
    similarFragmentComment.appendChild(elementComment);
  });
  commentsList.appendChild(similarFragmentComment);
}


//подставляет колличество коментариев в попап
const renderQuantityCommentsBigPhoto = (photo) => {
  const modalPhoto = document.querySelector('.big-picture');
  const commentsBigPhoto = modalPhoto.querySelector('.comments-count');
  const commentsArray = photo.comments;
  commentsBigPhoto.textContent = commentsArray.length;
}


//подставляет колличество лайков в попап
const renderQuantityLikesBigPhoto = (evt) => {
  const thisObjekt = evt.target;
  const miniPhotoInfo = thisObjekt.nextElementSibling;
  const miniPhotoLikes = miniPhotoInfo.querySelector('.picture__likes');
  const bigPhotoLikes = document.querySelector('.likes-count');
  bigPhotoLikes.textContent = miniPhotoLikes.textContent;
}


//Закрытие окна клавишей Esc
const onPopupEscKeydown = (evt) => {
  const modalPhoto = document.querySelector('.big-picture');
  const body = document.querySelector('body');
  if (isEscEvent(evt)) {
    modalPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
    clearDataComments();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
}



//открывает модольное окно
const openModalPhoto = (evt) => {
  const photo = getPhoto(evt);
  renderBigPhoto(photo);
  const modalPhoto = document.querySelector('.big-picture');
  const commentCount = modalPhoto.querySelector('.social__comment-count');
  const commentLoader = modalPhoto.querySelector('.comments-loader');
  const body = document.querySelector('body');
  modalPhoto.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');
  renderQuantityLikesBigPhoto(evt);
  renderQuantityCommentsBigPhoto(photo);
  renderDataCommentsBigPhoto(photo);
  document.addEventListener('keydown', onPopupEscKeydown);
}


//очищает данные коментариев после закртия поапа
const clearDataComments = () => {
  commentsList.innerHTML = '';
}


// закрываем окно
const closeModalPhoto = () => {
  const body = document.querySelector('body');
  const modalPhoto = document.querySelector('.big-picture');
  modalPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  clearDataComments();
}

const onContainerMiniPhotos = document.querySelector('.pictures');

onContainerMiniPhotos.addEventListener('click', (evt) => {
  if (evt.target.className === 'picture__img') {
    openModalPhoto(evt);
  }
});

const onButtonCloseModal = document.querySelector('.big-picture__cancel');
onButtonCloseModal.addEventListener('click', closeModalPhoto);
