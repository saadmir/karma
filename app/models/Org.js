var _         = require('underscore'),
    mongoose  = require('mongoose'),
    fs        = require('fs'),
    path      = require('path'),
    Q         = require('q'),
    uuid      = require('node-uuid'),
    name      = 'Org';

module.exports = function(app){
  var OrgSchema = new mongoose.Schema({
    email:                  { type: String, required: true, lowercase: true, index: { unique: true }},
    profile:                {},
    //causes:                 [],
    //skills:                 [],
    //title:             { type: String },
    //commitment:             { type: String },
    //description:            { type: String },
    //lat:            { type: String },
    //long:            { type: String },
    //location:            { type: String },
    //orgName:                                { type: String },
    //orgURL:                                { type: String },
    //address:                                { type: String },
    //city:                                   { type: String },
    //state:                                  { type: String },
    //zip:                                    { type: String },
    created:                { type: Date, required: true, 'default': Date.now},
    updated:                { type: Date, required: true, 'default': Date.now}
  });


  OrgSchema.statics.findOneOrCreate = function(data) {
    app.log.info('Org.findOneOrCreate');
    var self = this,
        deferred = Q.defer();

    var query = self.findOne({email: data.email});
    app.crud.exec(query)
    .then(function(doc){
      if (doc && doc.email === data.email){
        app.log.info('found existing org with email: ' + data.email);
        doc.profile = data;
        return app.crud.save(doc);
      } else {
        var newOrg = new self({email: data.email, profile: data});
        return app.crud.save(newOrg);
      }
    })
    .then(function(doc){
      if (doc && doc.email === data.email){
        deferred.resolve(doc);
      } else {
        app.log.error('[[Org.findOneOrCreate] returning 0 ?');
        deferred.reject(new Error('-1000'));
      }
    });

    return deferred.promise;
  };

  var Model = app.db.model('Org',OrgSchema);

  return {
    name: name,
    Model: Model
  };
};

