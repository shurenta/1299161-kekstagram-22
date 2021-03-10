import {onButtonUploadClick} from './generate-effect.js';
import {isEscEvent} from './util.js';
const main = document.querySelector('main');
const Status = {
  success: 'success',
  error: 'error',
}
//добовлят сообщение со статусом загрузске фото
const showStatusModal = (type = Status.success) => {
  const templateModal = document.querySelector(`#${type}`).content
  const elementModal = templateModal.cloneNode(true)
  main.appendChild(elementModal)

  const closeModalButton = main.querySelector(`.${type}__button`)

  //закрывает окно сообщения при клике на кнопку
  const closeStatusModal = () => {
    const sectionModal = document.querySelector(`.${type}`)
    sectionModal.remove()

    document.removeEventListener('keydown', onStatusModalEscKeydown)
    main.removeEventListener('click', onStatusModalOutsideClick)
    closeModalButton.removeEventListener('click', onStatusModalCloseClick)
  }

  //закрывает оконо сообщения отправки при нажатии Esc
  const onStatusModalEscKeydown = (evt, type) => {
    if (isEscEvent(evt)) {
      closeStatusModal(type)
    }
  }

  // закрывает окно сообщения при клике в любой области
  const onStatusModalOutsideClick = (evt) => {
    closeStatusModal(evt.target.className)
  }

  // закрывает окно сообщения при клике в любой области
  const onStatusModalCloseClick = () => {
    closeStatusModal()
  }

  main.addEventListener('click', onStatusModalOutsideClick)
  closeModalButton.addEventListener('click', onStatusModalCloseClick)
  document.addEventListener('keydown', onStatusModalEscKeydown)
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
          showStatusModal(Status.success);
          onSuccess();
        } else {
          showStatusModal(Status.error);
          onButtonUploadCdlick();
        }
      })
      .catch(() => {
        showStatusModal(Status.error);
        onButtonUploadCdlick();
      });
  });
}
setUserFormSubmit(onButtonUploadClick);
