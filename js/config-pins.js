'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  // Создание метки
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
      var pinElement = configPin(pins[i]);
      mapPinsGroup.appendChild(pinElement);
      addPinClickHandler(pinElement, pins[i]);
    }
  };
  // Удаление меток
  var removePins = function () {
    var pinElements = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pinElements.length; i++) {
      if (pinElements[i] !== window.mainPinBlock.mainPin) {
        pinElements[i].remove();
      }
    }
  };
  // Отрисовка карточки при нажатии на метку, закрытие карточки при переключении на другие метки
  var addPinClickHandler = function (pinElement, pin) {
    pinElement.addEventListener('click', function () {
      window.popupCard.closeCard();
      var cardElem = window.popupCard.renderCard(pin);
      cardElem.querySelector('.popup__close').addEventListener('click', window.popupCard.closeCard);
      window.mapBlock.map.insertBefore(cardElem, mapFiltersContainer);
      document.addEventListener('keydown', window.popupCard.cardEscPressHandler);
    });
  };
  // Секция перед которой идет вставка меток
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  // Секция для вставки меток.
  var mapPinsGroup = document.querySelector('.map__pins');
  var mapPin = document.querySelector('template').content.querySelector('.map__pin');

  window.configPinsBlock = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
