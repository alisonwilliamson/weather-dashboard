
let cityList = [];
let API = "1bb4961b1e82421db6b174ff95e35d71";




// stores searched cities in local storage----unecessary???
// function storeCities() {
//     localStorage.setItem("cities", JSON.stringify(cityList));
// }



// adds last searched city to list-group
function createList(){
    $(".cityList").empty();
    cityList.forEach(function(city) {
        $(".cityList").prepend($('<button class="list-group-item list-group-item-action cityButton" data-city="'+city+'">'+city+'</button>'));
    })
}

// gets current weather for selected city
function currentWeather(city, API) {
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+API;
    
    // api call to get searched city's current weather
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (data) {
        // appends weather data 
        $(".todaysWeather").append(
            `<div class="row ml-1">
                <h3 class="mr-3">${data.name} (${(new Date(1000 * data.dt).getUTCMonth()) + 1}/${(new Date(1000 * data.dt).getUTCDate())}/${new Date(1000 * data.dt).getUTCFullYear()})</h3>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
            </div>`
        )
        $(".todaysWeather").append("<p>Temperature: "+data.main.temp+" &degF</p>")
        $(".todaysWeather").append("<p>Humidity: "+data.main.humidity+" %</p>")
        $(".todaysWeather").append("<p>Wind: "+data.wind.speed+" mph</p>")
    })
}

// function to get 5 day forecast for searched city
function fiveDayForecast(city, API) {
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+API;
    // api call to get 5 day forecast
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (data) {
        for (i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.search("15:00:00") != -1) {
                let forecastDate = data.list[i];
                // appends api data onto a card to display 5 day forecast
                $(".fiveDay").append(
                    `<div class="card bg-primary shadow m-4">
                        <div class="card-body">
                            <h4 class="card-title">${(new Date(1000 * forecastDate.dt).getUTCMonth()) + 1}/${new Date(1000 * forecastDate.dt).getUTCDate()+1}/${new Date(1000 * forecastDate.dt).getUTCFullYear()}</h4>
                            <div class="card-text">
                                <img src="http://openweathermap.org/img/w/${forecastDate.weather[0].icon}.png">
                                <p class="card-text">Temp: ${forecastDate.main.temp} &degF</p>
                                <p class="card-text">Humidity: ${forecastDate.main.humidity} %</p>
                            </div>
                        </div>
                    </div>`
                );
            }
        }
    })
}

