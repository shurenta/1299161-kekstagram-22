/*global noUiSlider*/
import {isEscEvent} from './util.js';
import {imgUploadPreview} from './zoom-photo.js';
const onEffectNone = document.querySelector('#effect-none');
const onEffectChrome = document.querySelector('#effect-chrome');
const onEffectSepia = document.querySelector('#effect-sepia');
const onEffectMarvin = document.querySelector('#effect-marvin');
const onEffectPhobos = document.querySelector('#effect-phobos');
const onEffectHeat = document.querySelector('#effect-heat');
const effectLevel = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const onOpenEditor = document.querySelector('#upload-file');
const onCloseEditor = document.querySelector('#upload-cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');

//Открытие формы редактирования
const OpenUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onEditorEscKeydown);
}
onOpenEditor.addEventListener('click', OpenUploadOverlay);


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

const deleteEffect = () => {
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = '';
  effectLevel.classList.add('hidden');
}
onEffectNone.addEventListener('click', deleteEffect);



const addEffectChrome = () => {
  imgUploadPreview.className = 'effects__preview--chrome';
  imgUploadPreview.style.filter = '';
  effectLevel.classList.remove('hidden');
}
onEffectChrome.addEventListener('click', addEffectChrome);


const addEffectSepia = () => {
  imgUploadPreview.className = 'effects__preview--sepia';
  imgUploadPreview.style.filter = '';
  effectLevel.classList.remove('hidden');
}
onEffectSepia.addEventListener('click', addEffectSepia);


const addEffectMarvin = () => {
  imgUploadPreview.className = 'effects__preview--marvin';
  imgUploadPreview.style.filter = '';
  effectLevel.classList.remove('hidden');
}
onEffectMarvin.addEventListener('click', addEffectMarvin);


const addEffectPhobos = () => {
  imgUploadPreview.className = 'effects__preview--phobos';
  imgUploadPreview.style.filter = '';
  effectLevel.classList.remove('hidden');
}
onEffectPhobos.addEventListener('click', addEffectPhobos);

const addEffectHeat = () => {
  imgUploadPreview.className = 'effects__preview--heat';
  imgUploadPreview.style.filter = '';
  effectLevel.classList.remove('hidden');
}
onEffectHeat.addEventListener('click', addEffectHeat);


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

// эффект Chrome
onEffectChrome.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  })
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    if (imgUploadPreview.className === 'effects__preview--chrome') {
      imgUploadPreview.style.filter ='grayscale(' + Number(effectLevelValue.value) + ')';
    }
  });
});

//эфект Sepia
onEffectSepia.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  })
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    if (imgUploadPreview.className === 'effects__preview--sepia') {
      imgUploadPreview.style.filter ='sepia(' + Number(effectLevelValue.value) + ')';
    }
  });
});


////Эффект Marvin
onEffectMarvin.addEventListener('change', () => {
  if (imgUploadPreview.className === 'effects__preview--marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step:1,
    })
  }
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    imgUploadPreview.style.filter ='invert(' + Number(effectLevelValue.value) + '%' + ')';
  });
});

// ////Эффект Phobos
onEffectPhobos.addEventListener('change', () => {
  if (imgUploadPreview.className === 'effects__preview--phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step:0.1,
    })
  }
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    imgUploadPreview.style.filter ='blur(' + Number(effectLevelValue.value) + 'px' + ')';
  });
});

///Эффект Heat
onEffectHeat.addEventListener('change', () => {
  if (imgUploadPreview.className === 'effects__preview--heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step:0.1,
    })
  }
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    imgUploadPreview.style.filter = 'brightness(' + Number(effectLevelValue.value) + ')';
  });
});
