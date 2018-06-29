'use strict';

(function () {

  // Действия со страницей
  var enablePage = function () {
    map.classList.remove('map--faded');
    window.mapForm.enableForm();
    window.configPinsBlock.renderPins(estateObjects);
  };
  var disablePage = function () {
    window.mapForm.disableForm();
    disableMap();
  };
  var disableMap = function () {
    window.configPinsBlock.removePins();
    window.popupCard.closeCard();
    window.mainPinBlock.resetMainPin();
    window.mapForm.setPosition(window.mainPinBlock.getMainPinPosition());
    map.classList.add('map--faded');
  };
  var isMapDisabled = function () {
    if (window.mapBlock.map.classList.contains('map--faded')) {
      window.mapBlock.enablePage();
    }
  };

  var estateObjects = [];
  var map = document.querySelector('.map');
  var successHandler = function (data) {
    estateObjects = data;
  };
  var erorrHandler = function (textMessage) {
    window.errorMessage.createErrorMessage(textMessage);
  };
  window.backend.load(successHandler, erorrHandler);

  disablePage();

  window.mapBlock = {
    disablePage: disablePage,
    enablePage: enablePage,
    map: map,
    isMapDisabled: isMapDisabled
  };
})();
