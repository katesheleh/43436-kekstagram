'use strict';

(function() {

  // Прячем блок с фильтрами .filters, добавляя ему класс hidden и сохраняем фотографии в массив pictures

  var filtersHidden = document.querySelector('.filters');

  if( !filtersHidden.classList.contains('hidden') ) {
    filtersHidden.classList.add('hidden');
  }

  var pictures = [];

  //  Исходные данные bin/data/data.json

  var FOTOS_LOAD_URL = 'js/data.json';
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var container = document.querySelector('.pictures');

  var load = function(url, callback, callbackName) {
    if (!callbackName) {
      callbackName = 'name' + Date.now();
    }

    window[callbackName] = function(data) {
      callback(data);
    }

    var script = document.createElement('script');
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);

  };

  var getPictureElement = function(picture) {
    var fotoBlock = templateContainer.querySelector('.picture').cloneNode(true);
    fotoBlock.querySelector('.picture-comments').textContent = picture.comments;
    fotoBlock.querySelector('.picture-likes').textContent = picture.likes;

    var contentImage = new Image();

    // Обработчик загрузки
    contentImage.onload = function() {
      contentImage.src = picture.url;
      contentImage.width = 182;
      contentImage.height = 182;
    }

    // Обработчик ошибки
    contentImage.onerror = function() {
      hotelElement.classList.add('picture-load-failure');
    };

    return picture.comments;
    return picture.likes;
  };

  // Создание для каждой записи массива pictures блок фотографии на основе шаблона #picture-template.
  var renderPictures = function(pictures) {
    pictures.forEach(function(picture) {
      container.appendChild(getPictureElement(picture));

      // Отображает блок с фильтрами.
      filtersHidden.classList.remove('hidden');
    })
  };

  load(FOTOS_LOAD_URL, renderPictures(), '__jsonCallback');

})();
