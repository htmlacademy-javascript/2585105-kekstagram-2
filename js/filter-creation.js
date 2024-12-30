const DEFAULT_SLIDER_OPTIONS = {
  range: {
    'min': 0,
    'max': 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};
const imageUploadFormElement = document.querySelector('.img-upload__form');
const filterOptionsListElement = imageUploadFormElement.querySelector('.effects__list');
const filterLevelValueInputElement = imageUploadFormElement.querySelector('.effect-level__value');
const imagePreviewContainerElement = imageUploadFormElement.querySelector('.img-upload__preview');
const filterLevelContainerElement = imageUploadFormElement.querySelector('.effect-level');
const previewImageElement = imagePreviewContainerElement.querySelector('img');
const filterLevelSliderElement = imageUploadFormElement.querySelector('.effect-level__slider');

const filterEffects = {
  none: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: () => {
      filterLevelContainerElement.classList.add('hidden');
      return 'none';
    },
  },
  chrome: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: (value) => {
      filterLevelContainerElement.classList.remove('hidden');
      filterLevelValueInputElement.value = parseFloat(value, 10);
      return `grayscale(${value})`;
    },
  },
  sepia: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: (value) => {
      filterLevelContainerElement.classList.remove('hidden');
      filterLevelValueInputElement.value = parseFloat(value, 10);
      return `sepia(${value})`;
    }
  },
  marvin: {
    options: {
      range: {
        'min': 1,
        'max': 100
      },
      start: 100,
      step: 1,
    },
    effect: (value) => {
      filterLevelContainerElement.classList.remove('hidden');
      filterLevelValueInputElement.value = parseInt(value, 10);
      return `invert(${value}%)`;
    }
  },
  phobos: {
    options: {
      range: {
        'min': 0,
        'max': 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: (value) => {
      filterLevelContainerElement.classList.remove('hidden');
      filterLevelValueInputElement.value = parseFloat(value, 10);
      return `blur(${value}px)`;
    }
  },
  heat: {
    options: {
      range: {
        'min': 1,
        'max': 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: (value) => {
      filterLevelContainerElement.classList.remove('hidden');
      filterLevelValueInputElement.value = parseFloat(value, 10);
      return `brightness(${value})`;
    }
  },
};

const initializeFilters = () => {
  filterEffects.none.effect();
  noUiSlider.create(filterLevelSliderElement, DEFAULT_SLIDER_OPTIONS);
};

const updateSliderOptions = (effect) => {
  filterLevelSliderElement.noUiSlider.updateOptions(filterEffects[effect].options);
};

const setEffectLevelChangeHandler = (effect) => {
  filterLevelSliderElement.noUiSlider.on('slide', (value) => {
    previewImageElement.style.filter = filterEffects[effect].effect(value);
  });
};

const applyFilterToPreviewImage = (effect) => {
  const startPointFilter = filterEffects[effect].options.range.max;
  previewImageElement.style.filter = filterEffects[effect].effect(startPointFilter);
};

filterOptionsListElement.addEventListener('change', (evt) => {
  evt.preventDefault();

  const target = evt.target.closest('.effects__item').querySelector('input');
  const effect = target.id.replace('effect-', '');

  target.checked = true;

  updateSliderOptions(effect);
  applyFilterToPreviewImage(effect);
  setEffectLevelChangeHandler(effect);
});

const resetFiltersToDefault = () => {
  filterLevelValueInputElement.value = '';
  previewImageElement.style.removeProperty('filter');

  filterLevelSliderElement.noUiSlider.updateOptions(DEFAULT_SLIDER_OPTIONS);
  filterOptionsListElement.querySelector('#effect-none').checked = true;
  filterEffects.none.effect();
};

export { initializeFilters, resetFiltersToDefault };
