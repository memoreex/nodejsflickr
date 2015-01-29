
var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "be38cf44e9ee51ded0a3c9a807b3f677",
      secret: "08093d260d999176",
      user_id: "124657880%40N03",
      access_token: "72157644824415293-183c69bd68f6ab82",
      access_token_secret: "86ee8e363526cb6e"
    };

module.exports = {

    flick: function(hashtag, callback){

      Flickr.authenticate(flickrOptions, function(error, flickr) {
      //Vi kan nu använda Flick's API

                flickr.photos.search({
                tags: hashtag,
                per_page: 18


            }, function(err, result) {
              // result är Flickr's svar
                var arrayResults = [];
                var errorResponse = false;

                if(err){

                  errorResponse = true;
                  
                }

                else{

                  for (var i = 0; i < result.photos.photo.length; i++){
                          
                          var pics = result.photos.photo[i];

                          arrayResults[i] = {

                              photoid : pics.id,
                              serverid : pics.server,
                              secretid : pics.secret,
                              farmid : pics.farm,
                              title: pics.title
                              
                          }

                  }

                }

                callback(arrayResults, errorResponse);
                
              });
                                       
      });
    }

}

    