'use strict';

var loadData = require('./loadData.js');
var render = require('./render.js');
var gallery = require('./gallery.js');

var LARGE_SCREEN = 1024;
var PAGE_SIZE = 12;
var THROTTLE_TIMEOUT = 200;
var GAP = 120;
var pageNumber = 0;
var activeFilter = 'filter-popular';


if(window.innerHeight >= LARGE_SCREEN) {
  PAGE_SIZE = 26;
}

var container = document.querySelector('.pictures');
var filters = document.querySelector('.filters');
var footer = document.querySelector('footer');


var renderPictures = function(pictures) {
  render(pictures);
  gallery.setPictures(pictures);
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
    changeFilter(event.target.getAttribute('for'));
  }
});

window.addEventListener('load', function() {
  if(window.innerHeight >= LARGE_SCREEN) {
    loadPics(activeFilter, ++pageNumber);
  }
});

var lastCall = Date.now();

window.addEventListener('scroll', function() {
  console.log('scroll');
  if (Date.now() - lastCall >= THROTTLE_TIMEOUT) {
    console.log('complex scroll');
    if (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
      loadPics(activeFilter, ++pageNumber);
    }

    lastCall = Date.now();
  }
});

changeFilter(activeFilter);
