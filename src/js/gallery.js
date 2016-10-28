'use strict';

function Gallery() {
  var galleryContainer = document.querySelector('.gallery-overlay');
  var closeElement = galleryContainer.querySelector('.gallery-overlay-close');
  var imgElement = galleryContainer.querySelector('.gallery-overlay-image');
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var fotoBlock = templateContainer.querySelector('.picture').cloneNode(true);
  var pictures = [];
  var activePicture = 0;

  var setActivePicture = function(picture) {
    var image = galleryContainer.querySelectorAll('img');

    // preview.src = image[picture].src;
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
      galleryContainer.classList.remove('invisible');
    });

    pictures.forEach(function(pic) {

    });
    activePicture = 0;
    setActivePicture(activePicture);
  }();
}

var imgGallery = new Gallery();

console.log(imgGallery);



module.exports = Gallery;
