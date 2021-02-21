const SCALE_CONTROL_MIN = 25;
const SCALE_CONTROL_MAX = 100;
const SCALE_CONTROL_STEP = 25;
const onScaleСontrolSmaller = document.querySelector('.scale__control--smaller');
const onScaleСontrolBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreview = uploadPreview.querySelector('img');
scaleControlValue.value = SCALE_CONTROL_MAX + '%';
let numberValue = parseInt(scaleControlValue.value.match(/\d+/));
onScaleСontrolBigger.setAttribute('disabled', true);

//увиличивает или уменьшает фото
const transform = () => {
  imgUploadPreview.style.transform = 'scale(' + numberValue / SCALE_CONTROL_MAX + ')';
}


// Уменьшает значение
const generateScaleMinImg = () => {
  onScaleСontrolBigger.removeAttribute('disabled');
  const resultValue = numberValue - SCALE_CONTROL_STEP;
  numberValue = resultValue;
  scaleControlValue.value = numberValue + '%';
  transform();
  if (numberValue <= SCALE_CONTROL_MIN) {
    onScaleСontrolSmaller.setAttribute('disabled', true);
  }
}

// Увеличивает значение
const generateScaleMaxImg = () => {
  onScaleСontrolSmaller.removeAttribute('disabled');
  const resultValue = numberValue +  SCALE_CONTROL_STEP;
  numberValue = resultValue;
  scaleControlValue.value = numberValue + '%';
  transform();
  if (numberValue >= SCALE_CONTROL_MAX) {
    onScaleСontrolBigger.setAttribute('disabled', true);
  }
}

onScaleСontrolSmaller.addEventListener('click', generateScaleMinImg);
onScaleСontrolBigger.addEventListener('click', generateScaleMaxImg);
export {imgUploadPreview};
