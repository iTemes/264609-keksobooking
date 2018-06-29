'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var LOAD_TIMEOUT = 10000;
  var UPLOAD_TIMEOUT = 5000;
  var SUCCESS_CODE = 200;
  var ERRORS = {
    ERROR_LOAD: 'Произошла ошибка во время загрузки. Статус ответа: ',
    ERROR_SERVER: 'Произошла ошибка соединения',
    ERROR_TIMEOUT: 'Запрос не успел выполниться за '
  };
  var LOAD_METHOD = 'GET';
  var UPLOAD_METHOD = 'POST';

  var configXhr = function (loadHandler, errorHandler, url, method, timeout, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        loadHandler(xhr.response);
      } else {
        errorHandler(ERRORS.ERROR_LOAD + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler(ERRORS.ERROR_SERVER);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler(ERRORS.ERROR_TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.timeout = timeout;
    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };
  var load = function (loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, URL_LOAD, LOAD_METHOD, LOAD_TIMEOUT);
  };
  var upload = function (data, loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, URL_UPLOAD, UPLOAD_METHOD, UPLOAD_TIMEOUT, data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
