import {NAMES, COMMENTS} from './dataUsers.js';
import {getRandomNumber} from './random-number.js';
import {generateArrayOfIds} from './array-of-ids.js';
import {getRandomArrayElement} from './utils.js';
const MIN_ID_COMMENTS = 1;
const MAX_ID_COMMENTS = 999;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const NUMBER_COMMENTS = 10;

// функция создает объекты с коментариями и помещает их в массив
let generateRandomComments = () => {
  let ids = generateArrayOfIds(MIN_ID_COMMENTS, MAX_ID_COMMENTS, NUMBER_COMMENTS);
  let comments = [];
  for (let i = 0; i < NUMBER_COMMENTS; i++) {
    comments.push({
      id: ids[i],
      avatar: 'img/avatar-' + getRandomNumber(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR) + '.svg',
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
}

export {generateRandomComments};
