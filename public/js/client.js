$(document).ready(function(){
	$(document).on('keypress', function (e) {
		if(e.keyCode === 13) {
			$.post("/", { 
				
				hashtag: $("#taginput").val()

			}, function(data){
					var hashName = $("#taginput").val()
					$('#sub').text("Displaying photos with #" + hashName);

					console.log(data.arr);
					
					$('#hej').empty();
					for(var i = 0; i < data.arr.length; i++) {
						
						jQuery('<div/>', {
							id: 'hejs' + i,
							class: 'col-md-2'
						}).prependTo('#hej');

						jQuery('<a/>', {
							id: 'hejss' + i,
							'data-lightbox': "pics", 
							'data-title': data.arr[i].title,
						    href: "https://farm" + data.arr[i].farmid + ".staticflickr.com/"+ data.arr[i].serverid +"/"+ data.arr[i].photoid +"_"+ data.arr[i].secretid +"_b.jpg"
						}).appendTo('#hejs' + i);


						jQuery('<img/>', {
							class: 'img img-thumbnail pos',
						    src: "https://farm" + data.arr[i].farmid + ".staticflickr.com/"+ data.arr[i].serverid +"/"+ data.arr[i].photoid +"_"+ data.arr[i].secretid +"_q.jpg"
						}).appendTo('#hejss' + i);


					}


					//data.arr.length = 0;
			



			});
			
		    //data.arr.length = 0;
		}
	});

});








