var _         = require('underscore'),
    path      = require('path');
    Q         = require('q');

module.exports = function(app){

  var exec = function(query){
    var deferred = Q.defer();

    query.exec(function(err,res){
      if (err){
        app.log.error(err);
        return deferred.reject(err);
      } else {
        app.log.info(res);
        return deferred.resolve( res || '' );
      }
    });

    return deferred.promise;
  };

  var save = function(doc){
    var options = {},
        deferred = Q.defer();

    doc.save(function(err,res){
      if (err){
        app.log.error(err);
        return deferred.reject(err);
      } else {
        app.log.info(res);
        return deferred.resolve( res || '' );
      }
    });

    return deferred.promise;
  };

  return {
    exec:         exec,
    save:         save
  };
};

