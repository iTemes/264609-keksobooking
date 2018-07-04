'use strict';

(function () {
  var enablePage = function () {
    map.classList.remove('map--faded');
    window.mapForm.enableForm();
    window.bookingFilter.enableFilters();
    window.bookingFilter.filterChangeHandler();
  };

  var disablePage = function () {
    window.mapForm.disableForm();
    window.bookingFilter.disableFilters();
    disableMap();
    scrollPage();
  };
  var scrollPage = function () {
    window.scroll(0, 0);
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
    ismapActive = true;
  };

  var erorrHandler = function (textMessage) {
    window.errorMessage.createErrorMessage(textMessage);
    document.addEventListener('click', window.mapForm.errorClickHanler);
  };
  window.backend.load(successHandler, erorrHandler);

  disablePage();

  var ismapActive = false;

  window.mapBlock = {
    disablePage: disablePage,
    enablePage: enablePage,
    map: map,
    isMapDisabled: isMapDisabled,
    getLoadData: function () {
      return loadData;
    },
    getIsMapActive: function () {
      return ismapActive;
    }
  };
})();
