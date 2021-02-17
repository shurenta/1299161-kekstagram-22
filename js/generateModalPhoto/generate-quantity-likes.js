//подставляет колличество лайков в попап
const generateQuantityLikesBigPhoto = (evt) => {
  const thisObjekt = evt.target;
  const miniPhotoInfo = thisObjekt.nextElementSibling;
  const miniPhotoLikes = miniPhotoInfo.querySelector('.picture__likes');
  const bigPhotoLikes = document.querySelector('.likes-count');
  bigPhotoLikes.textContent = miniPhotoLikes.textContent;
}

export {generateQuantityLikesBigPhoto};
