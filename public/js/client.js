$(document).ready(function(){
	$(document).on('keypress', function (e) {
		if(e.keyCode === 13) {
			$.post("/", { 
				
				hashtag: $("#taginput").val()

			}, function(data){
					var hashName = $("#taginput").val()

					if(data.err === true){

						$('#sub').text("Displaying photos with #");
						$('#base_row').empty();
						
						jQuery('<div/>', {
							id: 'parent_col',
							class: 'col-md-12 center'
						}).prependTo('#base_row');

						jQuery('<img/>', {
							class: 'img',
							src: "http://stpps.com/1469/no_results_found.jpg"
						}).appendTo('#parent_col');
						
					}

					else if(data.arr.length === 0){

						$('#sub').text("Displaying photos with #" + hashName);
						$('#base_row').empty();
						
						jQuery('<div/>', {
							id: 'parent_col',
							class: 'col-md-12 center'
						}).prependTo('#base_row');

						jQuery('<img/>', {
							class: 'img',
							src: "http://stpps.com/1469/no_results_found.jpg"
						}).appendTo('#parent_col');

					}

					else{

						$('#sub').text("Displaying photos with #" + hashName);

						console.log(data.arr);
						
						$('#base_row').empty();
						for(var i = 0; i < data.arr.length; i++) {
							
							jQuery('<div/>', {
								id: 'parent_col' + i,
								class: 'col-md-2'
							}).prependTo('#base_row');

							jQuery('<a/>', {
								id: 'child_link' + i,
								'data-lightbox': "pics", 
								'data-title': data.arr[i].title,
							    href: "https://farm" + data.arr[i].farmid + ".staticflickr.com/"+ data.arr[i].serverid +"/"+ data.arr[i].photoid +"_"+ data.arr[i].secretid +"_b.jpg"
							}).appendTo('#parent_col' + i);


							jQuery('<img/>', {
								class: 'img img-thumbnail pos',
							    src: "https://farm" + data.arr[i].farmid + ".staticflickr.com/"+ data.arr[i].serverid +"/"+ data.arr[i].photoid +"_"+ data.arr[i].secretid +"_q.jpg"
							}).appendTo('#child_link' + i);


						}

					}

			});
		}
	});

});

