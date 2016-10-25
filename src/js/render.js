'use strict';

var container = document.querySelector('.pictures');

var renderPictures = function(pictures) {
  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');

  pictures.forEach(function(picture) {
    container.appendChild(getPictureElement(picture));
  });

  filters.classList.remove('hidden');
};
