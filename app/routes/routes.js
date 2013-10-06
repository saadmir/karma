module.exports = function(app) {

  var url           = require('url'),
      path          = require('path'),
      Q             = require('q'),
      request       = require('request'),
      Org           = app.models.Org,
      Volunteer     = app.models.Volunteer;

  app.get(conf.routePrefix + 'li', function(req,res){
    app.log.info(req.path);
    app.log.info(req.query);
    res.render('li',
      {
        app_name: conf.package_json.name,
        app_version: conf.package_json.version
      });
  });

  app.get(app.conf.routePrefix + 'volunteer/:id', function(req, res, next){
    app.log.info('[GET volunteer/:id] ' + req.params.id);

    app.crud.exec(Volunteer.find({'id': req.params.id}))
    .then(function(docs){
      app.log.info(docs);
      if (docs && docs.length) return res.send(JSON.stringify(docs));
      return res.send(200);
    })
    .fail(function(){
      app.log.error(arguments);
      return res.send(400);
    });
  });

  app.get(app.conf.routePrefix + 'volunteers', function(req, res, next){
    app.log.info('[GET volunteer/] ' + req.params.id);

    app.crud.exec(Volunteer.find({}))
    .then(function(docs){
      app.log.info(docs);
      //if (docs && docs.length) return res.send(JSON.stringify(docs));
      if (docs && docs.length) return res.send(JSON.stringify(app.munge_data.mungeVolunteers(docs)));
      return res.send(200);
    })
    .fail(function(){
      app.log.error(arguments);
      return res.send(400);
    });
  });

  app.post(app.conf.routePrefix + 'volunteer/', function(req, res, next){
    app.log.info('[POST volunteer] ');
    app.log.info(req.body);
    app.log.info(req.body.id);

    Volunteer.findOneOrCreate(req.body)
    .then(function(){
      app.log.info(arguments);
      return res.send(200);
    })
    .fail(function(){
      app.log.info(arguments);
      return res.send(500);
    });
  });

  app.post(app.conf.routePrefix + 'opportunities', function(req, res, next){
    app.log.info('[POST opportunities ');
    app.log.info(req.body);

    Org.findOneOrCreate(req.body)
    .then(function(){
      app.log.info(arguments);
      return res.send(200);
    })
    .fail(function(){
      app.log.info(arguments);
      return res.send(500);
    });
  });
};


