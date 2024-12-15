import { generatePhotosArray } from './modules/photoGenerator.js';

const photoArray = generatePhotosArray(25);


const photoContainer = document.getElementById('photo-container');

photoArray.forEach((photo) => {
  const imgElement = document.createElement('img');
  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  photoContainer.appendChild(imgElement);
});
