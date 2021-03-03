/* global _:readonly */
import {fillPhotos} from './photo-preview.js';
const ACTIVE_CLASS = 'img-filters__button--active';

const DeleteMiniPhoto = () => {
  const miniPhoto = document.querySelectorAll('.picture');
  for (let i = 0; i < miniPhoto.length; i++) {
    miniPhoto[i].parentNode.removeChild(miniPhoto[i]);
  }
}

const initFilters = (photos) => {
  const filtersButton = document.querySelectorAll('.img-filters__button')
  const getRandomPhoto = () => {
    const randomPhoto = photos.sort(() => {
      return 0.5 - Math.random();
    });
    DeleteMiniPhoto();
    fillPhotos(randomPhoto.slice(photos,10));
  }


  const getDefaultPhoto = () => {
    DeleteMiniPhoto();
    fillPhotos(photos);
  }


  const sortCommentsPhoto = () => {
    DeleteMiniPhoto();
    photos.sort((a, b) => a.comments < b.comments ? 1 : -1);
    fillPhotos(photos);
  }
  const renderFilteredPhotos = _.debounce((evt) => {
    if (evt.target.id === 'filter-random') {
      getRandomPhoto();
    }

    if (evt.target.id === 'filter-discussed') {
      sortCommentsPhoto();
    }

    if (evt.target.id === 'filter-default') {
      getDefaultPhoto();
    }

  }, 500)

  filtersButton.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      document.querySelector(`.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS)
      filterButton.classList.add(ACTIVE_CLASS)
      renderFilteredPhotos(evt);
    })
  })
}
export {initFilters}
