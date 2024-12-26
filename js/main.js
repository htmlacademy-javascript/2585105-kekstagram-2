import { getData } from './api.js';
import { displayThumbnails } from './render-thumbnails.js';
import { displayAlert, displayImageFilterButtons, debounce } from './utils.js';
import { sortPhotos } from './sort-photos.js';
import { initializeFilters } from './create-filters.js';
import { submitFormData } from './send-form-data.js';

const initializeApp = async () => {
  try {
    const photoData = await getData();

    displayThumbnails(photoData);
    displayImageFilterButtons();
    sortPhotos(
      photoData,
      debounce((sortedPhotosList) => displayThumbnails(sortedPhotosList))
    );
  } catch (err) {
    displayAlert(err.message);
  }
};

initializeApp();
initializeFilters();
submitFormData();
