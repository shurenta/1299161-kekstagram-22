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

export {getRandomNumber};
