var _         = require('underscore'),
    mongoose  = require('mongoose'),
    fs        = require('fs'),
    path      = require('path'),
    Q         = require('q'),
    uuid      = require('node-uuid'),
    name      = 'Volunteer';

module.exports = function(app){

  var VolunteerSchema = new mongoose.Schema({
    lnkdid:                 { type: String, required: true },
    profile:                {},
    created:                { type: Date, required: true, 'default': Date.now},
    updated:                { type: Date, required: true, 'default': Date.now}
  });

  VolunteerSchema.methods.update = function(data){
    var self = this;
    if (data){
      self.foo = data.foo;
    }

    return Q(app.crud.save(self));
  };

  VolunteerSchema.statics.findOneOrCreate = function(data) {
    app.log.info('User.findOneOrCreate');
    var self = this,
        deferred = Q.defer();

    var query = self.findOne({lnkdid: data.id});
    app.crud.exec(query)
    .then(function(doc){
      if (doc && doc.lnkdid === data.id){
        app.log.info('found existing user with lnkdid: ' + data.id);
        doc.profile = data;
        return app.crud.save(newUser);
      } else {
        var newUser = new self({lnkdid: data.id, profile: data});
        return app.crud.save(newUser);
      }
    })
    .then(function(doc){
      if (doc && doc.lnkdid === data.id){
        deferred.resolve(doc);
      } else {
        app.log.error('[User.findOneOrCreate] returning 0 ?');
        deferred.reject(new Error('-1000'));
      }
    });

    return deferred.promise;
  };

  //var Model = _(db.modelNames()).contains(name) ? db.model(name) : db.model(name, UserSchema);
  var Model = app.db.model(name, VolunteerSchema);

  return {
    name: name,
    Model: Model
  };
};

