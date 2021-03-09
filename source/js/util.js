const NAME_ESC_ONE = 'Escape';
const NAME_ESC_TWO = 'Esc';

//проверка нажатия на клавишу Esc
const isEscEvent = (evt) => {
  return evt.key === (NAME_ESC_ONE || NAME_ESC_TWO);
};


export {isEscEvent};
