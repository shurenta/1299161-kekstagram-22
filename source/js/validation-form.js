import './modal-photo.js';
import './zoom-photo.js';
import {onEditorEscKeydown} from './generate-effect.js';

const MIN_NAME_HASHTAG = 2;
const MAX_NAME_HASHTAG = 20;
const VALID = 'black';
const INVALID = 'red';
const LATTICE = '#';

const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');

hashtagInput.addEventListener('input', () => {
  const valueLength = hashtagInput.value.length;
  const hashtagValue = hashtagInput.value.toLowerCase().split(' ');
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
    if (hashtagValue.length > 5) {
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
  if (hashtagInput.value === '') {
    hashtagInput.setCustomValidity('');
    hashtagInput.style.borderColor = VALID;
  }
  hashtagInput.reportValidity();
});


const onInputHashtagFocus = () => {
  document.removeEventListener('keydown', onEditorEscKeydown);
}
hashtagInput.addEventListener('focus', onInputHashtagFocus);

const onInputHashtagBlur = () => {
  document.addEventListener('keydown', onEditorEscKeydown);
}
hashtagInput.addEventListener('blur', onInputHashtagBlur);


const onInputCommentFocus = () => {
  document.removeEventListener('keydown', onEditorEscKeydown);
}
commentArea.addEventListener('focus', onInputCommentFocus);

const onInputCommentBlur = () => {
  document.addEventListener('keydown', onEditorEscKeydown);
}
commentArea.addEventListener('blur', onInputCommentBlur);
