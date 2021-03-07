import './photo-preview.js';
import {isEscEvent} from './util.js';
const buttonShowKomments = document.querySelector('.comments-loader');

// генерирует счетки загруженных кометариев
const  generateSocialAmount = () => {
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
    const body = document.querySelector('body');
    modalPhoto.classList.remove('hidden');
    body.classList.add('modal-open');
    renderQuantityLikesBigPhoto(evt);
    renderQuantityCommentsBigPhoto(photo);
    renderDataCommentsBigPhoto(photo);
    generateSocialAmount();
    document.addEventListener('keydown', onPopupEscKeydown);
  }
  const onContainerMiniPhotos = document.querySelector('.pictures');
  onContainerMiniPhotos.addEventListener('click', (evt) => {
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
  const commentsArray = photo.comments;
  const templateCommentsItem = document.querySelector('#comment').content;
  const similarFragmentComment = document.createDocumentFragment();
  let startComments = 0;
  let andComments = 5;
  //отрисовка начальных пяти комментов
  const dawnloadComments = () => {
    commentsArray.slice(startComments, andComments).forEach(({avatar, message, name}) => {
      const elementComment = templateCommentsItem.cloneNode(true);
      const templateAvatarComment = elementComment.querySelector('.social__picture');
      templateAvatarComment.src = avatar;
      templateAvatarComment.alt = name;
      const templateTextComment = elementComment.querySelector('.social__text');
      templateTextComment.textContent = message;
      similarFragmentComment.appendChild(elementComment);
    });
    commentsList.appendChild(similarFragmentComment);
    const comments = document.querySelectorAll('.social__comment');
    if (Number(comments.length) === Number(commentsArray.length)) {
      buttonShowKomments.classList.add('hidden');
    }
    generateSocialAmount();
  }
  dawnloadComments();
  // по клику меняются значения для метода slice
  const showComments = () => {
    startComments =  startComments + 5;
    andComments = andComments + 5;
    dawnloadComments();
  }
  buttonShowKomments.addEventListener('click', showComments);
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



// закрываем окно
const closeModalPhoto = () => {
  const body = document.querySelector('body');
  const modalPhoto = document.querySelector('.big-picture');
  modalPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  buttonShowKomments.classList.remove('hidden');
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
