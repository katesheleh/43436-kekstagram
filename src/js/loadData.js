'use strict';

var loadData = function(url, callback) {

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  });

  xhr.open('GET', url);
  xhr.send();

  var script = document.createElement('script');
  script.src = url + '?callback=';
  document.body.appendChild(script);
};

module.exports = loadData;
