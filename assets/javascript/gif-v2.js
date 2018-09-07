var topics = ["Dogs", "Relaxing", "Hungry", "Drunk"];

function displayGifs() {
    $(".btn-primary").on("click", function() {

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
            }
            $gifDiv.append($p);
            $gifDiv.append($gifImage);

            $("#gifs-go-here").prepend($gifDiv);


            var defaultURL = results[i].images.fixed_height_still.url;
            var animateURL = results[i].images.fixed_height.url;
            $gifImage.attr("src", animateURL);
            $gifImage.addClass("gifs");
            $gifImage.attr("data-still",defaultURL);
            $gifImage.attr("data-animate", animateURL )


            
        });
    })
}

displayGifs();

// var results=response.data;
// var animateURL = results[i].images.fixed_height.url;
// $gifImage.attr("src", animateURL);
// $gifImage.attr("data-still","still");
// $gifImage.attr("data-animate", animateURL )

// $("#images").on("click", function() {
//     var state = $(this).attr("data-state");
//     if (state==="still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     }
//     else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });

$("#submit-button").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#search-input").val().trim();
    topics.push(newTopic);
    console.log(topics);
    $("#search-input").val(" ");
    addButton();
});

function addButton () {
   // $("#new-buttons").empty();
    for (var i=0; i<topics.length; i++) {
        var a=$("<button id='search-topics' class='btn-primary'>")
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        //$("#new-buttons").append(a);
        $("#buttons-go-here").append(a)
    }
}



//addButton();

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
