const SCALE_CONTROL_MIN = 25;
const SCALE_CONTROL_MAX = 100;
const SCALE_CONTROL_STEP = 25;
const onScaleСontrolSmaller = document.querySelector('.scale__control--smaller');
const onScaleСontrolBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreview = uploadPreview.querySelector('img');
scaleControlValue.value = SCALE_CONTROL_MAX + '%';
let numberValue = Number.parseInt(scaleControlValue.value);
onScaleСontrolBigger.disabled = 'true';

//увиличивает или уменьшает фото
const transform = () => {
  imgUploadPreview.style.transform = 'scale(' + numberValue / SCALE_CONTROL_MAX + ')';
  if (numberValue <= SCALE_CONTROL_MIN) {
    onScaleСontrolSmaller.disabled = 'true';
  }
  if (numberValue >= SCALE_CONTROL_MAX) {
    onScaleСontrolBigger.disabled = 'true';
  }
}

// Уменьшает значение
const setScaleMinImg = () => {
  onScaleСontrolBigger.removeAttribute('disabled');
  numberValue = numberValue - SCALE_CONTROL_STEP;
  scaleControlValue.value = numberValue + '%';
  transform();
}

// Увеличивает значение
const setScaleMaxImg = () => {
  onScaleСontrolSmaller.removeAttribute('disabled');
  numberValue = numberValue +  SCALE_CONTROL_STEP;
  scaleControlValue.value = numberValue + '%';
  transform();
}

//сбрасывает значение импута и кнопок к ночальному состоянию при открии окна
const resetValueInput = () => {
  scaleControlValue.value = SCALE_CONTROL_MAX + '%';
  numberValue = Number.parseInt(scaleControlValue.value);
  onScaleСontrolSmaller.removeAttribute('disabled');
  onScaleСontrolBigger.disabled = 'true';
}

onScaleСontrolSmaller.addEventListener('click', setScaleMinImg);
onScaleСontrolBigger.addEventListener('click', setScaleMaxImg);
export {imgUploadPreview, resetValueInput};
