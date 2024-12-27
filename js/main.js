import { fetchDataFromApi } from './api-requests.js';
import { displayThumbnails } from './image-preview.js';
import { showAlert, showImgFilterButtons, debounce } from './utils.js';
import { applyPhotoFilters } from './photo-sorted.js';
import { initializeFilters } from './filter-creation.js';
import { submitImageData } from './submit-form.js';

const initializeApp = async () => {
  try {
    const photoData = await fetchDataFromApi();

    displayThumbnails(photoData);
    showImgFilterButtons();
    applyPhotoFilters(
      photoData,
      debounce((sortedPhotosList) => displayThumbnails(sortedPhotosList))
    );
  } catch (err) {
    showAlert(err.message);
  }
};

initializeApp();
initializeFilters();
submitImageData();
