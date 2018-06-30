'use strict';

(function () {
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

  // Массив для хранения уже использующихся заголовков.
  var usedTitles = [];

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
  // Создание объекта.
  var createObject = function (avatarCount) {
    var title = window.utils.nonEqualRandom(TITLE, usedTitles);
    usedTitles.push(title);
    var randomPhotos = PHOTOS.slice(0);
    var randomFeatures = FEATURES.slice(0);
    var position = {
      x: window.utils.getRandom(300, 900),
      y: window.utils.getRandom(130, 630)
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
        price: window.utils.getRandom(1000, 1000000),
        type: convertOfferType(TYPE[window.utils.getRandom(0, TYPE.length - 1)]),
        rooms: window.utils.getRandom(1, 5),
        guests: window.utils.getRandom(1, 12),
        checkin: CHECKIN[window.utils.getRandom(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[window.utils.getRandom(0, CHECKOUT.length - 1)],
        features: window.utils.randomLengthArr(randomFeatures),
        description: '',
        photos: window.utils.compareRandomArr(randomPhotos)
      }
    };
    return estateObject;
  };

  // Создание объектов.
  var getObjects = function (count) {
    var estateObjects = [];
    for (var i = 0; i < count; i++) {
      estateObjects.push(createObject(i + 1));
    }
    return estateObjects;

  };
  // Массив с объектами
  var estateObjects = getObjects(OBJECTS_COUNT);

  window.dataBlock = {
    estateObjects: estateObjects,
    convertOfferType: convertOfferType
  };
})();
