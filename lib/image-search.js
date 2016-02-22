var moment = require('moment');
var Search = require('bing.search');

module.exports = (function(){
  var history = [];
  var modules = {};

  modules.search = function(params, query, callback){

    var words = params.split(' ');
    var offset = 0;

    if (query.hasOwnProperty('offset')){
      offset = query.offset;
    }

    history.push({
      term: params,
      when: moment().toISOString()
    })

    var search = new Search('wxEczqiXjNePNnKWNETW1NreggCUju+gIA1zO20mWV8');
    search.images(params, {skip: 5*offset, top: 5}, function(err, result){
      if (err)
        return callback(err)
      
      var response = result.map(function(item){
        return {
          "imageUrl": item.url,
          "title"   : item.title,
          "pageUrl" : item.sourceUrl
        }
      })
      callback(err, response);
    })
  }

  modules.getHistory = function(){
    return history;
  }

  return modules;
})();