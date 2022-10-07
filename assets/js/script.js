var key = "50e0bc3f6f6aa1d991cd91b1bc295f90";

var citySearch = $("#searchBar");
var searchButton = $("search-btn");
var currentCity = $("#currCity");
var currentTemp = $("#temperature");
var currentHumid = $("#humidity");
var currentWind = $("#windSpeed");
var prevCities = JSON.parse(localStorage.getItem("prevCities") || "[]");

// get weather for searched city

// display weather for current date and five-day forecast
// include temperature, humidity, wind speed

// store cities searched in local storage and display as list



function displayWeather(e){
    e.preventDefault();
    if(scitySearch.val().trim()!==""){
        city = citySearch.val().trim();
        currentWeather(city);
    }
}