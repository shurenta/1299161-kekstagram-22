import {generateRandomPhotos} from './generate-data.js';

const photos = generateRandomPhotos();
const containerPhoto = document.querySelector('.pictures');
const templatePreviewPhoto = document.querySelector('#picture').content;
const fragmentSimilarPhoto = document.createDocumentFragment();
photos.forEach(({url, comments, likes, id}) => {
  const elementPhoto = templatePreviewPhoto.cloneNode(true);

  const templateImgPhoto = elementPhoto.querySelector('.picture__img');
  templateImgPhoto.src = url;
  templateImgPhoto.setAttribute('data-id', id);


  const templateCommentsPhoto = elementPhoto.querySelector('.picture__comments');
  templateCommentsPhoto.textContent = comments.length;


  const templateLikesPhoto = elementPhoto.querySelector('.picture__likes');
  templateLikesPhoto.textContent = likes;

  fragmentSimilarPhoto.appendChild(elementPhoto);
});
containerPhoto.appendChild(fragmentSimilarPhoto);
export {photos};


