'use strict';

var galleryContainer = document.querySelector('.gallery-overlay');
var closeElement = galleryContainer.querySelector('.gallery-overlay-close');
var imgElement = galleryContainer.querySelector('.gallery-overlay-image');
var likesCount = galleryContainer.querySelector('.likes-count');
var commentsCount = galleryContainer.querySelector('.comments-count');
var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;
var fotoBlock = templateContainer.querySelector('.picture').cloneNode(true);

var pictures = [];
var activePicture = 0;

function Gallery() {

  var self = this;

  var hide = function(event) {
    event.preventDefault();
    galleryContainer.classList.add('invisible');
  };

  closeElement.addEventListener('click', hide);

  var show = function(num) {

    galleryContainer.classList.remove('invisible');

    setPictures.forEach(function() {
      self.setActivePictures(num++);
    });
  };

  fotoBlock.addEventListener('click', show);

  self.setPictures = function(pictures) {
    self.pictures = pictures;
  };


  var setActivePicture = function(num) {
    activePicture = num;
    imgElement.src = self.pictures[activePicture].url;
    likesCount.textContent = self.pictures[activePicture].likes;
    commentsCount.textContent = self.pictures[activePicture].comments;
  };
}



var myGallery = new Gallery();

module.exports = myGallery;
