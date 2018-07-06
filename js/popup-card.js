'use strict';

(function () {
  var closeCard = function () {
    var estateCard = document.querySelector('.map__card');
    if (estateCard) {
      window.mapBlock.map.removeChild(estateCard);
    }
    window.configPinsBlock.removeActivePin();
  };
  var cardEscPressHandler = function (evt) {
    if (evt.keyCode === window.ESC_KEY_CODE) {
      closeCard();
    }
    document.removeEventListener('keydown', cardEscPressHandler);
  };
  var isNodeEmpty = function (cardNode, emptyNode) {
    if (emptyNode.childElementCount === 0) {
      cardNode.removeChild(emptyNode);
    }
  };
  // Отрисовка объявления
  var renderCard = function (estateObject) {
    var cardElement = mapCard.cloneNode(true);
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var closeButton = cardElement.querySelector('.popup__close');

    cardElement.querySelector('img').src = estateObject.author.avatar;
    cardElement.querySelector('.popup__title').textContent = estateObject.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = estateObject.offer.addres;
    cardElement.querySelector('.popup__text--price').textContent = estateObject.offer.price + ' \u20bd' + '/ночь';
    cardElement.querySelector('.popup__type').textContent = convertOfferType(estateObject.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = estateObject.offer.rooms + ' комнаты для ' + estateObject.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + estateObject.offer.checkin + ', выезд до ' + estateObject.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardFeatures.appendChild(renderFeatures(estateObject.offer.features));
    isNodeEmpty(cardElement, cardFeatures);
    cardElement.querySelector('.popup__description').textContent = estateObject.offer.description;
    cardPhotos.appendChild(renderPhotos(estateObject.offer.photos));
    isNodeEmpty(cardElement, cardPhotos);

    closeButton.addEventListener('click', closeCard);
    document.addEventListener('keydown', cardEscPressHandler);

    return cardElement;
  };
  var renderPhotos = function (photosArray) {
    var photosFragment = document.createDocumentFragment();
    photosArray.forEach(function (item) {
      var newPhoto = photoElem.cloneNode(true);
      newPhoto.src = item;
      photosFragment.appendChild(newPhoto);
    });

    return photosFragment;
  };
  var clearPhotoGroup = function () {
    photosGroup.removeChild(photoElem);
  };
  var renderFeatures = function (features) {
    var featureFragment = document.createDocumentFragment();

    features.forEach(function (item) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + item);
      featureFragment.appendChild(featureElement);
    });
    return featureFragment;
  };
  var convertOfferType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
    }
    return type;
  };

  var mapPinTemplate = document.querySelector('template');
  var mapCard = mapPinTemplate.content.querySelector('.map__card');
  var photosGroup = mapCard.querySelector('.popup__photos');
  var photoElem = photosGroup.querySelector('img');
  clearPhotoGroup();


  window.popupCard = {
    renderCard: renderCard,
    closeCard: closeCard
  };
})();
