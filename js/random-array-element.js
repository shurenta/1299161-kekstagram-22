// Функция  возвращающая случайное значение
let getRandomArrayElement = (array) => {
  let randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

export{getRandomArrayElement};
