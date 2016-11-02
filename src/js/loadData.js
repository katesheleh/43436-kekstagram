'use strict';

var callbackName = 'jsonpRequest';

var loadData = function(url, callback) {

  window[callbackName] = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
};

module.exports = loadData;