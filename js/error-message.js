'use strict';

(function () {
  var createErrorMessage = function (textMessage) {
    error.textContent = textMessage;
    error.classList.remove('hidden');
  };
  // Действия для закрытия ошибки при отправке формы
  var closeErrorMessage = function () {
    error.classList.add('hidden');
  };

  var errorClickHanler = function () {
    closeErrorMessage();
  };
  var error = document.querySelector('.error');

  window.errorMessage = {
    createErrorMessage: createErrorMessage,
    errorClickHanler: errorClickHanler
  };
})();
