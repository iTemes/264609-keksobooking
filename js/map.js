'use strict';

// Данные для объектов.
var AUTHOR = {
  avatar: 'img/avatars/user0',
  avatarFormat: '.png'
};
var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var OBJECTS_COUNT = 8;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
// Массив для хранения уже использующихся заголовков.
var usedTitles = [];
//
var map = document.querySelector('.map');
// Шаблон меток.
var mapPinTemplate = document.querySelector('template');
// Шаблон карточки
var mapCard = mapPinTemplate.content.querySelector('.map__card');
var photosGroup = mapCard.querySelector('.popup__photos');
var photoElem = photosGroup.querySelector('img');
photosGroup.removeChild(photoElem);
var featuresList = mapCard.querySelector('.popup__features');

// Секция для вставки меток.
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('template').content.querySelector('.map__pin');
// Группа меток для вставки на страницу.
var pinsGroup = document.createDocumentFragment();

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var nonEqualRandom = function (arr, existArr) {
  var index = getRandom(0, arr.length - 1);
  var elem = arr[index];
  if (existArr.includes(elem)) {
    return nonEqualRandom(arr, existArr);
  } else {
    return elem;
  }
};
//  Функия для передачи в compareRandomArr для сортировки
var compareRandom = function () {
  return Math.random() - 0.5;
};
// Функция для случайного порядка элементов в массиве.
var compareRandomArr = function (arr) {
  return arr.sort(compareRandom);
};
// Функция массива строк случайно длины
var randomLengthArr = function (arr) {
  var indexForSlice = getRandom(-arr.length, arr.length - 1);
  var resultArr = arr.slice(0);
  compareRandomArr(resultArr);
  return resultArr.slice(indexForSlice);
};
// Фунция для конвертации типа жилья на русский язык
var convertOfferType = function (type) {
  var offerType = '';
  switch (type) {
    case 'flat':
      offerType = 'Квартира';
      break;
    case 'bungalo':
      offerType = 'Бунгало';
      break;
    case 'house':
      offerType = 'Дом';
      break;
    case 'palace':
      offerType = 'Дворец';
  }
  return offerType;
};
// СОздание объекта.
var createObject = function (avatarCount) {
  var title = nonEqualRandom(TITLE, usedTitles);
  usedTitles.push(title);
  var randomPhotos = PHOTOS.slice(0);
  var randomFeatures = FEATURES.slice(0);
  var position = {
    x: getRandom(300, 900),
    y: getRandom(130, 630)
  };
  var estateObject = {
    author: {
      avatar: AUTHOR.avatar + avatarCount + AUTHOR.avatarFormat
    },
    position: {
      x: position.x,
      y: position.y
    },
    offer: {
      title: title,
      addres: '' + position.x + ', ' + position.y,
      price: getRandom(1000, 1000000),
      type: convertOfferType(TYPE[getRandom(0, TYPE.length - 1)]),
      rooms: getRandom(1, 5),
      guests: getRandom(1, 12),
      checkin: CHECKIN[getRandom(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandom(0, CHECKOUT.length - 1)],
      features: randomLengthArr(randomFeatures),
      description: '',
      photos: compareRandomArr(randomPhotos)
    }
  };
  return estateObject;
};

// Создание объектов.
var getObjects = function (count) {
  var estateObjects = [];
  for (var i = 0; i < count; i++) {
    estateObjects.push(createObject(i + 1));
    // console.log(estateObjects[i]);
  }
  return estateObjects;
};


var configPin = function (estateObject) {
  var newPin = mapPin.cloneNode(true);
  newPin.style.left = estateObject.position.x - PIN_WIDTH / 2 + 'px';
  newPin.style.top = estateObject.position.y - PIN_HEIGHT + 'px';

  newPin.querySelector('img').src = estateObject.author.avatar;
  newPin.querySelector('img').alt = estateObject.title;
  return newPin;
};
// Отрисовка метки
var renderPins = function (pins) {
  for (var i = 0; i < pins.length; i++) {
    pinsGroup.appendChild(configPin(pins[i]));
  }
  mapPins.appendChild(pinsGroup);

};
var renderPhotos = function (photosArray) {

  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photosArray.length; i++) {
    var newPhoto = photoElem.cloneNode(true);
    newPhoto.src = photosArray[i];
    photosFragment.appendChild(newPhoto);
  }
  return photosFragment;
};
var renderFeatures = function (features) {
  var featureFragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var newFeature = featuresList.querySelector('.popup__feature--' + features[i]);
    featureFragment.appendChild(newFeature);
  }

  return featureFragment;
};


// Отрисовка объявления
var renderCard = function (estateObject) {
  var cardElement = mapCard.cloneNode(true);
  cardElement.querySelector('img').src = estateObject.author.avatar;
  cardElement.querySelector('.popup__title').textContent = estateObject.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = estateObject.offer.addres;
  cardElement.querySelector('.popup__text--price').textContent = estateObject.offer.price + ' \u20bd' + '/ночь';
  cardElement.querySelector('.popup__type').textContent = estateObject.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = estateObject.offer.rooms + ' комнаты для ' + estateObject.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + estateObject.offer.checkin + ', выезд до ' + estateObject.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(renderFeatures(estateObject.offer.features));
  cardElement.querySelector('.popup__description').textContent = estateObject.offer.description;
  cardElement.querySelector('.popup__photos').appendChild(renderPhotos(estateObject.offer.photos));
  return cardElement;
};

var showMap = function () {
  var estateObjects = getObjects(OBJECTS_COUNT);
  renderPins(estateObjects);
  map.insertBefore(renderCard(estateObjects[0]), map.querySelector('.map__filters-container'));
  map.classList.remove('map--faded');
};
showMap();
