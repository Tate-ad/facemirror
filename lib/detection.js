var fs = require('fs');
var path = require('path');

exports = module.exports = function(face) {
  face.detection = {
    detect: function(info, opt, fn) {
      opt = opt || {};
      if(Array.isArray(opt.attribute)){
        opt.attribute = opt.attribute.join(',');
      };

      if(typeof opt === 'function'){
        throw new TypeError('args type error');
      }

      try{
        if(!fs.existsSync(info)){
          throw SystemError('File not found');
        }
        return face
          .post(face._urlmap.detection.detect)
          .attach('img', info, 'test.jpg')
          .query(opt)
          .end(function(err, data){
            return fn(err, data.body);
          });
      }catch(e){
        console.warn('File not fount, try to url');
        return face
          .get(face._urlmap.detection.detect)
          .query({url: info})
          .query(opt)
          .end(function(err, data) {
            return fn(err, data.body);
          });
      }
    },
    landmark: function(face_id, opt, fn) {
      opt = opt || {};
      if(!opt.type){
        opt.type = 83;
      }
      return face
        ._request('get', landmark)
        .query({
          face_id: face_id
        })
        .query(opt)
        .end(function(err, data) {
          return fn(err, data);
        });
    }
  };
}

