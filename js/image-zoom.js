const PARSE_INT_RADIX = 10;
const TRANSFORM_SCALE_FACTOR = 0.01;

const ImageZoomSettings = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};


const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadedImageElement = imageUploadOverlayElement.querySelector('img');
const zoomOutButtonElement = imageUploadOverlayElement.querySelector('.scale__control--smaller');
const zoomLevelInputElement = imageUploadOverlayElement.querySelector('.scale__control--value');
const zoomInButtonElement = imageUploadOverlayElement.querySelector('.scale__control--bigger');


const adjustImageZoom = (factor = 1) => {
  let size = parseInt(zoomLevelInputElement.value, PARSE_INT_RADIX) + (ImageZoomSettings.STEP * factor);

  if (size < ImageZoomSettings.MIN) {
    size = ImageZoomSettings.MIN;
  }

  if (size > ImageZoomSettings.MAX) {
    size = ImageZoomSettings.MAX;
  }

  zoomLevelInputElement.value = `${size}%`;
  uploadedImageElement.style.transform = `scale(${size * TRANSFORM_SCALE_FACTOR})`;
};


zoomOutButtonElement.addEventListener('click', () => adjustImageZoom(-1));
zoomInButtonElement.addEventListener('click', () => adjustImageZoom());


const resetZoomToDefault = () => {
  uploadedImageElement.style.removeProperty('transform');
  zoomLevelInputElement.value = `${ImageZoomSettings.MAX}%`;
};

export { resetZoomToDefault };
