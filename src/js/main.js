'use strict';

var loadData = require('./loadData.js');
var render = require('./render.js');
var gallery = require('./gallery.js');
// var Pic = require('./picture.js');

var PAGE_SIZE = 12;
var THROTTLE_TIMEOUT = 200;
var GAP = 120;
var pageNumber = 0;
var activeFilter = 'filter-popular';

var container = document.querySelector('.pictures');
var filters = document.querySelector('.filters');
var footer = document.querySelector('footer');


var renderPictures = function(pictures) {
  render(pictures, pageNumber, true);
  gallery.setPictures(pictures);
};

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
