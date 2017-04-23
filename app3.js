'use strict';

//setting some DOM references for use in app.js

var searchButton = document.querySelector('#getWeatherButton');
var userCity = document.querySelector('#city');
var metric = document.querySelector('#tType');

var days = [];

days[0] = document.querySelector('#day1');
days[1] = document.querySelector('#day2');
days[2] = document.querySelector('#day3');
days[3] = document.querySelector('#day4');
days[4] = document.querySelector('#day5');

var hr = [];

hr[0] = document.querySelector('#h1');
hr[1] = document.querySelector('#h2');
hr[2] = document.querySelector('#h3');
hr[3] = document.querySelector('#h4');
hr[4] = document.querySelector('#h5');
hr[5] = document.querySelector('#h6');
hr[6] = document.querySelector('#h7');
hr[7] = document.querySelector('#h8');

var output = document.querySelector('#output');




//Weather function which organizes data retrieved by XMLhttpRequest
function Weather(cityName, description, temperature){
  this.cityName = cityName;
  this.description = description;
  this.temperature = temperature;
}
searchButton.addEventListener('click', searchWeather);

//function executes when the user clicks the get weather button
function searchWeather(){
  var tType = metric.value;
  var cityName = userCity.value;

  if (cityName.length == 0) {
    return alert('Please enter a City name');
  }
  
  //http request
  var http = new XMLHttpRequest();
  var apiKey = '848716227d070904a2aba846e50d758d';

  var url;

  if(tType == 'F') {
  	url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid='+ apiKey;

  } else{
  	url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid='+ apiKey;
  }
  var method = 'GET';

  http.open(method, url);
  http.onreadystatechange = function (){

    if (http.readyState == XMLHttpRequest.DONE && http.status === 200){

      var data = JSON.parse(http.responseText);
      console.log(data); 

      outputWeather(data);
      outputWeather2(data);

    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert('Something went wrong, try again');
    }
  };
  http.send();

  function outputWeather(data){

    var x = 0;


    for (var i = 0; i < data.list.length; i+=8) {
      console.log(data.list[i].main.temp);
      console.log(data.list[i].dt_txt);
      console.log(data.list[i].weather[0].description);
      var date = data.list[i].dt_txt;

      var img;

      switch(data.list[i].weather[0].description) {
    case 'light snow':
        img = '<img src="icons/light_snow.png">'
        break;
    case 'clear sky':
        img = '<img src="icons/sunny.png">'
        break;
    case 'few clouds':
        img = '<img src="icons/sunny_cloudy.png">'
        break;
    case 'broken clouds':
        img = '<img src="icons/sunny_cloudy.png">'
        break;
    case 'rain':
        img = '<img src="icons/rain.png">'
        break;
    case 'light rain':
        img = '<img src="icons/light_rain.png">'
        break;
    case 'scattered clouds':
        img = '<img src="icons/sunny_cloudy.png">'
        break;
    case 'moderate rain':
        img = '<img src="icons/light_rain.png">'
        break;
    case 'heavy rain':
        img = '<img src="icons/heavy_rain.png">'
        break;
    case 'overcast clouds':
        img = '<img src="icons/cloudy.png">'
        break;
    case 'snow':
        img = '<img src="icons/snow.png">'
        break;
    default:
        img = ''
}

      days[x].innerHTML = "Weather for: " + date + "<br>" + img + "<br>" + data.list[i].weather[0].description
      + "<br>" + data.list[i].main.temp + "°" 
      + "<br> Wind: " + data.list[i].wind.speed + 
      "<br> Humidity: " + data.list[i].main.humidity;
      var catt = document.createAttribute("class");
      catt.value = "display";
      days[x].setAttributeNode(catt);

      x = x+1;
    }

  };

  function outputWeather2(data){

    var x = 0;

    output.innerHTML = "<span>Weather forecast for the next 24 hours: </span>";


    for (var i = 0; i < 8; i++) {
      console.log(data.list[i].main.temp);
      console.log(data.list[i].dt_txt);
      console.log(data.list[i].weather[0].description);
      var date = data.list[i].dt_txt;

      var img;

      switch(data.list[i].weather[0].description) {
    case 'light snow':
        img = '<img src="icons/light_snow.png" height="60" width="60">'
        break;
    case 'clear sky':
        img = '<img src="icons/sunny.png" height="60" width="60">'
        break;
    case 'few clouds':
        img = '<img src="icons/sunny_cloudy.png" height="60" width="60">'
        break;
    case 'broken clouds':
        img = '<img src="icons/sunny_cloudy.png" height="60" width="60" >'
        break;
    case 'rain':
        img = '<img src="icons/rain.png" height="60" width="60">'
        break;
    case 'light rain':
        img = '<img src="icons/light_rain.png" height="60" width="60">'
        break;
    case 'scattered clouds':
        img = '<img src="icons/sunny_cloudy.png" height="60" width="60">'
        break;
    case 'moderate rain':
        img = '<img src="icons/moderate_rain.png" height="60" width="60">'
        break;
    case 'heavy rain':
        img = '<img src="icons/heavy_rain.png" height="60" width="60">'
        break;
    case 'snow':
        img = '<img src="icons/snow.png" height="60" width="60">'
        break
    default:
        img = ''
}

      hr[x].innerHTML = date + img + "<br>" + data.list[i].weather[0].description
      + "<br>" + data.list[i].main.temp + "°" + "<br> Wind: " + data.list[i].wind.speed + 
      "<br> Humidity: " + data.list[i].main.humidity ;
      var catt = document.createAttribute("class");
      catt.value = "display";
      hr[x].setAttributeNode(catt);

      x = x+1;
    }

  };

}