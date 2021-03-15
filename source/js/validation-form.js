import './modal-photo.js';
import './zoom-photo.js';
import {onEditorEscKeydown} from './generate-effect.js';

const MIN_NAME_HASHTAG = 2;
const MAX_NAME_HASHTAG = 20;
const VALID = 'black';
const INVALID = 'red';
const LATTICE = '#';
const QUANTITY = 5;

const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');

const generateValidation = () => {
  const valueLength = hashtagInput.value.length;
  const hashtagValue = hashtagInput.value.toLowerCase().split(' ');
  if (hashtagInput.value === '') {
    hashtagInput.setCustomValidity('');
    return hashtagInput.style.borderColor = VALID;
  }
  for (let hashtag of hashtagValue) {
    const regex = /^#[a-zA-Z0-9]+/;
    if (valueLength < MIN_NAME_HASHTAG) {
      hashtagInput.setCustomValidity('Ещё ' + (MIN_NAME_HASHTAG - valueLength) +' симв.');
      break;
    }
    if (hashtag[0] !== LATTICE) {
      hashtagInput.setCustomValidity('Имя должно начинаться с ' + LATTICE);
      break;
    }
    if (!regex.test(hashtag)) {
      hashtagInput.setCustomValidity('Должны быть только цифры или буквы');
      break;

    }

    if (hashtag.length > MAX_NAME_HASHTAG) {
      hashtagInput.setCustomValidity('Удалите лишние ' + (hashtag.length - MAX_NAME_HASHTAG) +' симв.');
      break;
    }
    if (hashtagValue.length > QUANTITY) {
      hashtagInput.setCustomValidity('может быть только 5ть хэштегов');
      break;
    }
    hashtagInput.setCustomValidity('');
  }
  loop:
  for (let i = 0; i < hashtagValue.length; i++) {
    for (let k = i+1; k < hashtagValue.length; k++) {
      if (hashtagValue[i] === hashtagValue[k]) {
        hashtagInput.setCustomValidity('дубликат');
        break loop;
      }
    }
  }
  if (hashtagInput.validity.customError) {
    hashtagInput.style.borderColor = INVALID;
  }
  if (hashtagInput.validity.valid) {
    hashtagInput.style.borderColor = VALID;
  }
  hashtagInput.reportValidity();
}

hashtagInput.addEventListener('input', generateValidation);

const onInputHashtagFocus = () => {
  document.removeEventListener('keydown', onEditorEscKeydown);
}

const onInputHashtagBlur = () => {
  document.addEventListener('keydown', onEditorEscKeydown);
}


const onInputCommentFocus = () => {
  document.removeEventListener('keydown', onEditorEscKeydown);
}

const onInputCommentBlur = () => {
  document.addEventListener('keydown', onEditorEscKeydown);
}

const addEventForm = () => {
  hashtagInput.addEventListener('input', generateValidation);
  commentArea.addEventListener('blur', onInputCommentBlur);
  commentArea.addEventListener('focus', onInputCommentFocus);
  hashtagInput.addEventListener('blur', onInputHashtagBlur);
  hashtagInput.addEventListener('focus', onInputHashtagFocus);
}

const removeEventForm =() => {
  hashtagInput.removeEventListener('input', generateValidation);
  commentArea.removeEventListener('blur', onInputCommentBlur);
  commentArea.removeEventListener('focus', onInputCommentFocus);
  hashtagInput.removeEventListener('blur', onInputHashtagBlur);
  hashtagInput.removeEventListener('focus', onInputHashtagFocus);
}

export {generateValidation, addEventForm, removeEventForm};
