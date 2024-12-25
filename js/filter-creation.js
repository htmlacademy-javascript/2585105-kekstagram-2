const DEFAULT_SLIDER_OPTIONS = {
  range: {
    'min': 0,
    'max': 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};
const imageUploadForm = document.querySelector('.img-upload__form');
const filterOptionsList = imageUploadForm.querySelector('.effects__list');
const filterLevelValueInput = imageUploadForm.querySelector('.effect-level__value');
const imagePreviewContainer = imageUploadForm.querySelector('.img-upload__preview');
const filterLevelContainer = imageUploadForm.querySelector('.effect-level');
const previewImage = imagePreviewContainer.querySelector('img');
const filterLevelSlider = imageUploadForm.querySelector('.effect-level__slider');

const filterEffects = {
  none: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: () => {
      filterLevelContainer.classList.add('hidden');
      return 'none';
    },
  },
  chrome: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: (value) => {
      filterLevelContainer.classList.remove('hidden');
      filterLevelValueInput.value = parseFloat(value, 10);
      return `grayscale(${value})`;
    },
  },
  sepia: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: (value) => {
      filterLevelContainer.classList.remove('hidden');
      filterLevelValueInput.value = parseFloat(value, 10);
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
      filterLevelContainer.classList.remove('hidden');
      filterLevelValueInput.value = parseInt(value, 10);
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
      filterLevelContainer.classList.remove('hidden');
      filterLevelValueInput.value = parseFloat(value, 10);
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
      filterLevelContainer.classList.remove('hidden');
      filterLevelValueInput.value = parseFloat(value, 10);
      return `brightness(${value})`;
    }
  },
};

const initializeFilters = () => {
  filterEffects.none.effect();
  noUiSlider.create(filterLevelSlider, DEFAULT_SLIDER_OPTIONS);
};

const updateSliderOptions = (effect) => {
  filterLevelSlider.noUiSlider.updateOptions(filterEffects[effect].options);
};

const setEffectLevelChangeHandler = (effect) => {
  filterLevelSlider.noUiSlider.on('slide', (value) => {
    previewImage.style.filter = filterEffects[effect].effect(value);
  });
};

const applyFilterToPreviewImage = (effect) => {
  const startPointFilter = filterEffects[effect].options.range.max;
  previewImage.style.filter = filterEffects[effect].effect(startPointFilter);
};

filterOptionsList.addEventListener('change', (evt) => {
  evt.preventDefault();

  const target = evt.target.closest('.effects__item').querySelector('input');
  const effect = target.id.replace('effect-', '');

  target.checked = true;

  updateSliderOptions(effect);
  applyFilterToPreviewImage(effect);
  setEffectLevelChangeHandler(effect);
});

const resetFiltersToDefault = () => {
  filterLevelValueInput.value = '';
  previewImage.style.removeProperty('filter');

  filterLevelSlider.noUiSlider.updateOptions(DEFAULT_SLIDER_OPTIONS);
  filterOptionsList.querySelector('#effect-none').checked = true;
  filterEffects.none.effect();
};

export { initializeFilters, resetFiltersToDefault };
