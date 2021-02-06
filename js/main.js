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

let getRandom = (array) => {
  let namberRandom = Math.floor(Math.random() * array.length);
  return array[namberRandom];
}

// Функция генереруящая массив

const createPhotos = () => {
  const comments = [];
  const photos = [];
  const numbers = [];
  while(numbers.length < 25){
    const rundom = Math.floor(Math.random() * 25) + 1;
    if(numbers.indexOf(rundom) === -1) numbers.push(rundom);
  }

  for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];

    let similarComments = {
      id: getRandomNamber(0, 9999999999),
      avatar: 'img/avatar-' + getRandomNamber(1, 6) + '.svg',
      message: getRandom(COMMENTS),
      name: getRandom(NAMES),
    };
    comments.push(similarComments);

    let similarPhotoPublication = {
      Id: number,
      url: 'photos/' + number + '.jpg',
      description: getRandom(PHOTO_DESCRIPTION),
      likes: getRandomNamber(15, 200),
      comments: comments,
    }
    photos.push(similarPhotoPublication);
  }
  return photos;
};
createPhotos();
