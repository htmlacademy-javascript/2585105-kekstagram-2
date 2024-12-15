import { getRandomInteger, createIdGenerator } from './utils.js';
import { createComment } from './data.js';
import { MIN_LIKES, MAX_LIKES } from './constants.js';

const generatePhotoId = createIdGenerator();
const generateUrlId = createIdGenerator();

export const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: 'У этого фото пока не добавили описание',
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
});

export const generatePhotoArray = () => {
  const photoArray = [];
  for (let i = 1; i <= 25; i++) {
    const photo = createPhoto();
    photoArray.push(photo);
  }
  return photoArray;
};
