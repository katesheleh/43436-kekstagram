'use strict';

var loadData = require('./loadData.js');
var render = require('./render.js');
var gallery = require('./gallery.js');


loadData('http://localhost:1507/api/pictures', function(picture) {
  render(picture);
});


gallery();
