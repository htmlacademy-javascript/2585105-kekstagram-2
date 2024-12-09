const MESSAGE_SET =
  'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';


const NAMES_SET =
  'Егор, Иван, Василий, Александр, Дарья, Мария, Петр, Наталья, Михаил, Дмитрий, Ирина, Татьяна';

const MIN_LIKES = 15;
const MAX_LIKES = 200;


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};


const createComment = (id) => {
  const messageArray = MESSAGE_SET.split('. ');
  const nameArray = NAMES_SET.split(', ');

  const comment = {};
  const idAvatar = getRandomInteger(1, 6);

  comment.id = id;
  comment.avatar = img / avatar - ${ idAvatar }.svg;
  const randomMessageIndex1 = getRandomInteger(0, messageArray.length - 1);
  const randomMessageIndex2 = getRandomInteger(0, messageArray.length - 1);

  comment.message = ${ messageArray[randomMessageIndex1] } ${ messageArray[randomMessageIndex2] };
  comment.name = ${ nameArray[getRandomInteger(0, nameArray.length - 1)] };

  return comment;
};

const createPhoto = (id) => {
  const photo = {};

  photo.id = id;
  photo.url = photos / ${ id }.jpg;
  photo.description = "Это фотография №${id}";
  photo.likes = getRandomInteger(MIN_LIKES, MAX_LIKES);

  const numComments = getRandomInteger(0, 30);
  photo.comments = Array.from({ length: numComments }, (_, index) => createComment(index + 1));

  return photo;
};


const photosArray = Array.from({ length: 25 }, (_, index) => createPhoto(index + 1));
console.log(photosArray);
