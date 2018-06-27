'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var nonEqualRandom = function (arr, existArr) {
    var index = getRandom(0, arr.length - 1);
    var elem = arr[index];
    if (existArr.includes(elem)) {
      return nonEqualRandom(arr, existArr);
    } else {
      return elem;
    }
  };
  //  Функия для передачи в compareRandomArr для сортировки
  var compareRandom = function () {
    return Math.random() - 0.5;
  };
  // Функция для случайного порядка элементов в массиве.
  var compareRandomArr = function (arr) {
    return arr.sort(compareRandom);
  };
  // Функция массива строк случайной длины
  var randomLengthArr = function (arr) {
    var indexForSlice = getRandom(-arr.length, arr.length - 1);
    var resultArr = arr.slice(0);
    compareRandomArr(resultArr);
    return resultArr.slice(indexForSlice);
  };

  window.utils = {
    ESC_KEY_CODE: ESC_KEY_CODE,
    getRandom: getRandom,
    nonEqualRandom: nonEqualRandom,
    compareRandom: compareRandom,
    compareRandomArr: compareRandomArr,
    randomLengthArr: randomLengthArr
  };
})();
