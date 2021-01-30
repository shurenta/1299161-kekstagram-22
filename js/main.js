// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber =  (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    return alert ('Первое число не может быть больше или равно второму');
  }

  if (min >= 0 && max > 0) {
    return result;
  } return alert ('Число должно быть положительным или 0');
}
getRandomNumber(0, 500);



// Функция для проверки максимальной длины строки
const checkLengthStrings = (checkedString,maximumlength = 140) => {
  checkedString.length;
  return (checkedString.length <= maximumlength) ? true : false;
}
checkLengthStrings('');
