'use strict';

(function () {

  // Действия со страницей
  var enablePage = function () {
    map.classList.remove('map--faded');
    window.mapForm.enableForm();
    window.configPinsBlock.renderPins(window.dataBlock.estateObjects);
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

  var map = document.querySelector('.map');

  disablePage();

  window.mapBlock = {
    disablePage: disablePage,
    enablePage: enablePage,
    map: map
  };
})();
