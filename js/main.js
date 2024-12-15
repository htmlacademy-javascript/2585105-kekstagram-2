import { generatePhotosArray } from './modules/photoGenerator.js';

const photoArray = generatePhotosArray(25);


const photoContainer = document.getElementById('photo-container');

photoArray.forEach((photo) => {
  const imgElement = document.createElement('img');
  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  photoContainer.appendChild(imgElement);
});


const descriptionList = document.getElementById('description-list');

photoArray.forEach((photo) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${photo.description}` `(Likes: ${photo.likes})`;
  descriptionList.appendChild(listItem);
});
