//general date settings

let now = new Date();
let date = now.getDate();
let year = now.getFullYear();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dez",
];
let month = months[now.getMonth()];

let today = `${date} ${month}, ${year}`;

let currentDay = document.querySelector("#today");
currentDay.innerHTML = today;

//time settings

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = `${hours}:${minutes}`;

let currentTime = document.querySelector("#local-time");
currentTime.innerHTML = time;

//day of the week settings

let daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
let dayOfTheWeek = daysOfTheWeek[now.getDay()];

let currentDayOfTheWeek = document.querySelector("#current-day-of-the-week");
currentDayOfTheWeek.innerHTML = `${dayOfTheWeek}`;

//day of the week (future) settings

let dayOfTheWeekPlus1 = daysOfTheWeek[now.getDay() + 1];
let dDayPlus1 = document.querySelector("#weekday-plus1");
dDayPlus1.innerHTML = dayOfTheWeekPlus1;

let dayOfTheWeekPlus2 = daysOfTheWeek[now.getDay() + 2];
let dDayPlus2 = document.querySelector("#weekday-plus2");
dDayPlus2.innerHTML = dayOfTheWeekPlus2;

let dayOfTheWeekPlus3 = daysOfTheWeek[now.getDay() + 3];
let dDayPlus3 = document.querySelector("#weekday-plus3");
dDayPlus3.innerHTML = dayOfTheWeekPlus3;

let dayOfTheWeekPlus4 = daysOfTheWeek[now.getDay() + 4];
let dDayPlus4 = document.querySelector("#weekday-plus4");
dDayPlus4.innerHTML = dayOfTheWeekPlus4;

//dates (future) settings

//search engine

function temperatureFeedback(response) {
  let temperature = Math.round(response.data.current.temp);
  let h2Temperature = document.querySelector("#temperature");
  h2Temperature.innerHTML = temperature;

  let currentMaxTemp = Math.round(response.data.daily[0].temp.max);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = currentMaxTemp;

  let currentMinTemp = Math.round(response.data.daily[0].temp.min);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = currentMinTemp;

  let currentHumidity = response.data.daily[0].humidity;
  let humidity = document.querySelector("#humidity-percentage");
  humidity.innerHTML = `${currentHumidity}%`;

  let maxTempPlus1 = Math.round(response.data.daily[1].temp.max);
  let maxPlus1 = document.querySelector("#max-temp-plus1");
  maxPlus1.innerHTML = maxTempPlus1;

  let minTempPlus1 = Math.round(response.data.daily[1].temp.min);
  let minPlus1 = document.querySelector("#min-temp-plus1");
  minPlus1.innerHTML = minTempPlus1;

  let maxTempPlus2 = Math.round(response.data.daily[2].temp.max);
  let maxPlus2 = document.querySelector("#max-temp-plus2");
  maxPlus2.innerHTML = maxTempPlus2;

  let minTempPlus2 = Math.round(response.data.daily[2].temp.min);
  let minPlus2 = document.querySelector("#min-temp-plus2");
  minPlus2.innerHTML = minTempPlus2;

  let maxTempPlus3 = Math.round(response.data.daily[3].temp.max);
  let maxPlus3 = document.querySelector("#max-temp-plus3");
  maxPlus3.innerHTML = maxTempPlus3;

  let minTempPlus3 = Math.round(response.data.daily[3].temp.min);
  let minPlus3 = document.querySelector("#min-temp-plus3");
  minPlus3.innerHTML = minTempPlus3;

  let maxTempPlus4 = Math.round(response.data.daily[4].temp.max);
  let maxPlus4 = document.querySelector("#max-temp-plus4");
  maxPlus4.innerHTML = maxTempPlus4;

  let minTempPlus4 = Math.round(response.data.daily[4].temp.min);
  let minPlus4 = document.querySelector("#min-temp-plus4");
  minPlus4.innerHTML = minTempPlus4;
}

function temperatureSearchCoordinates(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let units = "metric";
  let apiKey = "84b3eb09d0d56e52df88211f6a4b3d2d";
  let endpointApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly,alerts&appid=${apiKey}`;

  axios.get(endpointApi).then(temperatureFeedback);
}

function newLocation(event) {
  event.preventDefault();
  let newLocationInput = document.querySelector("#new-location-input");
  let city = newLocationInput.value;
  let units = "metric";
  let apiKey = "84b3eb09d0d56e52df88211f6a4b3d2d";
  let endpointApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(endpointApi).then(temperatureSearchCoordinates);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", newLocation);

// my location button

function getCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "84b3eb09d0d56e52df88211f6a4b3d2d";
  let endpointApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(endpointApi).then(temperatureSearchCoordinates);
}

function showLocation() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let coordButton = document.querySelector("#coord-button");
coordButton.addEventListener("click", showLocation);

// current location temperature display on load

navigator.geolocation.getCurrentPosition(getCoordinates);

//temperature F C
function displayCelsius(event) {
  event.preventDefault();

  let currentTemperature = document.querySelector("#temperature");

  currentTemperature.innerHTML = "24";
}

function displayFahrenheit(event) {
  event.preventDefault();

  //let unitFahrenheit = document.getElementsByClassName(".unit-setting");
  //let unitFahrenheit = document.querySelectorAll(".unit-setting");
  //unitFahrenheit.innerHTML = "°F";
  let currentTemperature = document.querySelector("#temperature");

  currentTemperature.innerHTML = "60";
}

let celsius = document.querySelector("#degree-unit-c");
let fahrenheit = document.querySelector("#degree-unit-f");
celsius.addEventListener("click", displayCelsius);
fahrenheit.addEventListener("click", displayFahrenheit);
