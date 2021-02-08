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
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const MIN_ID_COMMENTS = 1;
const MAX_ID_COMMENTS = 999;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const NUMBER_COMMENTS = 10;

let photos = [];
let comments = [];
let numbersAndIdPhotos = [];
let commentsId = [];


// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNamber =  (min, max) => {
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



// Функция для проверки максимальной длины строки
const checkLengthStrings = (checkedString,maximumlength = 140) => {
  return checkedString.length <= maximumlength;
}
checkLengthStrings('');



// Функция  возвращающая случайное значение
let getRandomArryElement = (array) => {
  let namberRandom = Math.floor(Math.random() * array.length);
  return array[namberRandom];
}



// Функция генерируящая id фотографии и номер фото
let getIdAndNamberPhoto = () => {
  while(numbersAndIdPhotos.length < MAX_NUMBER_ID_PHOTO) {
    const rundom = getRandomNamber(MIN_NUMBER_ID_PHOTO, MAX_NUMBER_ID_PHOTO);
    if(numbersAndIdPhotos.indexOf(rundom) === -1) numbersAndIdPhotos.push(rundom);
  }
  return numbersAndIdPhotos;
}



//функция для генерации id комментария
let getIdComments = () => {
  while(commentsId.length < MAX_ID_COMMENTS) {
    const rundom = getRandomNamber(MIN_ID_COMMENTS, MAX_ID_COMMENTS);
    if(commentsId.indexOf(rundom) === -1) commentsId.push(rundom);
  }
  return commentsId;
}



// функция создает объекты с коментариями и помещает их в массив
let getArryCommnets = () => {
  getIdComments();
  for (let i = 0; i < NUMBER_COMMENTS; i++) {
    let similarComments = {
      Id: commentsId[i],
      avatar: 'img/avatar-' + getRandomNamber(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR) + '.svg',
      message: getRandomArryElement(COMMENTS),
      name: getRandomArryElement(NAMES),
    }
    comments.push(similarComments);
  }
  return comments;
}



// функция создает объекты с фото и помещает их в массив
let getArryPhoto = () => {
  getIdAndNamberPhoto();
  getArryCommnets();
  for (let i = 0; i < MAX_NUMBER_ID_PHOTO; i++) {
    let similarPhotoPublication = {
      id: numbersAndIdPhotos[i],
      url: 'photos/' + numbersAndIdPhotos[i] + '.jpg',
      description: getRandomArryElement(PHOTO_DESCRIPTION),
      likes: getRandomNamber(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
      comments: comments,
    }
    photos.push(similarPhotoPublication);
  }
  return photos;
}
getArryPhoto();
