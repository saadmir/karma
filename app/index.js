var _                 = require('underscore'),
    express           = require('express'),
    fs                = require('fs'),
    path              = require('path'),
    app               = express();

module.exports = function(conf){

  app.configure('development', function(){
    console.log('>>>>>> RUNNING IN DEV MODE');
    app.use(express.errorHandler());
  });

  app.configure('production', function(){
    console.log('>>>>>> RUNNING IN PRODUCTION MODE');
  });

  app.conf                = conf;
  app.models              = {};
  app.log                 = require(path.join(conf.paths.utils,'logger'))(conf);
  app.munge_data          = require(path.join(conf.paths.utils,'munge_data'));
  app.db                  = require('mongoose');
  app.db.connect(conf.DB.uri);

  app.set('view options', {layout: false});
  app.engine('html', require('ejs').renderFile);

  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.set('view engine', 'html');
  app.set('views', path.join(conf.paths.views));

  app.use(express.cookieParser(conf.secret));
  app.use(app.router);
  app.use('/v1',express['static'](path.join(__dirname, 'public')));

  app.get(conf.routePrefix, function(req,res){
    app.log.info(req.path);
    app.log.info(req.query);
    res.render('index',
      {
        app_name: conf.package_json.name,
        app_version: conf.package_json.version
      });
  });

  app.crud = require(path.join(conf.paths.utils,'crud'))(app);

  require(conf.paths.models)(app);
  require(conf.paths.routes)(app);

  app.mailer              = require(path.join(conf.paths.utils,'mailer'))(app);
  require('http').createServer(app).listen(conf.PORT, conf.HOST,function(){
    app.log.info('http server listening on ' + (conf.HOST && conf.HOST.length ? conf.HOST : 'localhost') + ':' + conf.PORT);
    console.log('http server listening on ' + (conf.HOST && conf.HOST.length ? conf.HOST : 'localhost') + ':' + conf.PORT);
  });

  return app;
};
