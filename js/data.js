import { getRandomInteger, createIdGenerator } from './utils.js';
import { MESSAGES, NAMES } from './constants.js';


const generateCommentId = createIdGenerator();


const createComment = () => ({
  id: generateCommentId(),
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
});


export { createComment };
