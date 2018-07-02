'use strict';

(function () {
  var enablePage = function () {
    map.classList.remove('map--faded');
    window.mapForm.enableForm();
    window.bookingFilter.filterChangeHandler();
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

  var loadData = [];
  var map = document.querySelector('.map');
  var successHandler = function (data) {
    loadData = data;
  };
  var erorrHandler = function (textMessage) {
    window.errorMessage.createErrorMessage(textMessage);
    document.addEventListener('click', window.mapForm.errorClickHanler);
  };
  window.backend.load(successHandler, erorrHandler);

  disablePage();


  window.mapBlock = {
    disablePage: disablePage,
    enablePage: enablePage,
    map: map,
    isMapDisabled: isMapDisabled,
    getLoadData: function () {
      return loadData;
    }
  };
})();
