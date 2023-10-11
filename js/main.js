const QUANTITY_PHOTOS = 25;
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const authors = [
  'Александр',
  'Мария',
  'Максим',
  'Марк',
  'Виктория',
  'Иван',
  'София',
  'Анна',
  'Алиса',
  'Ева',
  'Михаил',
  'Полина',
  'Лев',
  'Дмитрий',
];

// Возвращает произвольное целое число из диапазона min..max
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// генератор последовательных целых чисел из диапазона, пока есть
// числа, потом NULL
const generateCounterInRange = (min, max) => {
  let counter = min;

  return () => {
    if (counter > max) {
      return null;
    }

    return ++counter;
  };
};

// возвращает массив последовательных целых чисел из диапазона
const getSequenceNumbers = (min, max) =>
  Array.from({ length: max - min + 1 }, generateCounterInRange(min, max));

// Генератор произвольных уникальное целых чисел из диапазона min..max
// пока есть числа, потом null
const generateRandomUniqueNumber = (min, max) => {
  const array = getSequenceNumbers(min, max);

  return () => {
    const index = getRandomNumber(0, array.length - 1);

    if (array.length) {
      return array.splice(index, 1)[0];
    }

    return null;
  };
};

const getID = generateRandomUniqueNumber(1, QUANTITY_PHOTOS);
const getNumber = generateRandomUniqueNumber(1, QUANTITY_PHOTOS);
const getCommentsID = generateRandomUniqueNumber(1, 1000);

const createComment = () => {
  const message = messages[getRandomNumber(0, messages.length - 1)];
  const name = authors[getRandomNumber(0, authors.length - 1)];

  return {
    id: getCommentsID(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message,
    name,
  };
};

const createPhoto = () => {
  const comments = Array.from(
    { length: getRandomNumber(0, 30) },
    createComment
  );

  return {
    id: getID(),
    url: `photos/${getNumber()}.jpg`,
    description:
      'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Рыбного свой сбить жаренные толку!',
    likes: getRandomNumber(15, 200),
    comments,
  };
};

const arrayPhotos = Array.from({ length: QUANTITY_PHOTOS }, createPhoto);
