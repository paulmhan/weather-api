let currentLocation;

$("#searchbtn").on("click",function(){
    event.preventDefault();
    let loc = $("#search-input").val().trim();
    //if location isnt empty
    if (loc !== ""){
        clearCity();
        currentLoc = loc;
        //clears search field value
        $("search-input").val("");
        getWeather(loc); 
    }
})

function clearCity(){
    //clears weather for current location
    $(".weather").empty();

}


function getWeather(city){
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=56e230dcae6b8601830ff7faa6ebd840";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        let currentCard = $("<div>").attr("class", "card bg-light");
        $(".weather").append(currentCard)
        console.log(response);
      });
}


getWeather("Austin");

