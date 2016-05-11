var assert = require('assert');
var should = require('should');
var path = require('path');

var config = require('./config.json');

var fyt = require('../mirror');

var image_url = 'http://pic.mmfile.net/2013/08/131T954O-5.jpg';

var country = 'china';
var filepath = './liudehua.jpg';


describe('#First test', function() {

  this.timeout(3000);

  before(function() {
    fyt.config({
      api_key: config.api_key,
      api_secret: config.api_secret,
      country: country
    });
  });

  it('1.> Test obj property', function() {
    assert.equal(fyt._ser_url, config.cn_url);
    assert.equal(fyt._api_key, config.api_key);
    assert.equal(fyt._api_secret, config.api_secret);
  });

  it('2>> Test a get request', function(done){
    fyt.detection.detect(image_url, {
    }, function(err, data){
      if(err) {
        console.log(err);
      }
      should(data).have.property('face');
      should(data).have.property('url');
      should(data).have.property('session_id');
      (Array.isArray(data.face)).should.be.ok;
      done();
    });
  });


  it('3>> Test a post request', function(done){
    fyt.detection.detect(path.join(__dirname, filepath), {
      attribute: ['glass']
    }, function(err, data){
      if(err) {
        console.log(err);
      }
      console.log("<<just call test>>");
      done();
    });
  });
});

