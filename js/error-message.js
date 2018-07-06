'use strict';

(function () {
  var createErrorMessage = function (textMessage) {
    var message = document.createElement('div');
    message.classList.add('error');
    message.style = 'z-index: 100; margin: auto; text-align: center; background-color: #FF6347;';
    message.style.opacity = 0.9;
    message.style.position = 'fixed';
    message.style.top = 0;
    message.style.left = 0;
    message.style.right = 0;
    message.style.bottom = 0;
    message.style.width = '350px';
    message.style.height = '100px';
    message.style.borderRadius = '20px';
    message.style.boxShadow = '0px 15px 20px rgba(0, 0, 0, 0.22), 0px 19px 60px rgba(0, 0, 0, 0.3)';
    message.style.fontSize = '20px';
    message.style.lineHeight = '40px';
    message.style.color = '000000';

    message.textContent = textMessage;
    document.body.insertAdjacentElement('afterbegin', message);
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

  window.errorMessage = {
    createErrorMessage: createErrorMessage,
    errorClickHanler: errorClickHanler
  };
})();
