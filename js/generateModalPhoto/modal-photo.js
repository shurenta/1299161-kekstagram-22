import '../photo-preview.js';
import {openModalPhoto} from './open-modal-photo.js';
import {closeModalPhoto} from './close-modal-photo.js';

const containerMiniPhotos = document.querySelector('.pictures');
containerMiniPhotos.addEventListener('click', openModalPhoto);

const buttonCloseModal = document.querySelector('.big-picture__cancel');
buttonCloseModal.addEventListener('click', closeModalPhoto);



