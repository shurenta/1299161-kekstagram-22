import {generateRandomPhotos} from './random-photos.js';

const photos = generateRandomPhotos();
const containerPhoto = document.querySelector('.pictures');
const templatePreviewPhoto = document.querySelector('#picture').content;
const similarFragmentPhoto = document.createDocumentFragment();
photos.forEach(({url, comments, likes, id}) => {

  const templateImgPhoto = templatePreviewPhoto.querySelector('.picture__img');
  templateImgPhoto.src = url;
  templateImgPhoto.setAttribute('data-id-photo', id);


  const templateCommentsPhoto = templatePreviewPhoto.querySelector('.picture__comments');
  templateCommentsPhoto.textContent = comments.length;


  const templateLikesPhoto = templatePreviewPhoto.querySelector('.picture__likes');
  templateLikesPhoto.textContent = likes;

  const elementPhoto = templatePreviewPhoto.cloneNode(true);
  similarFragmentPhoto.appendChild(elementPhoto);
});
containerPhoto.appendChild(similarFragmentPhoto);
export {containerPhoto};

