import {getRandomArrayElement} from './util.js';

const NAMES = [
  'Алексей',
  'Артем',
  'Юлия',
  'Дмитрий',
  'Станислав',
  'Виталий',
  'Юрий',
  'Наталья',
  'Галина',
  'Светлана',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCRIPTION = [
  'Отличное фото!',
  'Зацените эффекты',
  'Был в отпуске',
  'Живое фото получилось',
  'Это мой обед',
  'Как вам мой новый костюм',
];

const MIN_NUMBER_ID_PHOTO = 1;
const MAX_NUMBER_ID_PHOTO = 25;
const NUMBER_PHOTOS = 25;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_ID_COMMENTS = 1;
const MAX_ID_COMMENTS = 999;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const NUMBER_COMMENTS = 10;



// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber =  (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  const minRounded = Math.round(min);
  const maxRounded = Math.round(max);
  if (minRounded >= maxRounded) {
    return false;
  }
  if (minRounded >= 0 && maxRounded > 0) {
    return result;
  }
  return false;
};



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


//Функция создает фотографии
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
export {generateRandomPhotos, generateRandomComments};
