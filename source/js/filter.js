/* global _:readonly */
import {fillPhotos} from './photo-preview.js';
const ACTIVE_CLASS = 'img-filters__button--active';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const FILTER_DEFAULT = 'filter-default';
const TIME = 500;

const deleteMiniPhoto = () => {
  const miniPhoto = document.querySelectorAll('.picture');
  miniPhoto.forEach((miniPhoto) => {
    miniPhoto.parentNode.removeChild(miniPhoto);
  })
}

const initFilters = (photos) => {
  const filter = document.querySelector('.img-filters--inactive');
  filter.classList.remove('img-filters--inactive');
  const filtersButton = document.querySelectorAll('.img-filters__button')
  const renderRandomPhotos = () => {
    const photosCopyRandom = photos.filter(() => 1);
    photosCopyRandom.sort(() => 0.5 - Math.random());
    deleteMiniPhoto();
    fillPhotos(photosCopyRandom.slice(photosCopyRandom,10));
  }


  const renderDefaultPhotos = () => {
    deleteMiniPhoto();
    fillPhotos(photos);
  }


  const renderMostCommentedPhotos = () => {
    deleteMiniPhoto();
    const photosCopy = photos.filter(() => 1)
    photosCopy.sort((a, b) => a.comments < b.comments ? 1 : -1);
    fillPhotos(photosCopy);
  }

  const renderFilteredPhotos = _.debounce((evt) => {
    switch (evt.target.id) {
      case FILTER_RANDOM:
        return renderRandomPhotos();
      case FILTER_DISCUSSED:
        return renderMostCommentedPhotos();
      case FILTER_DEFAULT:
        return renderDefaultPhotos();
    }
  }, TIME)

  filtersButton.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      document.querySelector(`.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS)
      filterButton.classList.add(ACTIVE_CLASS)
      renderFilteredPhotos(evt);
    })
  })
}
export {initFilters}
