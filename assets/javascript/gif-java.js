 
$(".btn-primary").on("click", function() {
    var searchWord=$(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searchWord + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results=response.data;

        for (var i =0; i<results.length; i++) {
            //create div for gifs to spill into
            var $gifDiv = $("<div class='item'>");
            var rating = results[i].rating;

            //create ptag for ratings
            var $p=$("<p>").text("Rating: " + rating);

            //creating image tag for gif photos 
            var $gifImage=$("<img id='images'>");
            $gifImage.attr("src", results[i].images.fixed_height_still.url);

            $("img").on("click", function() {
                $gifImage.attr("src", results[i].images.fixed_height.url);
            })
            $gifDiv.append($p);
            $gifDiv.append($gifImage);

            $("#gifs-go-here").prepend($gifDiv);
        
        
        }
    });

var topics = ["Dogs", "Relaxing", "Hungry", "Drunk"]

//getting value of input and adding it to array for buttons
 $("#submit-button").on("click", function() {
   event.preventDefault();
    var $newSearch= $("#search-input").val().trim();

    topics.push($newSearch);
         console.log($newSearch);
    $("#search-input").val(" ");
         renderButton();
            }); 

 function renderButton() {
     $("#new-buttons").empty();

     for (var i=0;i<topics.length; i++) {
         //creating new button element
         var a=$("<button id='search-topics' class='btn-primary'>");
         a.addClass("new-gif-button");
         a.attr("data-search", topics[i]);
         a.text(topics[i]);
         $("#new-buttons").append(a);
     }
 }

})