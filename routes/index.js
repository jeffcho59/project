var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET both */
router.get('/both', function(req, res){
   var db = req.db;
   var collection = db.get('life');
   collection.find({},{},function(e,docs){
      console.log(docs); 
      res.render('both', {
           "both" : docs
      });
   });
});

router.get('/female', function(req, res){
   var db = req.db;
   var collection = db.get('life');
   collection.find({},{},function(e,docs){
      res.render('female', {
           "female" : docs
      });
   });
});


router.get('/male', function(req, res){
   var db = req.db;
   var collection = db.get('life');
   collection.find({},{},function(e,docs){
      res.render('male', {
           "male" : docs
      });
   });
});


module.exports = router;
