import * as lib from './functions.js';

// Function that check city
function cityChecker(){
    lib.createNavAndBG('images/bg5.mov');
    if(localStorage.getItem('city') != null){
        getResults(localStorage.getItem('city'));
    }else{
        getResults('Tel aviv');
    }
}
cityChecker();

// Get first enter location
// function getFirstLocation(){
//     $.getJSON('https://geolocation-db.com/json/')
//     .done (function(location) {
//        getResults(location.city);
//     });
// }

// Searchbox eventlistener
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress',setQuery);

// Function to set query if press enter
function setQuery(event){
    if(event.keyCode == 13){
        localStorage.setItem("city",searchBox.value);
        getResults(searchBox.value);
    }
}

// Function to get results
 async function getResults (query){
        // Get city temp 
        const api_url = lib.api.baseUrl+query+"&units=metric&APPID="+lib.api.key
        const response = await (await fetch(api_url));
        const data = await response.json();
        mainPadding();

        // Check if city correct
        if(data.message == undefined){
            lib.removeElementById("imgID");
            lib.removeElementById('footerDivID1');
            lib.removeElementById('footerDivID2');
            displayResults(data);
            lib.createFooter();
        }else{
            alert(data.message);
        }
}

// Function that display the results
function displayResults(weather){

if( weather.name != undefined ||weather.name != null){
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date =document.querySelector('.location .date');
    date.innerHTML = lib.dateBuilder(now); 

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let img = document.querySelector('.current .img');
    let img1 = document.createElement('img');
    img1.id = "imgID";
    img1.src = lib.getBetterImage(weather.weather[0].icon)
    img.append(img1);

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}else{
    return;
}
}

// change padding after load
function mainPadding(){
    document.getElementById('mainDivIndex').style.paddingLeft = "70px";
    document.getElementById('mainDivIndex').style.paddingRight = "70px";
}
