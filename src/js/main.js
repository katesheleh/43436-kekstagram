'use strict';
var upload = require('./upload.js');
var loadData = require('./loadData.js');
var render = require('./render.js');
var gallery = require('./gallery.js');

var LARGE_SCREEN = 1024;
var PAGE_SIZE = 12;
var GAP = 120;
var pageNumber = 0;
var activeFilter = 'filter-popular';

upload.cleanupResizer();
upload.updateBackground();

if (window.innerHeight >= LARGE_SCREEN) {
  PAGE_SIZE = 26;
}

var container = document.querySelector('.pictures');
var filters = document.querySelector('.filters');
var footer = document.querySelector('footer');
var loadedPictures = [];

var renderPictures = function(pictures) {
  render(pictures, loadedPictures.length);
  loadedPictures = loadedPictures.concat(pictures);
  gallery.setPictures(loadedPictures);
};

var isNextPageAvailable = function(pictures, page, pageSize) {
  return page < Math.floor(pictures.length / pageSize);
};

var loadPics = function(filter, pageNum) {
  loadData('http://localhost:1507/api/pictures', {
    from: pageNum * PAGE_SIZE,
    to: pageNum * PAGE_SIZE + PAGE_SIZE,
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
    loadedPictures = [];
    changeFilter(event.target.getAttribute('for'));
  }
});

window.addEventListener('load', function() {
  if (window.innerHeight >= LARGE_SCREEN) {
    loadPics(activeFilter, ++pageNumber);
  }
});

function debounce(fn, delay) {
  var timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn();
    }, delay);
  };
}


var getLoadPics = debounce(function() {
  if (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP && isNextPageAvailable(loadedPictures, pageNumber, PAGE_SIZE)) {
    loadPics(activeFilter, ++pageNumber);
  }
  console.log('throttle');
}, 100);

window.addEventListener('scroll', getLoadPics);

changeFilter(activeFilter);
