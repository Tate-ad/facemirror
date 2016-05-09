/*
 * date: 2016年 05月 08日 星期日 10:17:13 CST
 * author: tate_fan
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var url = require('url');

var request = require('superagent');
var urlMap = require('./map');

var cn_url = 'http://api.cn.faceplusplus.com/';
var us_url = 'http://api.us.faceplusplus.com/';


/**
 * Represents a Face install
 * @constructor
 * @param {null} - delay init
 */
function Face() {
  EventEmitter.call(this);
  this._api_key = '';
  this._api_secret = '';
  this._ser_url = '';
  this.cache = {};
  this._urlmap = {};
}

 /* Face 继承自 EventEmitter */
 util.inherits(Face, EventEmitter);

/**
 * 配置Face 实例对象
 * @returns {this} this -- return the instance
 * @parma {opt} object -- config object, api_key, api_secret, country, timeout
 */
Face.prototype.config = function(opt) {
  opt = opt || {};
  if (!opt.api_key || !opt.api_secret || !opt.country) {
    console.warn('配置不完整!!!');
  }
  if (['china', 'us'].indexOf(opt.country) < 0) {
    throw new Error('Country selete error');
  }
  this._api_key = opt.api_key;
  this._api_secret = opt.api_secret;
  this._ser_url = (opt.country === 'china') ? cn_url : us_url;
  this._timeout = opt._timeout || 5000;

  this.emit('config', {
    api_key: this._api_key,
    api_secret: this._api_secret,
    ser_url: this._ser_url
  });
  return this;
};

Face.prototype.use = function(fn){
  var self = this;
  if(typeof fn !== 'function'){
    fn  = new Function();
  }
  fn(self);
  return self;
}

Face.prototype.get = function(url){
  return request
    .get(url)
    .query({api_key: this._api_key})
    .query({api_secret: this._api_secret});
}

Face.prototype.post = function(url){
  return request
    .post(url)
    .query({api_key: this._api_key})
    .query({api_secret: this._api_secret});
}

Face.prototype._parseUrl = function(){
  var self = this;
  Object.keys(urlMap).forEach(function(item){
    self._urlmap[item] = {};
    urlMap[item].forEach(function(t){
      self._urlmap[item][t] = self._ser_url + item + '/' + t;
    });
  });
  return self;
};

var face = new Face();

face.on('config', function(){
  face
  ._parseUrl()
  .use(require('./lib/detection')(face))
  .use(require('./lib/faceset')(face))
  .use(require('./lib/group')(face))
  .use(require('./lib/info')(face))
  .use(require('./lib/person')(face))
  .use(require('./lib/recognition')(face))
  .use(require('./lib/train')(face));
});

exports = module.exports = face;
