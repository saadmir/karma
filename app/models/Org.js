var _         = require('underscore'),
    mongoose  = require('mongoose'),
    fs        = require('fs'),
    path      = require('path'),
    Q         = require('q'),
    uuid      = require('node-uuid'),
    name      = 'Org';

module.exports = function(app){
  var OrgSchema = new mongoose.Schema({
    id:                     { type: String, required: true, index: { unique: true }},
    title:                  { type: String, required: true, index: { unique: true }},
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

    var titleStr = (data.opportunity.title || '').replace(/\s+/ig,'').toLowerCase();
    var id = require('crypto').createHash('md5').update(titleStr).digest("hex");

    if (!titleStr || !titleStr.length || !id || !id.length) return Q.reject(new Error('-2000'));

    var query = self.findOne({id: id});
    app.crud.exec(query)
    .then(function(doc){
      app.log.info(doc);
      if (doc && doc.id === titleStr){
        app.log.info('found existing org with title: ' + data.title);
        doc.profile = data.opportunity;
        return app.crud.save(doc);
      } else {
        app.log.info('creating new');
        var newOrg = new self({id: id, title: data.opportunity.title, profile: data.opportunity});
        return app.crud.save(newOrg);
      }
    })
    .then(function(doc){
      if (doc && doc.id === id){
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

