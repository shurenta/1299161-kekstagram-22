import {PHOTO_DESCRIPTION} from './dataUsers.js';
import {getRandomNumber} from './random-number.js';
import {generateArrayOfIds} from './array-of-ids.js';
import {getRandomArrayElement} from './random-array-element.js';
import {generateRandomComments} from './random-comments.js';
const MIN_NUMBER_ID_PHOTO = 1;
const MAX_NUMBER_ID_PHOTO = 25;
const NUMBER_PHOTOS = 25;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;

let generateRandomPhotos = () => {
  let photos = [];
  let ids = generateArrayOfIds(MIN_NUMBER_ID_PHOTO, MAX_NUMBER_ID_PHOTO, NUMBER_PHOTOS);
  for (let i = 0; i < NUMBER_PHOTOS; i++) {
    photos.push({
      id: ids[i],
      url: 'photos/' + ids[i] + '.jpg',
      description: getRandomArrayElement(PHOTO_DESCRIPTION),
      likes: getRandomNumber(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
      comments: generateRandomComments(),
    });
  }
  return photos;
}
export {generateRandomPhotos};
