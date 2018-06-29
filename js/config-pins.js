'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  // Создание метки
  var configPin = function (pin) {
    var newPin = mapPin.cloneNode(true);
    newPin.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    newPin.style.top = pin.location.y - PIN_HEIGHT + 'px';

    newPin.querySelector('img').src = pin.author.avatar;
    newPin.querySelector('img').alt = pin.title;
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
  var removeActivePin = function () {
    var activePins = document.querySelectorAll('.map__pin--active');
    for (var i = 0; i < activePins.length; i++) {
      if (activePins[i].classList.contains('map__pin--active')) {
        activePins[i].classList.remove('map__pin--active');
      }
    }
  };
  // Отрисовка карточки при нажатии на метку, закрытие карточки при переключении на другие метки
  var addPinClickHandler = function (pinElement, pin) {
    pinElement.addEventListener('click', function () {
      var cardElem = window.popupCard.renderCard(pin);
      var closeButton = cardElem.querySelector('.popup__close');
      window.popupCard.closeCard();
      removeActivePin();
      pinElement.classList.add('map__pin--active');
      closeButton.addEventListener('click', window.popupCard.closeCard);
      document.addEventListener('keydown', window.popupCard.cardEscPressHandler);
      window.mapBlock.map.insertBefore(cardElem, mapFiltersContainer);
    });
  };
  // Секция перед которой идет вставка меток
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  // Секция для вставки меток.
  var mapPinsGroup = document.querySelector('.map__pins');
  var mapPin = document.querySelector('template').content.querySelector('.map__pin');

  window.configPinsBlock = {
    renderPins: renderPins,
    removePins: removePins,
    removeActivePin: removeActivePin
  };
})();
