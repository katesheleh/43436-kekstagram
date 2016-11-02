'use strict';
var gallery = require('./gallery.js');

var getPictureElement = require('./picture.js');
var container = document.querySelector('.pictures');
var filters = document.querySelector('.filters');

var renderPictures = function(pictures) {

  filters.classList.add('hidden');

  gallery.setPictures(pictures).forEach(function(picture, index) {
    container.appendChild(getPictureElement(picture, index));
  });

  filters.classList.remove('hidden');
};

module.exports = renderPictures;
