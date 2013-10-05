var path = require('path'),
    argv = require('optimist').argv;
    conf = {};

conf.package_json                     = require('./package.json');

conf.HOST                             = argv.HOST || process.env.HOST || 'localhost';
conf.PORT                             = argv.PORT || process.env.PORT || 8080;
conf.APP_URL                          = 'http://' + conf.HOST + ':' + conf.PORT + '/';
conf.APP_NAME                         = process.env.APP_NAME || 'karma';

conf.DB                               = {};
conf.DB.host                      = 'localhost';
conf.DB.port                      = '27017';
conf.DB.name                      = 'karma';
conf.DB.uri                       = 'mongodb://' + conf.DB.host + ':' + conf.DB.port + '/' + conf.DB.name;
conf.DB.schemas                   = ['volunteer','org'];

console.log('config DB : ' + conf.DB.uri);

conf.jsonpCallbackName                = 'jsonpcb';

conf.secret                           = 'hack4g00d';

conf.routePrefix                      = '/';

conf.paths                            = {};
conf.paths.logFile                    = path.join(__dirname,'logs', conf.APP_NAME + '-node.log');

conf.paths.public                     = path.join(__dirname, '..', 'public');

conf.paths.app                        = path.join(__dirname, 'app');
conf.paths.utils                      = path.join(conf.paths.app, 'utils');
conf.paths.routes                     = path.join(conf.paths.app, 'routes');
conf.paths.models                     = path.join(conf.paths.app, 'models');
conf.paths.schemas                    = path.join(conf.paths.models, 'schemas');
conf.paths.views                      = path.join(conf.paths.app, 'views');

module.exports = conf;
