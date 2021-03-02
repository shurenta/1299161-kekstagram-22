import {fillPhotos} from './photo-preview.js';


const DeleteMiniPhoto = () => {
  const miniPhoto = document.querySelectorAll('.picture');
  for (let i = 0; i < miniPhoto.length; i++) {
    miniPhoto[i].parentNode.removeChild(miniPhoto[i]);
  }
}

const initFilters = (photos) => {
  const filterRandom = document.querySelector('#filter-random');
  const filterDefault = document.querySelector('#filter-default');
  const filterDiscussed = document.querySelector('#filter-discussed');


  const getRandomPhoto = () => {
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    const randomPhoto = photos.sort(() => {
      return 0.5 - Math.random();
    });
    DeleteMiniPhoto();
    fillPhotos(randomPhoto.slice(photos,10));
    // _.debounce(() => DeleteMiniPhoto(),RERENDER_DELAY);
  }
  filterRandom.addEventListener('click', getRandomPhoto);


  const getDefaultPhoto = () => {
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.add('img-filters__button--active');
    DeleteMiniPhoto();
    fillPhotos(photos);
  }
  filterDefault.addEventListener('click', getDefaultPhoto);


  const sortCommentsPhoto = () => {
    filterRandom.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    DeleteMiniPhoto();
    photos.sort((a, b) => a.comments < b.comments ? 1 : -1);
    fillPhotos(photos);
  }
  filterDiscussed.addEventListener('click', sortCommentsPhoto);
}

export {initFilters};
