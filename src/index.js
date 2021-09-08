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
];
let dayOfTheWeek = daysOfTheWeek[now.getDay()];

let currentDayOfTheWeek = document.querySelector("#current-dotw");
currentDayOfTheWeek.innerHTML = `${dayOfTheWeek}`;

//search engine

function temperatureSearchFeedback(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let h2Temperature = document.querySelector("#temperature");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  let humidity = document.querySelector(".humidity-percentage");

  humidity.innerHTML = `${response.data.main.humidity}%`;
  maxTemp.innerHTML = `Max ${Math.round(response.data.main.temp_max)}°C`;
  minTemp.innerHTML = `Min ${Math.round(response.data.main.temp_min)}°C`;
  h2Temperature.innerHTML = `${temperature}°C`;
  h1.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
}

function newLocation(event) {
  event.preventDefault();
  let newLocationInput = document.querySelector("#new-location-input");
  let city = newLocationInput.value;
  let units = "metric";
  let apiKey = "84b3eb09d0d56e52df88211f6a4b3d2d";
  let endpointApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(endpointApi).then(temperatureSearchFeedback);
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

  axios.get(endpointApi).then(temperatureSearchFeedback);
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

  let currentTemperature = document.querySelector(
    ".current-location-temperature"
  );

  currentTemperature.innerHTML = "24°C ";
}

function displayFahrenheit(event) {
  event.preventDefault();

  let currentTemperature = document.querySelector(
    ".current-location-temperature"
  );

  currentTemperature.innerHTML = "60°F ";
}

let celsius = document.querySelector(".degree-unit-c");
let fahrenheit = document.querySelector(".degree-unit-f");
celsius.addEventListener("click", displayCelsius);
fahrenheit.addEventListener("click", displayFahrenheit);
