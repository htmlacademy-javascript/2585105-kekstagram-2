import { openBigPicture } from './big-picture-viewer.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();

const createThumbnail = (photo) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const thumbnailImage = thumbnailElement.querySelector('.picture__img');

  thumbnailElement.href = photo.url;
  thumbnailElement.dataset.id = photo.id;

  thumbnailImage.src = photo.url;
  thumbnailImage.alt = photo.description;

  thumbnailElement.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;

  thumbnailElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });

  return thumbnailElement;
};

const displayThumbnails = (photoDataArray) => {
  thumbnailsContainer.querySelectorAll('a.picture')
    .forEach((thumbnail) => thumbnail.remove());

  photoDataArray.forEach((photo) => documentFragment.append(createThumbnail(photo)));

  thumbnailsContainer.append(documentFragment);
};

export { displayThumbnails };
