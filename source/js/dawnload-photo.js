const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileDownload = document.querySelector('#upload-file');

const dawnoladFile = () => {
  const containerImage = document.querySelector('.img-upload__preview');
  const img = containerImage.querySelector('img');
  const imgFile = fileDownload.files[0];
  const imgName = imgFile.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return imgName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    const loadPhoto = () => {
      img.src = reader.result;
    }
    reader.addEventListener('load', loadPhoto);
    reader.readAsDataURL(imgFile);
  }
}
fileDownload.addEventListener('change', dawnoladFile);
