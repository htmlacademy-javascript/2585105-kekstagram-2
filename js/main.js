const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
];


const NAMES = [
  'Егор',
  'Иван',
  'Василий',
  'Александр',
  'Дарья',
  'Мария'
];


const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};

const generatePhotoId = createIdGenerator();
const generateUrlId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: 'У этого фото пока не добавили описание',
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
});

const photoArray = [];

for (let i = 1; i <= 25; i++) {
  const photo = createPhoto();
  photoArray.push(photo);
}
