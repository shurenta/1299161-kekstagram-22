/*global noUiSlider*/
import {isEscEvent} from './util.js';
import {imgUploadPreview, resetValueInput} from './zoom-photo.js';
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const effectLevel = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const onOpenEditor = document.querySelector('#upload-file');
const onCloseEditor = document.querySelector('#upload-cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const effectsList = document.querySelector('.effects__list');
const body = document.querySelector('body');

//Открытие формы редактирования
const openUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onEditorEscKeydown);
  resetValueInput();
  deleteEffect();
}
onOpenEditor.addEventListener('click', openUploadOverlay);


//Закрытие формы редактирования
const closeUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditorEscKeydown);
}
onCloseEditor.addEventListener('click', closeUploadOverlay);

//Закрытие окна клавишей Esc
const onEditorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEditorEscKeydown);
  }
}


//удаление эффектов
const deleteEffect = () => {
  imgUploadPreview.className = '';
  imgUploadPreview.style = '';
}
effectNone.addEventListener('click', deleteEffect);


//добавление эфектов
const addEffect = (evt) => {
  const thisObjekt = evt.target;
  const nextObjekt = thisObjekt.nextElementSibling;
  const nameEffect = nextObjekt.querySelector('span');
  imgUploadPreview.className = nameEffect.className;
  imgUploadPreview.classList.remove('effects__preview');
  imgUploadPreview.style.filter = '';
  effectLevel.classList.remove('hidden');
}
effectChrome.addEventListener('click', addEffect);
effectSepia.addEventListener('click', addEffect);
effectMarvin.addEventListener('click', addEffect);
effectPhobos.addEventListener('click', addEffect);
effectHeat.addEventListener('click', addEffect);


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
  const effect = evt.target.value;
  sliderElement.noUiSlider.updateOptions(effects[effect].sliderSettings)
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    imgUploadPreview.style.filter = effects[effect].getFilterStyle(effectLevelValue.value);
  });
});
