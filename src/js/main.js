'use strict';

var loadData = require('./loadData.js');
var render = require('./render.js');
var gallery = require('./gallery.js');

var THROTTLE_DELAY = 100;
var PAGE_SIZE = 12;
var pageNumber = 0;
var activeFilter = 'filter-popular';

var Pic = require('./picture.js');
var getPage = require('./get-page.js');
var loadData = require('./loadData.js');

var container = document.querySelector('.pictures');
var filters = document.querySelector('.filters');


loadData('http://localhost:1507/api/pictures', {
  from: pageNumber * PAGE_SIZE,
  to: pageNumber * PAGE_SIZE + PAGE_SIZE,
  filter: activeFilter
}, function(pictures) {
  render(pictures, 0, true);
  gallery.setPictures(pictures);
});

// scroll

var isBottomReached = function() {
  var footerElement = document.querySelector('footer');
  var footerPosition = footerElement.getBoundingClientRect();
  return footerPosition.top - window.innerHeight - 120 <= 0;
};


var isNextPageAvailable = function(pictures, page, pageSize) {
  return page < Math.floor(pictures.length / pageSize);
};


var setScrollEnabled = function() {
  var lastCall = Date.now();

  window.addEventListener('scroll', function() {
    if (Date.now() - lastCall >= THROTTLE_DELAY) {
      if (isBottomReached()) {
        pageNumber++;
        loadPics(activeFilter, ++pageNumber);
      }

      lastCall = Date.now();
    }
  });
};

setScrollEnabled();
// filters

var loadPics = function(filter, pageNumber) {
  loadData('http://localhost:1507/api/pictures', {
    from: pageNumber * PAGE_SIZE,
    to: pageNumber * PAGE_SIZE + PAGE_SIZE,
    filter: filter
  }, renderPictures);
};

var changeFilter = function(filterID) {
  container.innerHTML = '';
  activeFilter = filterID;
  pageNumber = 0;
  loadPics(filterID, pageNumber);
};


filters.addEventListener('click', function(event) {
  if (event.target.classList.contains('filters-item')) {
    changeFilter(event.target.getAttribute('for'));
  }
});
