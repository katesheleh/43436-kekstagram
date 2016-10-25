'use strict';

var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;
var IMAGE_LOAD_TIMEOUT = 10000;

var getPictureElement = function(picture) {
  var fotoBlock = templateContainer.querySelector('.picture').cloneNode(true);
  fotoBlock.querySelector('.picture-comments').textContent = picture.comments;
  fotoBlock.querySelector('.picture-likes').textContent = picture.likes;

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

  contentImage.src = picture.url;

  imageTimeout = setTimeout(function() {
    contentImage.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return fotoBlock;
};
