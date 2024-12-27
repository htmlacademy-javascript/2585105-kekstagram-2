const MAX_RANDOM_PHOTOS = 10;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

const photoFilters = {
  default: {
    id: 'filter-default',
  },
  random: {
    id: 'filter-random',
    toSorted: (photos) => photos.toSorted(() => 0.5 - Math.random()),
  },
  discussed: {
    id: 'filter-discussed',
    toSorted: (photos) => photos.toSorted((a, b) => b.comments.length - a.comments.length),
  },
};

const filterButtonsWrapper = document.querySelector('.img-filters.container');
const filterButtonsList = filterButtonsWrapper.querySelectorAll('.img-filters__button');

const toggleActiveFilterClass = (buttons, evt) => {
  buttons.forEach((button) => {
    if (button.className.includes(ACTIVE_FILTER_CLASS)) {
      button.classList.toggle(ACTIVE_FILTER_CLASS);
      evt.target.classList.toggle(ACTIVE_FILTER_CLASS);
    }
  });
};

const applyPhotoFilters = (photos, callback) => {
  filterButtonsList.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      toggleActiveFilterClass(filterButtonsList, evt);

      switch (evt.target.id) {
        case photoFilters.random.id:
          callback(photoFilters.random.toSorted(photos).slice(0, MAX_RANDOM_PHOTOS));
          break;

        case photoFilters.discussed.id:
          callback(photoFilters.discussed.toSorted(photos));
          break;

        default:
          callback(photos);
      }
    });
  });
};

export { applyPhotoFilters };
