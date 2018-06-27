﻿'use strict';

(function () {
  var closeCard = function () {
    var estateCard = document.querySelector('.map__card');
    if (estateCard) {
      window.mapBlock.map.removeChild(estateCard);
    }
  };
  var cardEscPressHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      closeCard();
    }
    document.removeEventListener('keydown', cardEscPressHandler);
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
  var renderPhotos = function (photosArray) {
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      var newPhoto = photoElem.cloneNode(true);
      newPhoto.src = photosArray[i];
      photosFragment.appendChild(newPhoto);
    }
    return photosFragment;
  };
  var clearPhotoGroup = function () {
    photosGroup.removeChild(photoElem);
  };
  var renderFeatures = function (features) {
    var featureFragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + features[i]);
      featureFragment.appendChild(featureElement);
    }
    return featureFragment;
  };
  var mapPinTemplate = document.querySelector('template');
  var mapCard = mapPinTemplate.content.querySelector('.map__card');
  var photosGroup = mapCard.querySelector('.popup__photos');
  var photoElem = photosGroup.querySelector('img');
  clearPhotoGroup();

  window.popupCard = {
    renderCard: renderCard,
    cardEscPressHandler: cardEscPressHandler,
    closeCard: closeCard
  };
})();
