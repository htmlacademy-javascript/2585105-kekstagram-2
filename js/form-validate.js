import '../vendor/pristine/pristine.min.js';

const MAX_TAGS = 5;
const MAX_TAG_LENGTH = 20;
const uploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');


let errorHashtagMessageTemplate = '';


const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = (value) => {
  errorHashtagMessageTemplate = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArrays = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArrays.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из одной # (решетки)',
    },
    {
      check: inputArrays.some((item) => item.slice(1).includes('#')),
      error: 'Хэштег разделяются пробелами',
    },
    {
      check: inputArrays.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с # (решетки)',
    },
    {
      check: inputArrays.some((item, i, arr) => arr.includes(item, i + 1)),
      error: 'Хэштег не должны повторяться',
    },
    {
      check: inputArrays.some((item) => item.length > MAX_TAG_LENGTH),
      error: `Максимальная длина одного хэштега ${MAX_TAG_LENGTH} включая # (решктку)`,
    },
    {
      check: inputArrays.length > MAX_TAGS,
      error: `Нельзя указать больше ${MAX_TAGS} хэштегов`,
    },
    {
      check: inputArrays.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorHashtagMessageTemplate += rule.error;
    }
    return !isInvalid;
  });
};


const validateTextDescription = (value) => value.length <= 140;


pristine.addValidator(hashtagInputElement, validateHashtag, () => errorHashtagMessageTemplate);
pristine.addValidator(textDescriptionElement, validateTextDescription, 'Максимум 140 символов');


const onTextHashtagInput = () => {
  submitButtonElement.disabled = !pristine.validate();
};


hashtagInputElement.addEventListener('input', onTextHashtagInput);
textDescriptionElement.addEventListener('input', onTextHashtagInput);


const isFormValid = () => pristine.validate();


const resetFormValidation = () => {
  imgUploadInputElement.value = '';
  hashtagInputElement.value = '';
  textDescriptionElement.value = '';
  pristine.reset();
};


export { isFormValid, resetFormValidation };
