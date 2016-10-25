'use strict';

var loadData = require('loadData');
var picture = requiere('picture');
var render = require('render');

loadData('http://localhost:1507/api/pictures', function(picture) {
  picture.forEach(getPictureElement);
});
