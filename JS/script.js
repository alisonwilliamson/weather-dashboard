
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

// gets current weather for selected city and calls uv index function
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

