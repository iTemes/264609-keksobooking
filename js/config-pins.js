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
    pins.forEach(function (pin) {
      var pinElement = configPin(pin);
      pinElements.push(pinElement);

      mapPinsGroup.appendChild(pinElement);
      addPinClickHandler(pinElement, pin);
    });
  };
  // Удаление меток
  var removePins = function () {
    pinElements.forEach(function (pin) {
      pin.remove();
    });
    pinElements = [];
  };
  var activatePin = function (pinElement) {
    pinElement.classList.add('map__pin--active');
  };
  var removeActivePin = function () {
    var activePins = pinElements.filter(function (pin) {
      return pin.classList.contains('map__pin--active');
    });

    activePins.forEach(function (item) {
      item.classList.remove('map__pin--active');
    });
  };
  // Отрисовка карточки при нажатии на метку, закрытие карточки при переключении на другие метки
  var addPinClickHandler = function (pinElement, pin) {
    pinElement.addEventListener('click', function () {
      var cardElement = window.popupCard.renderCard(pin);

      window.popupCard.closeCard();
      removeActivePin();
      activatePin(pinElement);

      window.mapBlock.map.insertBefore(cardElement, mapFiltersContainer);
    });
  };
  // Секция перед которой идет вставка меток
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  // Секция для вставки меток.
  var mapPinsGroup = document.querySelector('.map__pins');
  var mapPin = document.querySelector('template').content.querySelector('.map__pin');
  var pinElements = [];
  window.configPinsBlock = {
    renderPins: renderPins,
    removePins: removePins,
    removeActivePin: removeActivePin
  };
})();
