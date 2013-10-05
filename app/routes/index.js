module.exports = function(app) {

var _                 = require('underscore'),
    fs                = require('fs'),
    path              = require('path'),
    routePrefix       = app.conf.routePrefix,
    log               = app.log;

fs.readdirSync(__dirname).forEach(function(file) {
  if (file !== "index.js" && path.extname(file) === '.js'){
    app.log.info('loading routes from ' + file);
    require(path.join(__dirname,file))(app);
  }
});

app.log.info('loading default route');
app.get('/', function(req,res){
  res.send({ 'hello': 'world' });
});

};

