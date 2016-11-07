'use strict';

var Pic = require('./picture.js');
var getPage = require('./get-page.js');
var loadData = require('./loadData.js');

var container = document.querySelector('.pictures');
var filters = document.querySelector('.filters');
var THROTTLE_DELAY = 100;
var PAGE_SIZE = 12;
var pageNumber = 0;
var activeFilter = 'filter-popular';

var renderPictures = function(pictures, page, replace) {
  if (replace) {
    container.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  filters.classList.add('hidden');

  getPage(pictures, from, to).forEach(function(picture, index) {
    var myPic = new Pic(picture, index);
    container.appendChild(myPic.element);
  });

  filters.classList.remove('hidden');
};


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



module.exports = renderPictures;
