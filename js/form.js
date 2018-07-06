'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var setPosition = function (position) {
    addressField.value = position.x + ', ' + position.y;
  };
  var disableFields = function () {
    fieldsForm.forEach(function (item) {
      item.disabled = true;
    });

    avatarLoadInput.disabled = true;
  };

  var enableFields = function () {
    fieldsForm.forEach(function (item) {
      item.disabled = false;
    });

    avatarLoadInput.disabled = false;
  };
  var disableForm = function () {
    resetAvatarLoad();
    disableFields();
    clearPhotoContainer();
    infoForm.classList.add('ad-form--disabled');
    infoForm.reset();
  };
  var enableForm = function () {
    enableFields();
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
    Array.from(timeIn.options).forEach(function (item, i) {
      if (item.selected) {
        timeOut.options[i].selected = true;
      }
    });
  };
  var timeOutChangeHandler = function () {
    Array.from(timeOut.options).forEach(function (item, i) {
      if (item.selected) {
        timeIn.options[i].selected = true;
      }
    });
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
    window.bookingFilter.resetFilters();
    window.mapBlock.disablePage();
  };

  // Действие при успешной отправке формы
  var submitFormSuccessHandler = function () {
    resetFormClickHandler();
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
    if (evt.keyCode === window.ESC_KEY_CODE) {
      closeSuccessMessage();
    }
  };

  // Отрисовка сообщения  при возникновении ошибки
  var submitFormErrorHandler = function (textMessage) {
    window.errorMessage.createErrorMessage(textMessage);
  };

  // Отправка данных формы на сервер
  var formSubmitHandler = function (evt) {
    window.backend.upload(new FormData(infoForm), submitFormSuccessHandler, submitFormErrorHandler);
    evt.preventDefault();
  };

  // Превью фотографий объявления
  var avatarLoadChangeHandler = function () {
    var file = avatarLoadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  var createPhotoContainer = function (src) {
    var newContainer = document.createElement('div');
    var newPhoto = document.createElement('img');

    newContainer.classList.add('ad-form__photo');
    newPhoto.alt = 'Фотография жилья';
    newPhoto.src = src;

    newContainer.appendChild(newPhoto);
    photoContainer.appendChild(newContainer);
  };

  var photoLoadChangeHandler = function () {
    var file = photoLoadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {

        createPhotoContainer(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  var resetAvatarLoad = function () {
    avatarPreview.src = DEFAULT_AVATAR_SRC;
  };

  var clearPhotoContainer = function () {
    photoContainer.querySelectorAll('.ad-form__photo').forEach(function (item) {
      item.remove();
    });
  };

  var successMessage = document.querySelector('.success');
  var infoForm = document.querySelector('.ad-form');
  var fieldsForm = infoForm.querySelectorAll('.ad-form__element');
  var addressField = infoForm.querySelector('#address');
  var estateType = document.querySelector('#type');
  var estateMinPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNum = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var resetForm = document.querySelector('.ad-form__reset');
  var avatarLoadInput = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var photoLoadInput = document.querySelector('.ad-form__input');
  var photoContainer = document.querySelector('.ad-form__photo-container');


  estateType.addEventListener('input', estateTypeInputHandler);
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);
  roomNum.addEventListener('change', roomAndCapacityChangeHandler);
  capacity.addEventListener('change', roomAndCapacityChangeHandler);
  resetForm.addEventListener('click', resetFormClickHandler);
  infoForm.addEventListener('submit', formSubmitHandler);
  avatarLoadInput.addEventListener('change', avatarLoadChangeHandler);
  photoLoadInput.addEventListener('change', photoLoadChangeHandler);

  window.mapForm = {
    setPosition: setPosition,
    disableForm: disableForm,
    enableForm: enableForm
  };
})();
