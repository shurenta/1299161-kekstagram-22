// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber =  (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  Math.round(min);
  Math.round(max);
  if (min >= max) {
    return false;
  }

  if (min >= 0 && max > 0) {
    return result;
  }
  return false;
}
getRandomNumber(0, 500);



// Функция для проверки максимальной длины строки
const checkLengthStrings = (checkedString,maximumlength = 140) => {
  return checkedString.length <= maximumlength;
}
checkLengthStrings('');
