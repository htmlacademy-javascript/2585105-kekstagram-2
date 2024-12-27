import { isEsc, toggleModalElement } from './utils.js';
import { isFormValid, resetFormValidation } from './form-validate.js';
import { resetZoomToDefault } from './image-zoom.js';
import { resetFiltersToDefault } from './filter-creation.js';
import { sendDataToApi } from './api-requests.js';

const SubmitButtonLabels = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const filterPreviews = imageUploadForm.querySelectorAll('.effects__preview');
const uploadSubmitButton = imageUploadOverlay.querySelector('.img-upload__submit');
const successNotificationTemplate = document.querySelector('#success').content;
const errorNotificationTemplate = document.querySelector('#error').content;

const disableSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = SubmitButtonLabels.SENDING;
};

const enableSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = SubmitButtonLabels.IDLE;
};

const showUploadForm = () => {
  toggleModalElement(imageUploadOverlay);
  document.addEventListener('keydown', handleDocumentKeydown);
};

const hideUploadForm = () => {
  toggleModalElement(imageUploadOverlay);
  document.removeEventListener('keydown', handleDocumentKeydown);
  enableSubmitButton();
  resetFormValidation();
  resetZoomToDefault();
  resetFiltersToDefault();
};

imageUploadForm.querySelector('.img-upload__cancel')
  .addEventListener('click', () => {
    hideUploadForm();
  });

function handleDocumentKeydown(evt) {
  if (
    isEsc(evt.keyCode) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    hideUploadForm();
  }
}

imageUploadInput.addEventListener('change', () => {
  const file = imageUploadInput.files[0];
  const image = imageUploadOverlay.querySelector('img');

  image.src = URL.createObjectURL(file);

  filterPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });

  showUploadForm();
});

const hideNotification = (evt) => {
  evt.stopPropagation();

  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');

  if (evt.target === existElement || evt.target === closeButton || isEsc(evt.keyCode)) {
    existElement.remove();
    document.body.removeEventListener('click', handleNotificationClick);
    document.body.removeEventListener('keydown', handleNotificationKeydown);
  }
};

function handleNotificationClick(evt) {
  hideNotification(evt);
}

function handleNotificationKeydown(evt) {
  hideNotification(evt);
}

const showNotification = (template, cb = null) => {
  cb?.();

  const notificationNode = template.cloneNode(true);

  document.body.append(notificationNode);
  document.body.addEventListener('click', handleNotificationClick);
  document.body.addEventListener('keydown', handleNotificationKeydown);
};

const submitImageData = async (formElement) => {
  const isValid = isFormValid();

  if (isValid) {
    disableSubmitButton();
    try {
      await sendDataToApi(new FormData(formElement));
      showNotification(successNotificationTemplate, () => hideUploadForm());
    } catch (err) {
      showNotification(errorNotificationTemplate);
    } finally {
      enableSubmitButton();
    }
  }
};

const handleSubmitButtonClick = (evt) => {
  evt.preventDefault();
  submitImageData(evt.target);
};

imageUploadForm.addEventListener('submit', handleSubmitButtonClick);

export { submitImageData };
