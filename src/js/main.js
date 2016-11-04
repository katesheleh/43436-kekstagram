'use strict';

var loadData = require('./loadData.js');
var render = require('./render.js');
var gallery = require('./gallery.js');


loadData('http://localhost:1507/api/pictures', function(pictures) {
  render(pictures, 0, true);
  gallery.setPictures(pictures);
});

