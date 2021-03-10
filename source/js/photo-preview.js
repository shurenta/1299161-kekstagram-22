const fillPhotos = (photos) => {
  const containerPhoto = document.querySelector('.pictures');
  const previewPhoto = document.querySelector('#picture').content;
  const similarPhoto = document.createDocumentFragment();
  photos.forEach(({url, comments, likes, id}) => {
    const photo = previewPhoto.cloneNode(true);

    const imgPhoto = photo.querySelector('.picture__img');
    imgPhoto.src = url;
    imgPhoto.dataset.id = id;


    const commentsPhoto = photo.querySelector('.picture__comments');
    commentsPhoto.textContent = comments.length;


    const likesPhoto = photo.querySelector('.picture__likes');
    likesPhoto.textContent = likes;

    similarPhoto.appendChild(photo);
  });
  containerPhoto.appendChild(similarPhoto);
}
export {fillPhotos};
