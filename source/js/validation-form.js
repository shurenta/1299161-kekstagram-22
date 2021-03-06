import './modal-photo.js';
import './zoom-photo.js';
import './generate-effect.js';
import {onEditorEscKeydown} from './generate-effect.js';

const MIN_NAME_HASHTAG = 2;
const MAX_NAME_HASHTAG = 20;

const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');

hashtagInput.addEventListener('input', () => {
  const valueLength = hashtagInput.value.length;
  const hashtagValue = hashtagInput.value.toLowerCase().split(' ');
  for (let hashteg of hashtagValue) {
    const regex = /^#[a-zA-Z0-9]+/;
    if (valueLength < MIN_NAME_HASHTAG) {
      hashtagInput.setCustomValidity('Ещё ' + (MIN_NAME_HASHTAG - valueLength) +' симв.');
      hashtagInput.style.borderColor = 'red';
      break;
    }
    hashtagInput.style.borderColor = 'black';
    if (hashteg[0] !== '#') {
      hashtagInput.setCustomValidity('Имя должно начинаться с #');
      hashtagInput.style.borderColor = 'red';
      break;
    }
    hashtagInput.style.borderColor = 'black';
    if (!regex.test(hashteg)) {
      hashtagInput.setCustomValidity('Должны быть только цифры или буквы');
      hashtagInput.style.borderColor = 'red';
      break;

    }

    if (hashteg.length > MAX_NAME_HASHTAG) {
      hashtagInput.setCustomValidity('Удалите лишние ' + (hashteg.length - MAX_NAME_HASHTAG) +' симв.');
      hashtagInput.style.borderColor = 'red';
      break;
    }
    hashtagInput.style.borderColor = 'black';
    if (hashtagValue.length > 5) {
      hashtagInput.setCustomValidity('может быть только 5ть хэштегов');
      hashtagInput.style.borderColor = 'red';
      break;
    }
    hashtagInput.style.borderColor = 'black';
    hashtagInput.setCustomValidity('');
  }
  loop:
  for (let i = 0; i < hashtagValue.length; i++) {
    for (let k = i+1; k < hashtagValue.length; k++) {
      if (hashtagValue[i] === hashtagValue[k]) {
        hashtagInput.style.borderColor = 'red';
        hashtagInput.setCustomValidity('дубликат');
        break loop;
      }
      hashtagInput.style.borderColor = 'black';
    }
  }

  hashtagInput.reportValidity();
});


const deleteEventKeydownHashtag = () => {
  document.removeEventListener('keydown', onEditorEscKeydown);
}
hashtagInput.addEventListener('focus', deleteEventKeydownHashtag);

const addEventKeydownHashtag = () => {
  document.addEventListener('keydown', onEditorEscKeydown);
}
hashtagInput.addEventListener('blur', addEventKeydownHashtag);


const deleteEventKeydownComment = () => {
  document.removeEventListener('keydown', onEditorEscKeydown);
}
commentArea.addEventListener('focus', deleteEventKeydownComment);

const addEventKeydownComment = () => {
  document.addEventListener('keydown', onEditorEscKeydown);
}
commentArea.addEventListener('blur', addEventKeydownComment);