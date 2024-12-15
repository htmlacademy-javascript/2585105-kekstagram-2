export const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};


