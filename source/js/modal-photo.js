import './photo-preview.js';
import {isEscEvent} from './util.js';
const buttonComments = document.querySelector('.comments-loader');
const COMMENTS_FIRST = 0;
const COMMENTS_LAST = 5;
const COMMETNS_QUANTITY = 5;
// генерирует счетки загруженных кометариев
const generateSocialAmount = () => {
  const comments = document.querySelectorAll('.social__comment');
  const commentsAmount = document.querySelector('.social__amount');
  commentsAmount.textContent = comments.length;
}


const generateModalPhoto = (photos) => {
  //ищет id элемента по которому кликнули
  const getPhoto = (evt) => {
    const id = evt.target.dataset.id;
    return photos.find(img => img.id === Number(id));
  }


  //открывает модольное окно
  const openModalPhoto = (evt) => {
    const photo = getPhoto(evt);
    renderBigPhoto(photo);
    const modalPhoto = document.querySelector('.big-picture');
    modalPhoto.classList.remove('hidden');
    document.body.classList.add('modal-open');
    renderQuantityLikesBigPhoto(evt);
    renderQuantityCommentsBigPhoto(photo);
    renderDataCommentsBigPhoto(photo);
    generateSocialAmount();
    document.addEventListener('keydown', onPopupEscKeydown);
  }
  const containerMiniPhotos = document.querySelector('.pictures');
  containerMiniPhotos.addEventListener('click', (evt) => {
    if (evt.target.className === 'picture__img') {
      openModalPhoto(evt);
    }
  });
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
  const commentsData = photo.comments;
  const commentsItem = document.querySelector('#comment').content;
  const similarFragmentComment = document.createDocumentFragment();
  let startComments = COMMENTS_FIRST;
  let endComments = COMMENTS_LAST;
  //отрисовка начальных пяти комментов
  const downloadComments = () => {
    commentsData.slice(startComments, endComments).forEach(({avatar, message, name}) => {
      const comment = commentsItem.cloneNode(true);
      const avatarComment = comment.querySelector('.social__picture');
      avatarComment.src = avatar;
      avatarComment.alt = name;
      const textComment = comment.querySelector('.social__text');
      textComment.textContent = message;
      similarFragmentComment.appendChild(comment);
    });
    commentsList.appendChild(similarFragmentComment);
    const comments = document.querySelectorAll('.social__comment');
    if (comments.length === commentsData.length) {
      buttonComments.classList.add('hidden');
    }
    generateSocialAmount();
  }
  downloadComments();
  // по клику меняются значения для метода slice
  const onButtonCommentsClick = () => {
    startComments =  startComments + COMMETNS_QUANTITY;
    endComments = endComments + COMMETNS_QUANTITY;
    downloadComments();
  }
  buttonComments.addEventListener('click', onButtonCommentsClick);
}



//подставляет колличество коментариев в попап
const renderQuantityCommentsBigPhoto = (photo) => {
  const modalPhoto = document.querySelector('.big-picture');
  const commentsBigPhoto = modalPhoto.querySelector('.comments-count');
  const commentsData = photo.comments;
  commentsBigPhoto.textContent = commentsData.length;
}


//подставляет колличество лайков в попап
const renderQuantityLikesBigPhoto = (evt) => {
  const thisObjekt = evt.target;
  const miniPhotoInfo = thisObjekt.nextElementSibling;
  const miniPhotoLikes = miniPhotoInfo.querySelector('.picture__likes');
  const bigPhotoLikes = document.querySelector('.likes-count');
  bigPhotoLikes.textContent = miniPhotoLikes.textContent;
}



// закрываем окно
const closeModalPhoto = () => {
  const modalPhoto = document.querySelector('.big-picture');
  modalPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  buttonComments.classList.remove('hidden');
  clearDataComments();
}


//Закрытие окна клавишей Esc
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeModalPhoto();
  }
}

//очищает данные коментариев после закртия поапа
const clearDataComments = () => {
  commentsList.innerHTML = '';
}

const onButtonCloseModal = document.querySelector('.big-picture__cancel');
onButtonCloseModal.addEventListener('click', closeModalPhoto);
export {generateModalPhoto};
