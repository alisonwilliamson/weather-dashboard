
let cityList = [];
let API = "1d1dbf3b5675b2bb385f9922fc8feae7";

// stores searched cities in local storage
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cityList));
}


// adds last searched city to cityList-group
function addCity(){
    $(".cityList").empty();
    cityList.forEach(function(city) {
        $(".cityList").prepend($("<button class='cityList-group-item cityList-group-item-action citySearches' city-data='"+city+"'>"+city+"</button>"));
    })
}
