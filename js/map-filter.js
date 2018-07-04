'use strict';
(function () {
  var ANY_VALUE = 'any';
  var Price = {
    MIN_PRICE: 10000,
    MIDDLE_PRICE: 50000
  };
  var ESTATE_COUNT = 5;
  var priceFilterHandlers = {
    'low': function (estateObject) {
      return estateObject.offer.price <= Price.MIN_PRICE;
    },
    'middle': function (estateObject) {
      return estateObject.offer.price >= Price.MIN_PRICE && estateObject.offer.price <= Price.MIDDLE_PRICE;
    },
    'high': function (estateObject) {
      return estateObject.offer.price > Price.MIDDLE_PRICE;
    },
    'any': function () {
      return true;
    }
  };
  var sameHouseTypes = function (estateObject) {
    return estateObject.offer.type === houseTypeFilter.value || houseTypeFilter.value === ANY_VALUE;
  };
  var samePriceFilter = function (estateObject) {
    var handler = priceFilterHandlers[priceFilter.value];
    if (handler) {
      return handler(estateObject);
    }
    return true;
  };
  var sameRoomFilter = function (estateObject) {
    return estateObject.offer.rooms === +roomFilter.value || roomFilter.value === ANY_VALUE;
  };
  var sameGuestFilter = function (estateObject) {
    return estateObject.offer.guests === +guestFilter.value || guestFilter.value === ANY_VALUE;
  };
  var everyFeaturesFilter = function (estateObject) {
    var isFeature = true;
    featuresFilter.forEach(function (feature) {
      if (feature.checked && estateObject.offer.features.indexOf(feature.value) < 0) {
        isFeature = false;
      }
    });
    return isFeature;
  };
  var checkOffer = function (offer) {
    return (sameHouseTypes(offer) &&
            samePriceFilter(offer) &&
            sameRoomFilter(offer) &&
            sameGuestFilter(offer) &&
            everyFeaturesFilter(offer)
    );
  };
  var getFilteredData = function () {
    var copyData = window.mapBlock.getLoadData().slice();
    return copyData.filter(checkOffer);
  };
  var renderFilteredData = function () {
    var filterData = getFilteredData();
    window.popupCard.closeCard();
    window.configPinsBlock.removePins();
    window.configPinsBlock.renderPins(filterData.slice(0, ESTATE_COUNT));
  };

  var debouncedFilterData = window.debounce(renderFilteredData);

  var filterChangeHandler = function () {
    debouncedFilterData();
  };
  var disableFilters = function () {
    filters.forEach(function (item) {
      item.disabled = true;
    });
    featuresFilter.forEach(function (item) {
      item.disabled = true;
    });
  };
  var enableFilters = function () {
    filters.forEach(function (item) {
      item.disabled = false;
    });
    featuresFilter.forEach(function (item) {
      item.disabled = false;
    });
  };

  var resetFilters = function () {
    mapFilter.reset();
    mapFilter.removeEventListener('change', filterChangeHandler);
  };

  var mapFilter = document.querySelector('.map__filters');
  var filters = document.querySelectorAll('.map__filter');
  var houseTypeFilter = mapFilter.querySelector('#housing-type');
  var priceFilter = mapFilter.querySelector('#housing-price');
  var roomFilter = mapFilter.querySelector('#housing-rooms');
  var guestFilter = mapFilter.querySelector('#housing-guests');
  var featuresFilter = mapFilter.querySelectorAll('.map__checkbox');

  mapFilter.addEventListener('change', filterChangeHandler);

  window.bookingFilter = {
    filterChangeHandler: filterChangeHandler,
    resetFilters: resetFilters,
    disableFilters: disableFilters,
    enableFilters: enableFilters
  };
})();
