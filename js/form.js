'use strict';

(function () {

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
    clearRoomAndCopacity();
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

  // Действие при успешной отправке формы
  var submitFormSuccessHandler = function () {
    window.mapBlock.disablePage();
    successMessage.classList.remove('hidden');
    document.addEventListener('click', successMessageClickHandler);
    document.addEventListener('keydown', successMessageEscPressHandler);
  };
  // Действия для закрытия сообщения об успешной отправки формы
  var closeSuccessMessage = function () {
    successMessage.classList.add('hidden');
    document.removeEventListener('click', successMessageClickHandler);
    document.removeEventListener('keydown', successMessageEscPressHandler);
  };
  var successMessageClickHandler = function () {
    closeSuccessMessage();
  };
  var successMessageEscPressHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      closeSuccessMessage();
    }
  };
  // Действия для закрытия ошибки при отправке формы
  var closeErrorMessage = function () {
    var error = document.querySelector('.error');

    if (error) {
      document.body.removeChild(error);
    }

    document.removeEventListener('click', errorClickHanler);
  };
  var errorClickHanler = function () {
    closeErrorMessage();
  };
  // Отрисовка сообщения  при возникновении ошибки
  var submitFormErrorHandler = function (textMessage) {
    window.errorMessage.createErrorMessage(textMessage);
    document.addEventListener('click', errorClickHanler);
  };

  // Отправка данных формы на сервер
  var formSubmitHandler = function (evt) {
    window.backend.upload(new FormData(infoForm), submitFormSuccessHandler, submitFormErrorHandler);
    evt.preventDefault();
  };

  var successMessage = document.querySelector('.success');
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


  estateType.addEventListener('input', estateTypeInputHandler);
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);
  roomNum.addEventListener('change', roomAndCapacityChangeHandler);
  capacity.addEventListener('change', roomAndCapacityChangeHandler);
  resetForm.addEventListener('click', resetFormClickHandler);
  infoForm.addEventListener('submit', formSubmitHandler);

  window.mapForm = {
    setPosition: setPosition,
    disableForm: disableForm,
    enableForm: enableForm
  };
})();
