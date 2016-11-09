'use strict';

var getSearchString = function(params) {
  return Object.keys(params).map(function(param) {
    return [param, params[param]].join('=');
  }).join('&');
};

var loadData = function(url, params, callback) {

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  });

  xhr.open('GET', url + '?' + getSearchString(params));
  xhr.send();
};

module.exports = loadData;
