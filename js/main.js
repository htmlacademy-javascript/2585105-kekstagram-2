const MESSAGE_SET =
  'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

// набор имен (12)
const NAMES_SET =
  'Егор, Иван, Василий, Александр, Дарья, Мария, Петр, Наталья, Михаил, Дмитрий, Ирина, Татьяна';

const MIN_LIKES = 15;
const MAX_LIKES = 200;

// Функции получения случайного числа из заданного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  let previousResult = -1;

  return () => {
    const result = Math.floor(Math.random() * (upper - lower + 1) + lower);

    // Исключение повторения значения предыдущего вызова (для комментариев)
    if (previousResult !== result) {
      previousResult = result;
      return result;
    }
    return result === upper ? lower : result + 1;
  };
};

// Создание вложенного объекта Comments
const createComment = () => {
  let id = 1; // Уникальный идентификатор для комментариев
  const messageArray = MESSAGE_SET.split('. ');
  const nameArray = NAMES_SET.split(', ');

  const indexMessageArr = getRandomInteger(0, messageArray.length - 1);
  const indexNameArr = getRandomInteger(0, nameArray.length - 1);

  return () => {
    const comment = {};
    const idAvatar = getRandomInteger(1, 6);

    comment.id = id++;
    comment.avatar = 'img/avatar-${idAvatar()}.svg'; // Исправлено
    comment.message = '${messageArray[indexMessageArr()]}. ${messageArray[indexMessageArr()]}'; // Исправлено
    comment.name = '${nameArray[indexNameArr()]}'; // Исправлено

    return comment;
  };
};

const numCommentsFunc = getRandomInteger(0, 30); // Исправлено
const numLikesFunc = getRandomInteger(MIN_LIKES, MAX_LIKES); // Исправлено

const createPhoto = () => {
  let id = 1;

  return () => {
    const photo = {};
    photo.id = id++;
    photo.url = photos / ${ id }.jpg; // Исправлено
    photo.description = 'Это фотография' №${ id }; // Исправлено
    photo.likes = numLikesFunc(); // Исправлено
    photo.comments = Array.from({ length: numCommentsFunc() }, createComment()); // Исправлено

    return photo; // Возвращаем объект photo
  };
};
