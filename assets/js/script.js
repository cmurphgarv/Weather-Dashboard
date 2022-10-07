var key = "50e0bc3f6f6aa1d991cd91b1bc295f90";

var citySearch = $("#searchBar");
var searchButton = $("#search-btn");
var currentCity = $("#currCity");
var currentTemp = $("#temperature");
var currentHumid = $("#humidity");
var currentWind = $("#windSpeed");
var city = "";
//check loa
var prevCities = JSON.parse(localStorage.getItem("prevCities") || "[]");

// get weather for searched city
// display weather for current date and five-day forecast
// include temperature, humidity, wind speed

function currentWeather(event) {
    event.preventDefault();
    if (citySearch.val().trim() !== "") {
        city = citySearch.val().trim();
    } else {
        return;
    }
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + key;
    fetch(geoUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key;
                    fetch(URL)
                        .then(function (response) {
                            if (response.ok) {
                                console.log(response);
                                response.json().then(function (data) {
                                    console.log(data);
                                })
                            }
                        })
                })
            }
        })


}

// store cities searched in local storage and display as list

// event listeners
searchButton.on("click", currentWeather);