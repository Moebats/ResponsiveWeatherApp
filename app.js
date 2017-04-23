
//setting some DOM references for use in app.js

var searchButton = document.querySelector('#getWeatherButton');
var userCity = document.querySelector('#city');
var metric = document.querySelector('#tType');
var weatherDiv = document.querySelector('#weather');
var weatherCity = document.querySelector('#weatherCity');
var weatherDescription = document.querySelector('#weatherDescription');
var weatherTemperature = document.querySelector('#weatherTemperature');


//Weather function which organizes data retrieved by XMLhttpRequest
function Weather(cityName, description, temperature){
  this.cityName = cityName;
  this.description = description;
  this.temperature = temperature;
}


searchButton.addEventListener('click', searchWeather);

//function executes when the user clicks the get weather button
function searchWeather(){
  var cityName = userCity.value;
  var tType = metric.value;

  if (cityName.length == 0) {
    return alert('Please enter a City name');
  }
  
  //http request
  var http = new XMLHttpRequest();
  var apiKey = '848716227d070904a2aba846e50d758d';
  var url;

  if(tType == 'F') {
  url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid='+ apiKey;

  } else{
  url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid='+ apiKey;
  }

  var method = 'GET';

  http.open(method, url);
  http.onreadystatechange = function (){

    if (http.readyState == XMLHttpRequest.DONE && http.status === 200){

      var data = JSON.parse(http.responseText);
      console.log(data);
      var weatherData = new Weather(cityName, data.weather[0].description, data.main.temp);

    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert('Something went wrong, try again');
    }
    outputWeather(data);
  };
  http.send();

  function outputWeather(data){

    var img;

      switch(data.weather[0].description) {
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
    default:
        img = ''
}
	
    weatherCity.textContent = cityName.toUpperCase();
    weatherDescription.innerHTML = img + "<br> Current conditions: " + data.weather[0].description;
    weatherTemperature.innerHTML = "The current temperature is: "  + data.main.temp +  " ° <br>" +

    "<br> Wind: " + data.wind.speed + 
      ", Humidity: " + data.main.humidity + "<br> </br>" + 

    "<span>Weather information for the next 5 days: </span> <br><br>";

  };

}