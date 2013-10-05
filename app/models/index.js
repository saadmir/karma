module.exports = function (app) {

  var fs    = require('fs'),
      path  = require('path');

  app.models = app.models || {};

  fs.readdirSync(__dirname).forEach(function (f) {
    if (f !== 'index.js' && path.extname(f) === '.js') {
      var model = require(path.join(__dirname, f))(app);
      if (model && model.name && model.name.length && !(model.name in app.models) && model.Model) {
        app.log.info('loading model: ' + model.name);
        app.models[model.name] = model.Model;
      }
    }
  });

};

