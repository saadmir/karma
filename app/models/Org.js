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
    street1:                                { type: String , required: true },
    street2:                                { type: String },
    city:                                   { type: String, required: true },
    state:                                  { type: String, required: true },
    zip:                                    { type: String, required: true },
    firstName:                  { type: String, 'trim': true },
    middleName:                 { type: String, 'trim': true },
    lastName:                   { type: String, 'trim': true },
    dob:                        { type: Date },
    gender:                        { type: String,  requried: true, uppercase: true, trim: true, enum: ['M', 'F'], default: 'M' },
    created:                { type: Date, required: true, 'default': Date.now},
    updated:                { type: Date, required: true, 'default': Date.now}
  });

  OrgSchema.methods.update = function(data){
    var self = this;
    if (data){
      self.foo = data.foo;
    }

    return Q(app.crud.save(self));
  };

  OrgSchema.statics.create = function(id) {
    app.log.info('Org.create');
    var self = this,
        deferred = Q.defer(),
        newOrg = new self({id: id});

    Q.when(app.crud.save(newOrg))
    .then(function(doc){
      if (doc && doc.id === id){
        deferred.resolve(doc);
      } else {
        app.log.error('[Org.create] could not create new');
        deferred.reject(new Error('-100'));
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

