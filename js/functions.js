const lineLength = (str, maxLength) => {
  if (str.length <= maxLength) {
    return true;
  }

  return false;
};


const isPalindrom = (string) => {
  const lowerCaseString = string.toLowerCase().replaceAll(' ', '');

  let lastIndex = lowerCaseString.length - 1;

  for (let i = 0; i < lowerCaseString.length; i++) {
    if (lowerCaseString[i] !== lowerCaseString[lastIndex]) {

      return false;
    }
    lastIndex--;
  }
  return true;
};



//цикл — для перебора полученной строки,
//функция parseInt() — для превращения в число отдельных символов и результирующей строки,
//функция Number.isNaN() — чтобы проверить, получилось ли превратить символ в число,
//метод toString() — на случай, если в качестве параметра пришло число.

const parseInt = (string) => {
  const reversed = Number.isNaN().toString()
  return string.parseInt() === reversed
}
