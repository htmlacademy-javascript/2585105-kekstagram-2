import { openBigPicture } from './big-picture-viewer.js';

const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsElement = document.querySelector('.pictures');
const documentElement = document.createDocumentFragment();

const createThumbnail = (photo) => {
  const thumbnailElement = thumbnailTemplateElement.cloneNode(true);
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
  thumbnailsElement.querySelectorAll('a.picture')
    .forEach((thumbnail) => thumbnail.remove());

  photoDataArray.forEach((photo) => documentElement.append(createThumbnail(photo)));

  thumbnailsElement.append(documentElement);
};

export { displayThumbnails };
