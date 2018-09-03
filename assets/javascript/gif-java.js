
 $( document ).ready(function(){

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EFFTvg4Evseu1dyllQhmwOnKoEw7fbRE&q=&limit=25&offset=0&rating=G&lang=en";
    console.log(queryURL);

    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results=response.data
        console.log(response.data);

        var rating = results.rating;
        var displayStillGif = results.images.fixed_height_still.url;
        var displayAnimatedGif=results.images.looping.url;
        
        var displayRating = $("#ratings").text("Rating: " + rating);


    })
 });


