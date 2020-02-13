let currentLocation;

$("#searchbtn").on("click",function(){
    event.preventDefault();
    let loc = $("#search-input").val().trim();
    clearCity();
    $("search-input").val("");
    getWeather(loc); 

});

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
        $(".weather").append(currentCard);
        let cityName = $("<div>").attr("class", "name").text(`Current weather for ${response.name}`);
        currentCard.append(cityName);
        console.log(response);
        
        // gets info
        let textDiv = $("<div>").attr("class", "col-md-8");
        let cardBody = $("<div>").attr("class", "card-body");
        textDiv.append(cardBody);
        cardBody.append($("<h3>").attr("class", "card-title").text(response.name));
        cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + response.main.temp));
        console.log(response.main.temp);
        cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
        cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));
        $(".weather").append(textDiv);
        
      });
}

