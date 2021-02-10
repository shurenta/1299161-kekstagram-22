import {getRandomNumber} from './random-number.js';
// Функция генерируящая id фотографии и номер фото
let generateArrayOfIds = (minValue, maxValue, length) => {
  let ids = [];
  while(ids.length < length) {
    const random = getRandomNumber(minValue, maxValue);
    if (ids.indexOf(random) === -1) {
      ids.push(random);
    }
  }

  return ids;
}

export {generateArrayOfIds};
