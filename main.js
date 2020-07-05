const api={
    key: "03816da64bef0da9e6cc7111fc8cbbca",
    base: "http://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event){
  if(event.keyCode == 13){
      getResults(searchbox.value);
      console.log(searchbox.value);
  }
}

function getResults(query){
   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
   .then(weather => {return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temperature = document.querySelector('.current .temperature');
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let weatherElement = document.querySelector('.current .weather');
    weatherElement.innerText =weather.weather[0].main;

    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",  "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date= d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
}
