'use strict';

var getPictureElement = require('./getPictureElement.js');
var gallery = require('./gallery.js');

var Picture = function(data, element) {
  this.data = data;
  this.element = getPictureElement(data, element);

  var self = this;

  this.element.addEventListener('click', function(event) {
    event.preventDefault();
    gallery.show(element);
  });

  this.remove = function() {
    self.element.removeEventListener('click', this.hide);
  };
};


module.exports = Picture;
