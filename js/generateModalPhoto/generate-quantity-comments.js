import {generateRandomPhotos} from '../random-photos.js';

//подставляет колличество коментариев в попап
const generateQuantityCommentsBigPhoto = (evt) => {
//ищет id элемента по которому кликнули
  const thisObjekt = evt.target;
  const photosRandom = generateRandomPhotos();
  const objektId = thisObjekt.getAttribute('data-id-photo');
  const elementArrayPhoto = photosRandom.find((img) => {
    return img.id == objektId;
  });
  //подставляет колличество коментариев
  const modalPhoto = document.querySelector('.big-picture');
  const commentsBigPhoto = modalPhoto.querySelector('.comments-count');
  const commentsArray = elementArrayPhoto.comments;
  commentsBigPhoto.textContent = commentsArray.length;
}

export {generateQuantityCommentsBigPhoto};
