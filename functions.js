export var long;
export var lat;
export const searchBox = document.querySelector('.search-box');

// Api key,baseUrl
export const api = {
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "75dcc346565917166241ecadddb10230",
    baseUrlWeek:"https://api.openweathermap.org/data/2.5/onecall?",//lat long
    baseUrlWeek2:"&units=metric&exclude=alerts&appid=75dcc346565917166241ecadddb10230",
    convertor:"https://maps.googleapis.com/maps/api/geocode/json?address=",//city
    convertorKey:"&key=AIzaSyBxaNRJNXRdn_p8I-VXWyygl-N33s3mVPU"
}

// Give btter image from my collection
export function getBetterImage(icon){
    let image;
    switch (icon) {
        case '01d':
            image = 'images/cleard.png';
            break;

        case '01n':
            image = 'images/clearn.png';
            break;

        case '02d':
            image = 'images/fewcloudsd.png';
            break;

        case '02n':
            image = 'images/fewcloudsn.png';
            break;

        case '03d':
        case '03n':
        case '04d':
        case '04n':
        image = 'images/cloudy.png';
        break;

        case '04d':
            image = 'images/cloudy.png';
            break;


        case '09d':
        case '09n':
            image = 'images/showerrain.png';
            break;
    
        case '10d':
            image = 'images/raind.png';
            break;

        case '10n':
            image = 'images/rainn.png';
            break;

        case '11d':
        case '11n':
        image = 'images/thunderstorm.png';
        break;

        case '13d':
        case '13n':
            image = 'images/snow.png';
            break;

        case '50d':
        case '50n':
            image = 'images/fog.png';
            break;
    
        default:
            "No Image"
            break;
    }
    return image;
}

 // Convert time
 export function getTime(unix_timestamp){  
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2)
                return formattedTime;
}

// Build full date
export function dateBuilder(d){
    let months =['January','February','March','April','May','June','July','August','September','October', 'November','December'];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
}

// Build small date
export function dateSmallBuilder(t){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

        let today = new Date()
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + t)

        let day = days[tomorrow.getDay()];
        let date = tomorrow.getDate();

    return `${day} ${date}`;
}

// Convert city to lat and lng
export function displayCityResults(weatherWeek){
    lat = weatherWeek.results[0].geometry.location.lat;
    long = weatherWeek.results[0].geometry.location.lng;  
}

// Create table header
export function createTableHeader(){
    // Create elements
    let table = document.getElementById('myTable');
    let thead = document.createElement('thead');
    let thTime = document.createElement('th');
    let thTemp = document.createElement('th');
    let thDesc = document.createElement('th');
    let thHumu = document.createElement('th');
    let thWind = document.createElement('th');
    let iTime = document.createElement('i');
    let iTemp = document.createElement('i');
    let thHumu1 = document.createElement('img');
    let iWind = document.createElement('i');
   
    // Create icons/images 
    iTime.classList.add("fa", "fa-clock-o");
    iTemp.classList.add("fas", "fa-temperature-high");
    thHumu1.src="/images/humudityimg.png";
    iWind.classList.add("fas", "fa-wind");
    
    // append images/text to th
    thTime.appendChild(iTime);
    thTime.append(" Time");
    thTemp.appendChild(iTemp);
    thTemp.append(" Temp");
    thDesc.innerText = "Description"
    thHumu.appendChild(thHumu1);
    thHumu.append("Humudity");
    thWind.appendChild(iWind);
    thWind.append(" Wind");
   
    // append th to to thead
    thead.append(thTime);
    thead.append(thTemp);
    thead.append(thDesc);
    thead.append(thHumu);
    thead.append(thWind);
    // append thead to table
    table.append(thead);

    createFooter();
   }

// Create footer
export function createFooter(){
    let footer = document.getElementById('footerId');
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let aElement = document.createElement('a');
    let fackebook = document.createElement('img');
    let instagram = document.createElement('img');
    let github = document.createElement('img');
    let linkedin = document.createElement('img');

    footer.classList.add('d-flex', 'justify-content-evenly');

    div.classList.add('footer-copyright', 'py-4', 'text-light', 'col-6');
    div.id = "footerDivID1";
    div.innerHTML = '2020 Copyright &#9426;';
    aElement.href = ('#');
    aElement.innerHTML = ' LM Weather';

    div1.classList.add('py-4', 'text-light', 'col-6', 'text-right');
    div1.id = "footerDivID2";
    fackebook.src = './images/facebook.svg';
    instagram.src = './images/instagram.svg';
    github.src = './images/github.svg';
    linkedin.src = './images/linkedin.svg';

    div1.appendChild(fackebook);
    div1.appendChild(instagram);
    div1.appendChild(github);
    div1.appendChild(linkedin);

    div.append(aElement);
    footer.appendChild(div);
    footer.appendChild(div1);
}

// Remove element
export function removeElementById(idName){
    try{
        document.getElementById(idName).remove();
    }catch(er){}
    
}

// change padding after load
export function mainPadding(){
    document.getElementById('mainDiv').style.padding = "10px 50px 10px 50px";
}

// Create Top Navbar
export function createTopNavBar(){
    let topNavDiv = document.getElementById('topNavID');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let img = document.createElement('img');
    let input = document.createElement('input');
    let h1 = document.createElement('h1');

    img.id = "logoID1";
    img.src = 'images/cloudlogo.png';
    div1.append(img);

    input.id = "inputID";
    input.type = 'text';
    input.classList.add("search-box", "my-3");
    input.placeholder = "Seach for a city..";
    div2.append(input);

    h1.innerText = "LM Weather";
    div3.append(h1);

    topNavDiv.appendChild(div1)
    topNavDiv.appendChild(div2)
    topNavDiv.appendChild(div3)
  
}

// Create Bottom Navbar
export function createBottomNavBar(){
    let nav = document.getElementById('bottomNavID');
    //Create Elements
    let container = document.createElement('div');
    let button = document.createElement('button');
    let span = document.createElement('span');
    let div = document.createElement('div');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let a1 = document.createElement('a');
    let li2 = document.createElement('li');
    let a2 = document.createElement('a');
    let li3 = document.createElement('li');
    let a3 = document.createElement('a');
    let li4 = document.createElement('li');
    let a4 = document.createElement('a');

    container.className = 'container';
    button.classList.add('navbar-toggler');
    button.type = 'button';
    button.dataset.toggle = 'collapse';
    button.dataset.target = '#navbarNav';
    button.setAttribute('aria-controls', 'navbarNav');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Toggle navigation');
    span.classList.add('navbar-toggler-icon');
    button.appendChild(span);
    container.appendChild(button);

    div.classList.add('collapse', 'navbar-collapse');
    div.id = 'navbarNav';
    ul.classList.add('navbar-nav', 'mx-auto');

    li1.classList.add('nav-item', 'px-5');
    a1.classList.add('nav-link');
    a1.href = 'index.html';
    a1.innerText = 'Today';
    li1.appendChild(a1);

    li2.classList.add('nav-item', 'px-5');
    a2.classList.add('nav-link');
    a2.href = 'hourly.html';
    a2.innerText = 'Hourly';
    li2.appendChild(a2);

    li3.classList.add('nav-item', 'px-5');
    a3.classList.add('nav-link');
    a3.href = 'week.html';
    a3.innerText = 'Weekly';
    li3.appendChild(a3);

    li4.classList.add('nav-item', 'px-5');
    a4.classList.add('nav-link');
    a4.href = 'about.html';
    a4.innerText = 'About';
    li4.appendChild(a4);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);

    div.appendChild(ul);
    container.appendChild(div);
    nav.appendChild(container);
}

export function createVideoBG(videoPath){
    let video = document.getElementById('myVideo');
    let srcVid = document.createElement('source');

    srcVid.src = videoPath;
    srcVid.type = 'video/mp4';

    video.appendChild(srcVid);
}

export function createNavAndBG(videoPath){
    createVideoBG(videoPath);
    createTopNavBar();
    createBottomNavBar();
}


