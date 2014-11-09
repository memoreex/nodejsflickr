var async = require('async');


var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "be38cf44e9ee51ded0a3c9a807b3f677",
      secret: "08093d260d999176",
      user_id: "124657880%40N03",
      access_token: "72157644824415293-183c69bd68f6ab82",
      access_token_secret: "86ee8e363526cb6e"
    };

var arrayResults = [];
var arrayCap = [];

var api = {
    sum: function(callback){
      process.nextTick(function(){
        Flickr.authenticate(flickrOptions, function(error, flickr) {
         // we can now use "flickr" as our API object
            flickr.photos.search({
                tags: "umea"

            }, function(err, result) {
              // result is Flickr's response
          
                //console.log(result.photos.photo.length);
                for (var i = 0; i < result.photos.photo.length; i++){
                        
                    var pics = result.photos.photo[i];

                        //console.log(pics.server);

                        arrayResults[i] = {

                            photoid : pics.id,
                            serverid : pics.server,
                            secretid : pics.secret,
                            farmid : pics.farm,
                            title: pics.title
                            
                        }
                }

                callback(null, arrayResults);
                   
            });
        });
        
        

      });
  }
}

var usch = {
    boom: function(ost, callback){
      Flickr.authenticate(flickrOptions, function(error, flickr) {

        for (var j = 0; j < arrayResults.length; j++) {

            flickr.photos.getInfo({
            api_key: "be38cf44e9ee51ded0a3c9a807b3f677",
            photo_id: arrayResults[j].photoid
              
            }, function(err, result){

                var caps = result.photo.description._content;

                    arrayCap[j] = {

                        captions: caps
                    }

                    arrayCap = arrayCap.filter(function(val) {
                        return val != undefined
                        
                    });

            });
        }
        


    });
  }
}


async.waterfall([
    function(callback){
        api.sum(callback);
        console.log("hej1")
        //callback(null, arrayResults);

    },
    function(arrayResults, callback){
        console.log("hej2");
        var ost = arrayResults;
        usch.boom(ost,callback);

        
    }
], function (err, result){
    if(err){
        throw err;
    }
    console.log(arrayCap);

});





/*
for (var j = 0; j < arrayResults.length; j++) {
  
  flickr.photos.getInfo({
  api_key: "be38cf44e9ee51ded0a3c9a807b3f677",
  photo_id: arrayResults[j].photoid
    
  }, function(err, result){

        var caps = result.photo.description._content;



        arrayCap[j] = {

            captions: caps
        }

        arrayCap = arrayCap.filter(function(val) {
            if(val != undefined && val != null ){
              return val;
            }else{

            }
            

        });


        return arrayCap
  });
}
*/