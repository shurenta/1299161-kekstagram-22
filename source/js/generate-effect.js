/*global noUiSlider*/
import {isEscEvent} from './util.js';
import {resetValueInput} from './zoom-photo.js';
const effectLevel = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const inputEditor = document.querySelector('#upload-file');
const buttonEditor = document.querySelector('#upload-cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const effectsList = document.querySelector('.effects__list');
const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');
const imgUploadPreview = document.querySelector('img');

//Открытие формы редактирования
const openUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onEditorEscKeydown);
}
inputEditor.addEventListener('click', openUploadOverlay);


//Закрытие формы редактирования
const closeUploadOverlay = () => {
  const containerUpload = document.querySelector('.img-upload__preview');
  const imgPreview = containerUpload.querySelector('img');
  imgPreview.src = 'img/upload-default-image.jpg';
  const effectNone = document.querySelector('#effect-none');
  effectNone.checked = true;
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditorEscKeydown);
  imgUploadPreview.style = '';
  resetValueInput();
  sliderElement.noUiSlider.off();
  hashtagInput.value = '';
  commentArea.value = '';
}
buttonEditor.addEventListener('click', closeUploadOverlay);

//Закрытие окна клавишей Esc
const onEditorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeUploadOverlay();
  }
}

//отрисовка слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

//'настройки слайдера для разных эффектов'
const effects = {
  none: {
    sliderSettings: {

    },
  },

  chrome: {
    sliderSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    getFilterStyle: (effectValue) => 'grayscale(' + Number(effectValue) + ')',
  },

  sepia: {
    sliderSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    getFilterStyle: (effectValue) => 'sepia(' + Number(effectValue) + ')',
  },

  marvin: {
    sliderSettings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    getFilterStyle: (effectValue) => 'invert(' + Number(effectValue) + '%' + ')',
  },

  phobos: {
    sliderSettings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    getFilterStyle: (effectValue) => 'blur(' + Number(effectValue) + 'px' + ')',
  },

  heat: {
    sliderSettings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    getFilterStyle: (effectValue) => 'brightness(' + Number(effectValue) + ')',
  },
}

effectsList.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.off();
  const effect = evt.target.value;

  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    imgUploadPreview.style = '';
    return
  }

  sliderElement.noUiSlider.updateOptions(effects[effect].sliderSettings)
  effectLevel.classList.remove('hidden');

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    imgUploadPreview.style.filter = effects[effect].getFilterStyle(effectLevelValue.value);
  });
});
export {onEditorEscKeydown, closeUploadOverlay};
