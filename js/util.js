//проверка нажатия на клавишу Esc
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};


// Функция  возвращающая случайное значение
let getRandomArrayElement = (array) => {
  let randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}
export {isEscEvent, getRandomArrayElement};
