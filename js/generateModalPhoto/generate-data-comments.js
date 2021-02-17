import {generateRandomPhotos} from '../random-photos.js';


//подставлят данные коментариев
const generateDataCommentsBigPhoto = (evt) => {
  //ищет id элемента по которому кликнули
  const thisObjekt = evt.target;
  const objektId = thisObjekt.getAttribute('data-id-photo');
  const photosRandom = generateRandomPhotos();
  const elementArrayPhoto = photosRandom.find((img) => {
    return img.id == objektId;
  });
  //подставляет данные в список коментариев
  const commentsArray = elementArrayPhoto.comments;
  const listCommentsBigPhoto = document.querySelector('.social__comments');
  const avatarAuthorComments = listCommentsBigPhoto.querySelectorAll('.social__picture');
  const textCommentBigPhoto = listCommentsBigPhoto.querySelectorAll('.social__text');
  const itemsCommentsBigPhoto = listCommentsBigPhoto.querySelectorAll('.social__comment');
  for (let i = 0; i < itemsCommentsBigPhoto.length; i++) {
    avatarAuthorComments[i].src = commentsArray[i].avatar;
    avatarAuthorComments[i].alt = commentsArray[i].name;
    textCommentBigPhoto[i].textContent = commentsArray[i].message;
  }
}
export {generateDataCommentsBigPhoto};
