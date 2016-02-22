var express = require('express');
var router = express.Router();
var imagesLib = require('../lib/image-search.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/latest', function(req, res, next){

  var history = imagesLib.getHistory();
  res.send(history);

})

router.get('/:search', function(req, res, next) {

  var resource = imagesLib.search(req.params.search, req.query, function(err, result){
    res.send(result);
  });

});


module.exports = router;
