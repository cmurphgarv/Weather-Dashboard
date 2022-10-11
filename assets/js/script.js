var key = "50e0bc3f6f6aa1d991cd91b1bc295f90";

var citySearch = $("#searchBar");
var searchButton = $("#search-btn");
var currentCity = $("#currCity");
var currentTemp = $("#temperature");
var currentHumid = $("#humidity");
var currentWind = $("#windSpeed");
var currWeather = $("#currentWeather");
var fiveDayCard = $("#fiveDays");
var city = "";
//check local storage for any cities previously searched
var prevCities = JSON.parse(localStorage.getItem("prevCities") || "[]");

// get weather for searched city
// retrieve correct coordinates and then pass back all the weather info correctly converted to be displayed for current weather
// call function for 5 day forecast
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
                                    var mainTemp = (data.main.temp - 273.15) * 9/5 + 32;
                                    mainTemp = mainTemp.toFixed();
                                    currentTemp.text(" " + mainTemp + '°F');
                                    var wind = data.wind.speed * 2.2369362912;
                                    currentWind.text(" " + wind.toFixed() + " MPH");
                                    currentHumid.text(" " + data.main.humidity + "%");
                                    var icon = data.weather[0].icon;
                                    var iconFetch = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                                    var date = new Date(data.dt*1000).toLocaleDateString();
                                    $('#currIcon').html("<img src=" + iconFetch + ">");
                                    $("#currCity").text(data.name + " " + date)
                                    currWeather.removeClass("hidden");
                                    fiveDayForecast(lat, lon);
                                })
                            }
                        })
                })
            }
        })


}
// display weather for five-day forecast
// include temperature, humidity, wind speed

function fiveDayForecast(lat, lon) {
    var fiveURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key;
    fetch(fiveURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data)
                for(i=1; i < 6; i ++) {
                    var date = new Date((data.list[(i*8)-1].dt)*1000).toLocaleDateString();
                    var tempFive = data.list[(i*8)-1].main.temp;
                    tempFive = ((tempFive - 273.15) * 9/5 + 32).toFixed();
                    var windFive = data.list[(i*8)-1].wind.speed * 2.2369362912;
                    windFive = windFive.toFixed();
                    var humidFive= data.list[(i*8)-1].main.humidity;
                    var iconCode = data.list[(i*8)-1].weather[0].icon;
                    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                    $(`#forecastDate${i}`).text(date);
                    $(`#forecastIcon${i}`).html("<img src=" + iconURL + ">")
                    $(`#temp${i}`).text(tempFive + '°F');
                    $(`#wind${i}`).text(windFive + " MPH");
                    $(`#humid${i}`).text(humidFive + "%");
                    fiveDayCard.removeClass("hidden");

                }
            })
        }
    })
}

// store cities searched in local storage and display as list

// event listeners
searchButton.on("click", currentWeather);