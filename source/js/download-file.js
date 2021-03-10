const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileDownload = document.querySelector('#upload-file');

const onInputFileChange = () => {
  const containerImage = document.querySelector('.img-upload__preview');
  const img = containerImage.querySelector('img');
  const imgFile = fileDownload.files[0];
  const imgName = imgFile.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => imgName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    const onReaderLoad = () => {
      img.src = reader.result;
    }
    reader.addEventListener('load', onReaderLoad);
    reader.readAsDataURL(imgFile);
  }
}
fileDownload.addEventListener('change', onInputFileChange);
