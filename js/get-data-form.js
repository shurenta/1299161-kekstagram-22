import {closeUploadOverlay} from './generate-effect.js';
import {isEscEvent} from './util.js';
const main = document.querySelector('main');

//добовлят сообщение об ошибке и закрвает его.
const addErrorMessage = () => {
  const templateError = document.querySelector('#error').content;
  const elementError = templateError.cloneNode(true);
  main.appendChild(elementError);
  const closeErrorButton = main.querySelector('.error__button');
  closeErrorButton.addEventListener('click', closeErrorModal);
  document.addEventListener('keydown', OnMessageErrorEscKeydown);
}

//закрывает окно ошибки при клике на кнопку
const closeErrorModal = () => {
  const sectionError = document.querySelector('.error');
  sectionError.remove();
  document.removeEventListener('keydown', OnMessageErrorEscKeydown);
}

//закрывает оконо ошибки отправки при нажатии Esc
const OnMessageErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeErrorModal();
    document.removeEventListener('keydown', OnMessageErrorEscKeydown);
  }
}


//добовляет окно успешной отправки
const addSuccessMessage = () => {
  const templateSuccess = document.querySelector('#success').content;
  const elementSuccess = templateSuccess.cloneNode(true);
  main.appendChild(elementSuccess);
  const closeSuccessButton = main.querySelector('.success__button');
  closeSuccessButton.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', OnMessageSuccessEscKeydown);
}

//закрывает окно успешной отправки при клике на кнопку
const closeSuccessModal = () => {
  const sectionSuccess = document.querySelector('.success');
  sectionSuccess.remove();
  document.removeEventListener('keydown', OnMessageSuccessEscKeydown);
}


//закрывает коно успешной отправки при нажатии Esc
const OnMessageSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeSuccessModal();
    document.removeEventListener('keydown', OnMessageSuccessEscKeydown);
  }
}
// закрывает окно сообщения при клике в любой области
main.onclick = (evt) => {
  if (evt.target.className === 'error') {
    closeErrorModal();
  }
  if (evt.target.className === 'success') {
    closeSuccessModal();
  }
}



//отправка данных с формы
const setUserFormSubmit = (onSuccess) => {
  const uploadForm = document.querySelector('.img-upload__form');
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      'https://22.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          addSuccessMessage();
          onSuccess();
        } else {
          addErrorMessage();
          closeUploadOverlay();
        }
      })
      .catch(() => {
        closeUploadOverlay();
      });
  });
}
setUserFormSubmit(closeUploadOverlay);
