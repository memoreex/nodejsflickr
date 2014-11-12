var flikkr = require('../public/js/getPics');
var express = require('express');
var router = express.Router();




//console.log(flikkr.Flicking);

/*
flikkr.flick('umea', function(arrayResults){
	ary = arrayResults;
	//console.log(ary);

});
*/

/* GET home page. */
router.get('/', function(req, res) {



	res.render('index', { 

		title: 'NodeJS with Flickr API',
		subtitle: 'Search for photos with a chosen hashtag'

  	});
});

router.post('/',function(req, res){
    var hash = req.body.hashtag;
    flikkr.flick(hash, function(arrayResults) {

	  /*res.render('index', { 
	  	title: 'NodeJS with Flickr API',
	  	subtitle: 'Displaying photos with #umea',
	  	flickrr : ary
	  });*/
      res.send({
      	arr: arrayResults
      });
    });
});

/* GET about page */
router.get('/about', function(req, res){
  res.render('index', { 
  	title: 'About',
  	flickrr : ary 
  })
});

module.exports = router;
