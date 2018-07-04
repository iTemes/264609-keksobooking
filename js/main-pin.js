'use strict';

(function () {
  // module5-task1
  var MAIN_PIN_SIZE = {
    x: 62,
    y: 62
  };
  var getMainPinPosition = function () {
    var mainPinPosition = {
      x: mainPin.offsetLeft + Math.floor(MAIN_PIN_SIZE.x / 2),
      y: mainPin.offsetTop + MAIN_PIN_SIZE.y
    };
    return mainPinPosition;
  };
  var resetMainPin = function () {
    mainPin.style.left = mainPinStartCoords.x;
    mainPin.style.top = mainPinStartCoords.y;
  };

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinStartCoords = {
    x: '570px',
    y: '375px'
  };

  mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.ClientX,
      y: evt.ClientY
    };
    var dragLimit = {
      x: {
        MIN: 0,
        MAX: 1200
      },
      y: {
        MIN: 130,
        MAX: 630
      }
    };
    if (window.mapBlock.getIsMapActive()) {
      var mouseMoveHandler = function (moveEvt) {
        // Включение активного режима карты
        window.mapBlock.isMapDisabled();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var mainPinCoords = getMainPinPosition();
        if (mainPinCoords.y - shift.y >= dragLimit.y.MIN && mainPinCoords.y - shift.y <= dragLimit.y.MAX) {
          mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
        }
        if (mainPinCoords.x - shift.x >= dragLimit.x.MIN && mainPinCoords.x - shift.x <= dragLimit.x.MAX) {
          mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
        }
        window.mapForm.setPosition(mainPinCoords);
      };
      var mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  });

  window.mainPinBlock = {
    mainPinStartCoords: mainPinStartCoords,
    mainPin: mainPin,
    getMainPinPosition: getMainPinPosition,
    resetMainPin: resetMainPin
  };
})();
