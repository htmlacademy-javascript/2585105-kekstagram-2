const PARSE_INT_RADIX = 10;
const TRANSFORM_SCALE_FACTOR = 0.01;

const ImageZoomSettings = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};


const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadedImage = imageUploadOverlay.querySelector('img');
const zoomOutButton = imageUploadOverlay.querySelector('.scale__control--smaller');
const zoomLevelInput = imageUploadOverlay.querySelector('.scale__control--value');
const zoomInButton = imageUploadOverlay.querySelector('.scale__control--bigger');


const adjustImageZoom = (factor = 1) => {
  let size = parseInt(zoomLevelInput.value, PARSE_INT_RADIX) + (ImageZoomSettings.STEP * factor);

  if (size < ImageZoomSettings.MIN) {
    size = ImageZoomSettings.MIN;
  }

  if (size > ImageZoomSettings.MAX) {
    size = ImageZoomSettings.MAX;
  }

  zoomLevelInput.value = `${size}%`;
  uploadedImage.style.transform = `scale(${size * TRANSFORM_SCALE_FACTOR})`;
};


zoomOutButton.addEventListener('click', () => adjustImageZoom(-1));
zoomInButton.addEventListener('click', () => adjustImageZoom());


const resetZoomToDefault = () => {
  uploadedImage.style.removeProperty('transform');
  zoomLevelInput.value = `${ImageZoomSettings.MAX}%`;
};

export { resetZoomToDefault };
