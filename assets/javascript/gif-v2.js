$(document).ready(function() {
var topics = [];

function displayGifs() {
    var gifName = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifName + "&api_key=dc6zaTOxFJmzC&limit=10";

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
            $gifDiv.append($p);
            $gifDiv.append($gifImage);

            $("#gifs-go-here").prepend($gifDiv);

            var defaultURL = results[i].images.fixed_height_still.url;
            var animateURL = results[i].images.fixed_height.url;
            // $gifImage.attr("src", animateURL);
            $gifImage.addClass("gifs");
            $gifImage.attr("data-state", "still")
            $gifImage.attr("data-still",defaultURL);
            $gifImage.attr("data-animate", animateURL )
            }
            
        });
}
$(document).on("click", ".btn-primary", displayGifs);

// displayGifs();


$("#submit-button").on("click", function(event) {
   
   $("#new-buttons").empty();
    event.preventDefault();
    var newTopic = $("#search-input").val().trim();
    if (!topics.includes(newTopic)) {
        topics.push(newTopic);
    }
    console.log(topics);
    $("#search-input").val(" ");
    addButton();
});

function addButton () {
    //event.preventDefault();
   $("#new-buttons").empty();
    for (var i=0; i<topics.length; i++) {
        var a=$("<button id='search-topics' class='btn-primary'>")
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        //$("#new-buttons").append(a);
        //var newTopic = $("#search-input").val().trim();
        $("#new-buttons").append(a)
        //displayGifs();
       
    }
}



function animateGif() {
    var state=$(this).attr("data-state");
    if (state==="still") {
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
$(document).on("click", "#images", animateGif);




$("#reset").on("click", function() {
$("#new-buttons").empty();
$("#gifs-go-here").empty();
topics=[];
})

});