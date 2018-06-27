'use strict';

(function () {
  var formSubmitButtonClickHandler = function () {
  };
  var setPosition = function (position) {
    addressField.value = position.x + ', ' + position.y;
  };
  var disableForm = function () {

    for (var i = 0; i < fieldsForm.length; i++) {
      fieldsForm[i].disabled = true;
    }
    avatarLoad.disabled = true;
    infoForm.classList.add('ad-form--disabled');
    infoForm.reset();
  };
  var enableForm = function () {
    for (var i = 0; i < fieldsForm.length; i++) {
      fieldsForm[i].disabled = false;
    }
    avatarLoad.disabled = false;
    infoForm.classList.remove('ad-form--disabled');
  };
  var clearRoomAndCopacity = function () {
    roomNum.selectedIndex = -1;
    capacity.selectedIndex = -1;
  };
  var estateTypeInputHandler = function () {
    if (estateType.value === 'bungalo') {
      estateMinPrice.setAttribute('placeholder', '0');
      estateMinPrice.setAttribute('min', '0');
    } else if (estateType.value === 'flat') {
      estateMinPrice.setAttribute('placeholder', '1000');
      estateMinPrice.setAttribute('min', '1000');
    } else if (estateType.value === 'house') {
      estateMinPrice.setAttribute('placeholder', '5000');
      estateMinPrice.setAttribute('min', '5000');
    } else {
      estateMinPrice.setAttribute('placeholder', '10000');
      estateMinPrice.setAttribute('min', '10000');
    }
  };
  var timeInChangeHandler = function () {
    for (var i = 0; i < timeIn.options.length; i++) {
      if (timeIn.options[i].selected) {
        timeOut.options[i].selected = true;
      }
    }
  };
  var timeOutChangeHandler = function () {
    for (var i = 0; i < timeOut.options.length; i++) {
      if (timeOut.options[i].selected) {
        timeIn.options[i].selected = true;
      }
    }
  };
  var roomAndCapacityChangeHandler = function (evt) {
    if (roomNum.value === '100' && capacity.value !== '0') {
      evt.target.setCustomValidity('Выбор "100 комнат" соответсвует только пункту "не для гостей" в выборе "Количество мест"');
      return;
    }
    if (roomNum.value !== '100' && capacity.value === '0') {
      evt.target.setCustomValidity('Выбор "не для гостей" соответсвует только пункту "100 комнат" в выборе "Количество комнат"');
      return;
    }
    if (roomNum.value !== '100' && capacity.value !== '0' && roomNum.value < capacity.value) {
      evt.target.setCustomValidity('Выберите меньшее кол-во гостей или увеличьте кол-во комнат');
    } else {
      roomNum.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  };
  var resetFormClickHandler = function () {
    window.mapBlock.disablePage();
  };

  var infoForm = document.querySelector('.ad-form');
  var fieldsForm = infoForm.querySelectorAll('.ad-form__element');
  var addressField = infoForm.querySelector('#address');
  var avatarLoad = infoForm.querySelector('.ad-form-header__input');
  var estateType = document.querySelector('#type');
  var estateMinPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNum = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var resetForm = document.querySelector('.ad-form__reset');
  var formSubmitButton = document.querySelector('.ad-form__submit');

  clearRoomAndCopacity();

  estateType.addEventListener('input', estateTypeInputHandler);
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);
  roomNum.addEventListener('change', roomAndCapacityChangeHandler);
  capacity.addEventListener('change', roomAndCapacityChangeHandler);
  resetForm.addEventListener('click', resetFormClickHandler);
  formSubmitButton.addEventListener('click', formSubmitButtonClickHandler);

  window.mapForm = {
    setPosition: setPosition,
    disableForm: disableForm,
    enableForm: enableForm
  };
})();
