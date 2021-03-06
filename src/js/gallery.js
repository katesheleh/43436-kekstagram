'use strict';

var galleryContainer = document.querySelector('.gallery-overlay');
var closeElement = galleryContainer.querySelector('.gallery-overlay-close');
var imgElement = galleryContainer.querySelector('.gallery-overlay-image');
var likesCount = galleryContainer.querySelector('.likes-count');
var commentsCount = galleryContainer.querySelector('.comments-count');

function Gallery() {
  this.pictures = [];
  this.activePicture = 0;

  var self = this;

  this.hide = function(event) {
    event.preventDefault();
    galleryContainer.classList.add('invisible');
  };

  closeElement.addEventListener('click', this.hide);

  this.show = function(num) {
    galleryContainer.classList.remove('invisible');
    setActivePicture(num);
  };

  imgElement.addEventListener('click', function() {
    var next = self.activePicture + 1;
    if (next >= self.pictures.length) {
      return setActivePicture(0);
    } else {
      return setActivePicture(next);
    }
  });

  this.setPictures = function(pictures) {
    self.pictures = pictures;
  };


  var setActivePicture = function(num) {
    self.activePicture = num;
    imgElement.src = self.pictures[self.activePicture].url;
    likesCount.textContent = self.pictures[self.activePicture].likes;
    commentsCount.textContent = self.pictures[self.activePicture].comments;
  };
}

var myGallery = new Gallery();

module.exports = myGallery;
