var fs = require('fs'),
    logger;

module.exports = function(conf){

  if (!process.env.NODE_ENV || process.env.NODE_ENV.toLowerCase() != 'production') {
    logger = require('tracer').colorConsole({
      format : "{{file}}:{{line}} <{{title}}> {{message}}",
      transport : function(data) {

        console.log(data.output);

        if (conf.paths && conf.paths.logFile){
          fs.open(conf.paths.logFile, 'a', 0666, function(err, id) {
            if (!err){
              fs.write(id, data.output+"\n", null, 'utf8', function() {
                fs.close(id, function() {});
              });
            } else {
              console.log('ERROR OPENING AND WRITING TO LOG FILE');
              console.log(err);
              fs.close(id, function() {});
            }
          });
        }
      }
    });

  } else {
    var winston = require('winston'),
        transports = [
          new (winston.transports.Console)( {colorize: true})
        ];

    if (conf && conf.paths && conf.paths.logFile){
      transports.push(new (winston.transports.File)({
        filename: conf.paths.logFile,
        json: false
      }));
    }

    logger = new (winston.Logger)({ transports: transports });
   // logger.exitOnError = false;
  }
  return logger;
};

