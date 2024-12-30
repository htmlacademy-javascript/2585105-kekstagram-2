import { displayComments, clearComments } from './comments-viewer.js';
import { isEsc, toggleModalElement } from './utils.js';


const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPictureElement.querySelector('img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');


const editBigPicture = (photo) => {
  likesCountElement.textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;
  socialCaptionElement.textContent = photo.description;
  bigPictureImgElement.src = photo.url;
  bigPictureImgElement.alt = photo.description;
};


const openBigPicture = (photo) => {
  document.addEventListener('keydown', onDocumentKeydown);

  toggleModalElement(bigPictureElement);
  clearComments();
  editBigPicture(photo);
  displayComments(photo.comments);
};


const closeBigPicture = () => {
  document.removeEventListener('keydown', onDocumentKeydown);

  toggleModalElement(bigPictureElement);
};


function onDocumentKeydown(evt) {
  if (isEsc(evt.keyCode)) {
    evt.preventDefault();

    closeBigPicture();
  }
}


const onCloseButtonClick = () => {
  closeBigPicture();
};


bigPictureCloseButtonElement.addEventListener('click', onCloseButtonClick);


export { openBigPicture };
