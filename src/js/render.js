'use strict';

var Pic = require('./picture.js');

var container = document.querySelector('.pictures');
var filters = document.querySelector('.filters');

var renderPictures = function(pictures, total) {

  filters.classList.add('hidden');

  pictures.forEach(function(picture, index) {
    var myPic = new Pic(picture, index + total);
    container.appendChild(myPic.element);
  });

  filters.classList.remove('hidden');
};


module.exports = renderPictures;
