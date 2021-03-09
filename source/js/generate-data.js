const error = document.querySelector('.error-img__download');
const filter = document.querySelector('.img-filters--inactive');

const getData = () => {
  return fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .catch(() => {
      error.classList.remove('hidden');
      filter.classList.add('hidden');
    });
};

export {getData};
