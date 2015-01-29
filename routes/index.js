var flikkr = require('../public/js/getPics');
var express = require('express');
var router = express.Router();


/* Hämta startsidan. */
router.get('/', function(req, res) {

    res.render('index', { 

  		title: 'Node.js with Flickr API',
  		subtitle: 'Search for photos with a chosen hashtag'

    });
});


/* Posta på startsidan. */
router.post('/',function(req, res){
    var hash = req.body.hashtag;
    flikkr.flick(hash, function(arrayResults, errorResponse) {

      res.send({

      	arr: arrayResults,
        err: errorResponse
        
      });

    });
});


module.exports = router;
