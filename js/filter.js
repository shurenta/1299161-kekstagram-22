/* global _:readonly */
import {fillPhotos} from './photo-preview.js';
const ACTIVE_CLASS = 'img-filters__button--active';
const FILTER_RANDOM = document.querySelector('#filter-random');
const FILTER_DISCUSSED = document.querySelector('#filter-discussed');
const FILTER_DEFAULT = document.querySelector('#filter-default');

const deleteMiniPhoto = () => {
  const miniPhoto = document.querySelectorAll('.picture');
  miniPhoto.forEach((miniPhoto) => {
    miniPhoto.parentNode.removeChild(miniPhoto);
  })
}

const initFilters = (photos) => {
  const filtersButton = document.querySelectorAll('.img-filters__button')
  const getRandomPhoto = () => {
    const photosCopyRandom = photos.filter(() => 1)
    photosCopyRandom.sort(() => {
      return 0.5 - Math.random();
    });
    deleteMiniPhoto();
    fillPhotos(photosCopyRandom.slice(photosCopyRandom,10));
  }


  const getDefaultPhoto = () => {
    deleteMiniPhoto();
    fillPhotos(photos);
  }


  const sortCommentsPhoto = () => {
    deleteMiniPhoto();
    const photosCopy = photos.filter(() => 1)
    photosCopy.sort((a, b) => a.comments < b.comments ? 1 : -1);
    fillPhotos(photosCopy);
  }

  const renderFilteredPhotos = _.debounce((evt) => {
    switch (evt.target) {
      case  FILTER_RANDOM:
        return getRandomPhoto();
      case FILTER_DISCUSSED:
        return sortCommentsPhoto();
      case FILTER_DEFAULT:
        return getDefaultPhoto();
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
