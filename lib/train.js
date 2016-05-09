exports = module.exports = function(face){
  face.train = {
    verify: function(person_id, fn){
      face.get(face._urlmap.train.verify)
        .query({person_id: person_id})
        .end(function(err, data){
          return fn(err, data.boby);
        });
    },
    search: function(faceset_id, fn){
      face.get(face._urlmap.train.search)
        .end(function(err, data){
          return fn(err, data.body);
        });
    },
    identify: function(group_id, fn){
      face.get(face._urlmap.train.identify)
        .end(function(err, data){
          return fn(err, data.body);
        });
    }
  };
};
