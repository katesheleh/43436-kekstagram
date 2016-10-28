'use strict';

var getPictureElement = require('./picture.js');

var container = document.querySelector('.pictures');
var filters = document.querySelector('.filters');

var renderPictures = function(pictures) {

  filters.classList.add('hidden');

  pictures.forEach(function(picture) {
    container.appendChild(getPictureElement(picture));
  });

  filters.classList.remove('hidden');
};

module.exports = renderPictures;
