














//mycode below

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
        
        // gets info
        let textDiv = $("<div>").attr("class", "col-md-8");
        let cardBody = $("<div>").attr("class", "card-body");
        textDiv.append(cardBody);
        cardBody.append($("<h3>").attr("class", "card-title").text(response.name));
        let tempF = response.main.temp * 1.8 - 459.67;
        tempF =  Math.round(tempF*10)/10
        cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + tempF + "F"));
        console.log(tempF);
        cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
        cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));
        $(".weather").append(textDiv);
        

        //uv index
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=7e4c7478cc7ee1e11440bf55a8358ec3&lat=" + response.coord.lat + "&lon=" + response.coord.lat;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvresponse) {
            let uvindex = uvresponse.value;
            let uvdisp = $("<p>").attr("class", "card-text").text("UV Index: ");
            uvdisp.append($("<span>").attr("class", "uvindex").text(uvindex));
            cardBody.append(uvdisp);
        });
      });
}

