
exports = module.exports = function(face){
  var base = face._urlmap.recognition;
  face.recognition = {
    compare: function(face_group, opt, fn){
      return face
        .get(base.compare)
        .query(face_group)
        .query(opt)
        .end(function(err, data){
          return fn(err, data.body);
        });
    },
    verify: function(face_person, opt, fn){
      face
        .get(base.verify)
        .query(face_group)
        .query(opt)
        .end(function(err, data){
          return fn(err, data);
        });
    }
  };
};
