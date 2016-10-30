'use strict';

var getPictureElement = require('./picture.js');

function Gallery() {
  var galleryContainer = document.querySelector('.gallery-overlay');
  var closeElement = galleryContainer.querySelector('.gallery-overlay-close');
  var imgElement = galleryContainer.querySelector('.gallery-overlay-image');
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var fotoBlock = templateContainer.querySelector('.picture').cloneNode(true);
  var pictures = [];
  var activePicture = 0;

  this.data = data;
  this.element = getPictureElement(data);

  var self = this;

  var setActivePicture = function(picture) {
    var image = imgElement;
  };

  var hide = function() {
    closeElement.addEventListener('click', function(event) {
      event.preventDefault();
      galleryContainer.classList.add('invisible');
    });
  }();

  var show = function(pics) {

    fotoBlock.addEventListener('click', function(event) {
      event.preventDefault();
      // Этот вызов удаляет указанный класс у элемента с классом gallery-overlay
      galleryContainer.classList.remove('invisible');
    });


    pictures.forEach(function(pic) {
      // да, сюда нужно каким-то образом записать данные....
      // загруженные демо, особенно "Фотогалерея Кексобукинга", ужасны. Без объяснения где и что берется и т.д. Информация очень неудобно подана.
    });
    activePicture = 0;
    setActivePicture(activePicture);
  }();
}

// проверку не проходит из-за ряда неиспользованных значений, которые еще будут доработаны, если будут конечно доработаны..
var imgGallery = new Gallery();

console.log(imgGallery);


module.exports = Gallery;
