'use strict';

var gallery = require('./gallery.js');

var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;
var IMAGE_LOAD_TIMEOUT = 10000;

var getPictureElement = function(picture) {
  var fotoBlock = templateContainer.querySelector('.picture').cloneNode(true);
  fotoBlock.querySelector('.picture-comments').textContent = picture.comments;
  fotoBlock.querySelector('.picture-likes').textContent = picture.likes;
  this.element = fotoBlock;

  var pic = fotoBlock.querySelector('img');

  var contentImage = new Image(182, 182);
  var imageTimeout = null;

  contentImage.onload = function() {
    clearTimeout(imageTimeout);
    pic.src = picture.url;
  };

  contentImage.onerror = function() {
    clearTimeout(imageTimeout);
    fotoBlock.classList.add('picture-load-failure');
  };

  // здесь у меня затруднения. Запуталась.
  this.element.addEventListener('click', function(event) {
    // как передать нужный аргумент сюда?
    gallery.show();
    event.preventDefault();
  });

  this.element.onclick = ;

  contentImage.src = picture.url;

  imageTimeout = setTimeout(function() {
    contentImage.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return fotoBlock;
};

module.exports = getPictureElement;
