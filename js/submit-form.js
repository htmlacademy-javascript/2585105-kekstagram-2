import { isEsc, toggleModalElement } from './utils.js';
import { isFormValid, resetFormValidation } from './form-validate.js';
import { resetZoomToDefault } from './image-zoom.js';
import { resetFiltersToDefault } from './filter-creation.js';
import { sendDataToApi } from './api-requests.js';

const SubmitButtonLabels = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadOverlayElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const imageUploadInputElement = imageUploadFormElement.querySelector('.img-upload__input');
const filterPreviewsElement = imageUploadFormElement.querySelectorAll('.effects__preview');
const uploadSubmitButtonElement = imageUploadOverlayElement.querySelector('.img-upload__submit');
const successNotificationElement = document.querySelector('#success').content;
const errorNotificationElement = document.querySelector('#error').content;

const disableSubmitButton = () => {
  uploadSubmitButtonElement.disabled = true;
  uploadSubmitButtonElement.textContent = SubmitButtonLabels.SENDING;
};

const enableSubmitButton = () => {
  uploadSubmitButtonElement.disabled = false;
  uploadSubmitButtonElement.textContent = SubmitButtonLabels.IDLE;
};

const showUploadForm = () => {
  toggleModalElement(imageUploadOverlayElement);
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideUploadForm = () => {
  toggleModalElement(imageUploadOverlayElement);
  document.removeEventListener('keydown', onDocumentKeydown);
  enableSubmitButton();
  resetFormValidation();
  resetZoomToDefault();
  resetFiltersToDefault();
};

imageUploadFormElement.querySelector('.img-upload__cancel')
  .addEventListener('click', () => {
    hideUploadForm();
  });

function onDocumentKeydown(evt) {
  if (
    isEsc(evt.keyCode) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    hideUploadForm();
  }
}

imageUploadInputElement.addEventListener('change', () => {
  const file = imageUploadInputElement.files[0];
  const image = imageUploadOverlayElement.querySelector('img');

  image.src = URL.createObjectURL(file);

  filterPreviewsElement.forEach((preview) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });

  showUploadForm();
});

const hideNotification = (evt) => {
  evt.stopPropagation();

  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButtonElement = existElement.querySelector('button');

  if (evt.target === existElement || evt.target === closeButtonElement || isEsc(evt.keyCode)) {
    existElement.remove();
    document.body.removeEventListener('click', onDocumentNotificationClick);
    document.body.removeEventListener('keydown', onDocumentNotificationKeydown);
  }
};

function onDocumentNotificationClick(evt) {
  hideNotification(evt);
}

function onDocumentNotificationKeydown(evt) {
  hideNotification(evt);
}

const showNotification = (template, cb = null) => {
  cb?.();

  const notificationNode = template.cloneNode(true);

  document.body.append(notificationNode);
  document.body.addEventListener('click', onDocumentNotificationClick);
  document.body.addEventListener('keydown', onDocumentNotificationKeydown);
};

const submitImageData = async (formElement) => {
  const isValid = isFormValid();

  if (isValid) {
    disableSubmitButton();
    try {
      await sendDataToApi(new FormData(formElement));
      showNotification(successNotificationElement, () => hideUploadForm());
    } catch (err) {
      showNotification(errorNotificationElement);
    } finally {
      enableSubmitButton();
    }
  }
};

const onSubmitButtonClick = (evt) => {
  evt.preventDefault();
  submitImageData(evt.target);
};

imageUploadFormElement.addEventListener('submit', onSubmitButtonClick);

export { submitImageData };
