'use strict';

(function() {

  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var container = document.querySelector('.pictures');
  var IMAGE_LOAD_TIMEOUT = 10000;

  var pictures = 'http://localhost:1507/api/pictures';
  var callbackName = 'jsonpRequest';

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

  var renderPictures = function(pictures) {
    var filters = document.querySelector('.filters');
    filters.classList.add('hidden');

    pictures.forEach(function(picture) {
      container.appendChild(getPictureElement(picture));
    })

    filters.classList.remove('hidden');
  };

  var loadData = function(url, callback) {

    window[callbackName] = function(data) {
      callback(data);
    }

    var script = document.createElement('script');
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);
  };

  loadData(pictures, renderPictures);

})();
