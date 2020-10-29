import * as lib from './functions.js';

// Function that check city
function cityChecker(){
    lib.createNavAndBG('images/bg5.mov');
    if(localStorage.getItem('city') != null){
        getResults(localStorage.getItem('city'));
    }else{
        getFirstLocation();
    }
}
cityChecker();

// Get first enter location
function getFirstLocation(){
    $.getJSON('https://geolocation-db.com/json/')
    .done (function(location) {
       getResults(location.city);
    });
}

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
    const response = await fetch(api_url);
    const data = await response.json();
    lib.mainPadding();

    // Check if city correct
    if(data.message == undefined){
        lib.removeElementById('footerDivID1');
        lib.removeElementById('footerDivID2');
        removeWeekDays();
        displayResults(data);
        
    // Get city lng and lat
    const api_url1 = lib.api.convertor+query+lib.api.convertorKey;
    const response1 = await fetch(api_url1);
    const data1 = await response1.json();
    lib.displayCityResults(data1);

    // Get 7days temp
    const api_url2 = lib.api.baseUrlWeek+"&lat="+lib.lat+"&lon="+lib.long+lib.api.baseUrlWeek2
    const response2 = await fetch(api_url2);
    const data2 = await response2.json();
    createWeekDays();
    displayWeekResults(data2);
    }else{
        alert(data.message);
    }
    

}

// Function that display the results
function displayResults(weather){
let city = document.querySelector('.location .city');
city.innerHTML = `${weather.name}, ${weather.sys.country}`;

let now = new Date();
let date =document.querySelector('.location .date');
date.innerHTML = lib.dateBuilder(now); 
}

function createWeekDays(){
    let section = document.getElementById('weekID');
    // Looping all the week days
    for (let i = 1 ; i <= 7 ; i++) { 

    // Creating elements
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let h4 = document.createElement('h4');

    // give the element id/classes
    div.classList.add("week", "day" + i);
    h2.id = 'h2Day' + i;
    img.id = 'imgDay' + i;
    p.id = 'pDay' + i;
    h4.id = 'h4Day' + i;

    // append to section
    div.append(h2,img,p,h4);
    section.append(div);
    }
    
}

function removeWeekDays(){
    let myNode = document.getElementById("weekID");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
}

// Function that display week results
function displayWeekResults(weatherWeek){
    for (let i = 1; i <= 7; i++) {
    // Day 
    let date =document.getElementById('h2Day'+i+'');
    date.innerHTML = lib.dateSmallBuilder(i);
    // Img
    let img = document.getElementById('imgDay'+i+'');
    let icon = weatherWeek.daily[i].weather[0].icon;
    img.src = lib.getBetterImage(icon);
    // weather description
    let description = document.getElementById('pDay'+i+'');
    description.innerHTML = `${weatherWeek.daily[i].weather[0].description}`;
    // min max temp
    let hilow = document.getElementById('h4Day'+i+'');
    hilow.innerHTML = `${Math.round(weatherWeek.daily[i].temp.min)}°c / ${Math.round(weatherWeek.daily[i].temp.max)}°c`;   
    }

    lib.createFooter();
}





