var arrayResults = [];


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
      // we can now use "flickr" as our API object
        

                flickr.photos.search({
                tags: hashtag,
                per_page: 18,
                tag_mode: 'all',
                privacy_filter: 1


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

                callback(arrayResults);

              });
                         
      });
    }
}
    


                          /*
                          for (var j = 0; j < arrayResults.length; j++) {
                            if(result.photo.description._content != ''){

                              var caption = result['photo'].length;
                              console.log(caption);
                              //arrayResults.push({ captions: caption });
                            }else{

                            }

                          }

                          */
                          


                            
                            //console.log(caption);


                        

                            
                            
                            
                           

                              
                            
                            //JSON.stringify(arrayCap);
                            /*
                            arrayAllt = arrayResults.concat(arrayResults);

                            arrayAllt= arrayAllt.filter(function(val) {
                              return val != undefined;});
                            
                            */
                            //console.log(arrayAllt);

                            

                          
                          
                          

                        


                

                

            


    
    