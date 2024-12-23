import { generatePhotoArray } from './photoGeneretor.js';
import { renderPictures } from './renderPictures.js';

const photoArray = generatePhotoArray();

renderPictures(photoArray);
