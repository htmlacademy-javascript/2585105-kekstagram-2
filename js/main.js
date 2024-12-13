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

const MIN_LIKES = 15;
const MAX_LIKES = 200;

// Функция для генерации случайного числа в диапазоне
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

// Генератор идентификаторов
const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};

// Генерация новых идентификаторов
const generatePhotoId = createIdGenerator();

const createComment = () => ({
  id: generatePhotoId(),
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createPhoto = (i) => ({
  url: `photos/${i}.jpg`, // Используем обратные кавычки для шаблонной строки
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`, // Генерация аватара
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)], // Случайное сообщение
  name: NAMES[getRandomInteger(0, NAMES.length - 1)], // Случайное имя
  comments: Array.from({ length: 25 }, createComment), // Массив из 25 комментариев
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES), // Генерация случайного количества лайков
});

const photoArray = [];//
for (let i = 1; i <= 25; i++) { // Генерация 25 фотографий
  const photo = createPhoto(i);
  photoArray.push(photo); // Добавляем объект в массив
}
