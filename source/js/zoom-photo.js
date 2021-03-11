const SCALE_CONTROL_MIN = 25;
const SCALE_CONTROL_MAX = 100;
const SCALE_CONTROL_STEP = 25;
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreview = uploadPreview.querySelector('img');
scaleControlValue.value = `${SCALE_CONTROL_MAX} %`;
let numberValue = Number.parseInt(scaleControlValue.value);
scaleControlBigger.disabled = true;

//увиличивает или уменьшает фото
const transform = () => {
  imgUploadPreview.style.transform = `scale(${numberValue / SCALE_CONTROL_MAX})`;
  scaleControlSmaller.disabled = numberValue <= SCALE_CONTROL_MIN;
  scaleControlBigger.disabled = numberValue >= SCALE_CONTROL_MAX;
  scaleControlValue.value = `${numberValue} %`;
}

// Уменьшает значение
const onButtonSmallerClick = () => {
  scaleControlBigger.disabled = false;
  numberValue = numberValue - SCALE_CONTROL_STEP;
  transform();
}

// Увеличивает значение
const onButtonBiggerClick = () => {
  scaleControlSmaller.disabled = false;
  numberValue = numberValue +  SCALE_CONTROL_STEP;
  transform();
}

//сбрасывает значение импута и кнопок к ночальному состоянию при закрытии окна
const resetValueInput = () => {
  scaleControlValue.value = `${SCALE_CONTROL_MAX} %`;
  numberValue = Number.parseInt(scaleControlValue.value);
  scaleControlSmaller.disabled = false;
  scaleControlBigger.disabled = true;
}

const addEventZoom = () => {
  scaleControlSmaller.addEventListener('click', onButtonSmallerClick);
  scaleControlBigger.addEventListener('click', onButtonBiggerClick);
}

const removeEventZoom = () => {
  scaleControlSmaller.removeEventListener('click', onButtonSmallerClick);
  scaleControlBigger.removeEventListener('click', onButtonBiggerClick);
}
export {resetValueInput, removeEventZoom, addEventZoom};
