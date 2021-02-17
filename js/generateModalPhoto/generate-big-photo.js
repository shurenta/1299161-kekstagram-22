import {generateRandomPhotos} from '../random-photos.js';


// подставляет в попап  описание фото ,и само фото c превью по которому кликнули.
const generateBigPhoto = (evt) => {
//ищет id элемента по которому кликнули
  const thisObjekt = evt.target;
  const photosRandom = generateRandomPhotos();
  const objektId = thisObjekt.getAttribute('data-id-photo');
  const elementArrayPhoto = photosRandom.find((img) => {
    return img.id == objektId;
  });
  //подставляет фото
  const bigImgContainer = document.querySelector('.big-picture__img');
  const bigImg = bigImgContainer.querySelector('img');
  bigImg.src = elementArrayPhoto.url;
  //подстовляет описание фото
  const descriptionBigPhoto = document.querySelector('.social__caption');
  descriptionBigPhoto.textContent = elementArrayPhoto.description;
}


export {generateBigPhoto};
