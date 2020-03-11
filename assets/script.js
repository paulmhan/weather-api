let savedLocations = [];
let currentLoc;

function init() {
    savedLocations = JSON.parse(localStorage.getItem("cities"));
    if (savedLocations) {
        currentLoc = savedLocations[savedLocations.length - 1];
        showPrevious();
        getCurrent(currentLoc);
    }   
}

function showPrevious() {
    if (savedLocations) {
        $("#prevSearches").empty();
        let buttons = $("<div>").attr("class", "list-group");
        for (let i = 0; i < savedLocations.length; i++) {
            let locBtn = $("<a>").attr("href", "#").attr("id", "loc-btn").text(savedLocations[i]);
            if (savedLocations[i] == currentLoc){
                locBtn.attr("class", "list-group-item list-group-item-action active");
            }
            else {
                locBtn.attr("class", "list-group-item list-group-item-action");
            }
            buttons.prepend(locBtn);
        }
        $("#prevSearches").append(buttons);
    }
}

function getCurrent(city) {
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7e4c7478cc7ee1e11440bf55a8358ec3&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function (){
            savedLocations.splice(savedLocations.indexOf(city), 1);
            localStorage.setItem("cities", JSON.stringify(savedLocations));
            init();
        }
    }).then(function (response) {
        //create the card
        let currCard = $("<div>").attr("class", "card bg-light");
        $("#earthforecast").append(currCard);

        let cardRow = $("<div>").attr("class", "row no-gutters");
        currCard.append(cardRow);

        let textDiv = $("<div>").attr("class", "col-md-8");
        let cardBody = $("<div>").attr("class", "card-body");
        textDiv.append(cardBody);
        cardBody.append($("<h3>").attr("class", "card-title").text(response.name));
        cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + response.main.temp + " &#8457;"));
        cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
        cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));
        cardRow.append(textDiv);
    });

};


function clear() {
    $("#earthforecast").empty();
}

function saveLoc(loc){
    if (savedLocations === null) {
        savedLocations = [loc];
    }
    else if (savedLocations.indexOf(loc) === -1) {
        savedLocations.push(loc);
    }
    localStorage.setItem("cities", JSON.stringify(savedLocations));
    showPrevious();
}

$("#searchbtn").on("click", function () {
    event.preventDefault();
    let loc = $("#searchinput").val();
    if (loc !== "") {
        clear();
        currentLoc = loc;
        saveLoc(loc);
        $("#searchinput").val("");
        getCurrent(loc);
    }
});

$(document).on("click", "#loc-btn", function () {
    clear();
    currentLoc = $(this).text();
    showPrevious();
    getCurrent(currentLoc);
});

init();