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

        // Check city
        if(data.message == undefined){
        lib.removeElementById('footerDivID1');
        lib.removeElementById('footerDivID2');
        removeAllRows()
        displayResults(data);

        // Get city lng and lat
        const api_url1 = lib.api.convertor+query+lib.api.convertorKey;
        const response1 = await fetch(api_url1);
        const data1 = await response1.json();
        lib.displayCityResults(data1);

        // Get hours temp
        const api_url2 = lib.api.baseUrlWeek+"&lat="+lib.lat+"&lon="+lib.long+lib.api.baseUrlWeek2
        const response2 = await fetch(api_url2);
        const data2 = await response2.json();
        displayHourResults(data2,47); //hours 0-47
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
date.innerHTML = lib.dateBuilder(now)
}

// Function that display week results
function displayHourResults(weatherWeek,hours){

    lib.createTableHeader();
    for (let i = 0; i <= hours; i++) {
    
    // Creating All the Elelments
    let tbody = document.getElementById("tbodyID");
    let row = document.createElement('tr');

    // Time
    let time = document.createElement('td');
    row.appendChild(time);
    time.innerHTML = lib.getTime(weatherWeek.hourly[i].dt);

    // Temp
    let temp = document.createElement('td');
    row.appendChild(temp);
    temp.innerHTML = (weatherWeek.hourly[i].temp).toFixed(0) + "°C";

    // Description
    let img = document.createElement('img');
    let description = document.createElement('td');
    let icon = weatherWeek.hourly[i].weather[0].icon;
    img.src = lib.getBetterImage(icon);
    
    description.append(img);
    description.append(weatherWeek.hourly[i].weather[0].description);
    row.appendChild(description);

    // Humudity
    let humudity = document.createElement('td');
    row.appendChild(humudity);
    humudity.innerHTML = weatherWeek.hourly[i].humidity + "%";

    // Wind
    let wind = document.createElement('td');
    row.appendChild(wind);
    wind.innerHTML = (weatherWeek.hourly[i].wind_speed * 3.6).toFixed(0) + " km/h";

    // Append to table
    tbody.appendChild(row);
    }
}

// Function that removes all the rows for new search
function removeAllRows() { 
    for(var i = document.getElementById("tbodyID").rows.length; i > 0;i--)
       {
            document.getElementById("tbodyID").deleteRow(i -1);
        }    
        document.getElementById("myTable").deleteTHead();
        
} 



    







