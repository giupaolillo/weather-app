function formatDate(date) {
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = date.getDate();

  if (currentDate < 10) {
    currentDate = "0" + currentDate;
  }

  if (month < 10) {
    month = "0" + month;
  }

  let fullDate = `${currentDate}.${month}.${year}`;
  return fullDate;
}

function formatDayOfTheWeek(date) {
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfTheWeek[date.getDay()];
}

function createIcon(iconId) {
  if (iconId === "01d") {
    return "bi bi-sun plus-icon";
  } else if (iconId === "01n") {
    return "bi bi-moon plus-icon";
  } else if (iconId === "02d") {
    return "bi bi-cloud-sun plus-icon";
  } else if (iconId === "02n") {
    return "bi bi-cloud-moon plus-icon";
  } else if (iconId === "03d" || iconId === "03n") {
    return "bi bi-cloud plus-icon";
  } else if (iconId === "04d" || iconId === "04n") {
    return "bi bi-clouds plus-icon";
  } else if (iconId === "09d" || iconId === "09n") {
    return "bi bi-cloud-drizzle plus-icon";
  } else if (iconId === "10d" || iconId === "10n") {
    return "bi bi-cloud-rain-heavy plus-icon";
  } else if (iconId === "11d" || iconId === "11n") {
    return "bi bi-cloud-lightning-rain plus-icon";
  } else if (iconId === "13d" || iconId === "13n") {
    return "bi bi-snow2 plus-icon";
  } else {
    return "bi bi-cloud-fog plus-icon";
  }
}

function temperatureFeedback(response) {
  celsiusTemperature = response.data.current.temp;
  maxCelsiusTemperature = response.data.daily[0].temp.max;
  minCelsiusTemperature = response.data.daily[0].temp.min;
  maxP1 = response.data.daily[1].temp.max;
  minP1 = response.data.daily[1].temp.min;
  maxP2 = response.data.daily[2].temp.max;
  minP2 = response.data.daily[2].temp.min;
  maxP3 = response.data.daily[3].temp.max;
  minP3 = response.data.daily[3].temp.min;
  maxP4 = response.data.daily[4].temp.max;
  minP4 = response.data.daily[4].temp.min;

  let temperature = Math.round(celsiusTemperature);
  let h2Temperature = document.querySelector("#temperature");
  h2Temperature.innerHTML = `${temperature}°C`;

  let temperatureDescription = response.data.current.weather[0].description;

  let iconDescriptionElement = document.querySelector("#icon-description");
  iconDescriptionElement.innerHTML = temperatureDescription;

  let mainIconCode = response.data.current.weather[0].icon;

  let mainIconElement = document.querySelector(
    "#current-location-weather-icon"
  );

  mainIconElement.classList = createIcon(mainIconCode);

  let currentMaxTemp = Math.round(response.data.daily[0].temp.max);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = `${currentMaxTemp}°C`;

  let currentMinTemp = Math.round(response.data.daily[0].temp.min);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = `${currentMinTemp}°C`;

  let currentHumidity = response.data.daily[0].humidity;
  let humidity = document.querySelector("#humidity-percentage");
  humidity.innerHTML = `<i class="bi bi-moisture humidity-icon"> </i>${currentHumidity}%`;

  displayForecast(response);
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

function getCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "84b3eb09d0d56e52df88211f6a4b3d2d";
  let endpointApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(endpointApi).then(temperatureSearchCoordinates);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#future-weather");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    let forecastDate = new Date(forecastDay.dt * 1000);

    forecastHTML =
      forecastHTML +
      `
              <div class="col-4 padding-8">
                <i class="${createIcon(
                  forecastDay.weather[0].icon
                )}" id="plus-1-icon"></i>
                <div id="forcast-element-contents">
                  <div class="forecast-date" id="plus-1-date">${formatDate(
                    forecastDate
                  )}</div>

                  <div class="forecast-weekday" id="weekday-plus1">Weekday</div>

                  <span class="mx-temperature"
                    ><i class="bi bi-thermometer-high"></i
                    ><span id="max-temp-plus1">${Math.round(
                      forecastDay.temp.max
                    )}°C</span
                    ></span
                  >
                  <br />
                  <span class="mn-temperature"
                    ><i class="bi bi-thermometer-low"></i
                    ><span id="min-temp-plus1">${Math.round(
                      forecastDay.temp.min
                    )}°C</span
                    ></span
                  >
                </div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function showLocation() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", newLocation);

let coordButton = document.querySelector("#coord-button");
coordButton.addEventListener("click", showLocation);

navigator.geolocation.getCurrentPosition(getCoordinates);

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

//dates (future) settings

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

let currentDayOfTheWeek = document.querySelector("#current-day-of-the-week");
currentDayOfTheWeek.innerHTML = formatDayOfTheWeek(now);

//temperature F C
// function displayCelsius(event) {
//   event.preventDefault();
//   let currentTemperatureElement = document.querySelector("#temperature");
//   let maxCelsius = document.querySelector("#max-temp");
//   let minCelsius = document.querySelector("#min-temp");
//   let maxPlus1 = document.querySelector("#max-temp-plus1");
//   let maxPlus2 = document.querySelector("#max-temp-plus2");
//   let maxPlus3 = document.querySelector("#max-temp-plus3");
//   let maxPlus4 = document.querySelector("#max-temp-plus4");
//   let minPlus1 = document.querySelector("#min-temp-plus1");
//   let minPlus2 = document.querySelector("#min-temp-plus2");
//   let minPlus3 = document.querySelector("#min-temp-plus3");
//   let minPlus4 = document.querySelector("#min-temp-plus4");

//   currentTemperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
//   maxCelsius.innerHTML = `${Math.round(maxCelsiusTemperature)}°C`;
//   minCelsius.innerHTML = `${Math.round(minCelsiusTemperature)}°C`;
//   maxPlus1.innerHTML = `${Math.round(maxP1)}°C`;
//   maxPlus2.innerHTML = `${Math.round(maxP2)}°C`;
//   maxPlus3.innerHTML = `${Math.round(maxP3)}°C`;
//   maxPlus4.innerHTML = `${Math.round(maxP4)}°C`;
//   minPlus1.innerHTML = `${Math.round(minP1)}°C`;
//   minPlus2.innerHTML = `${Math.round(minP2)}°C`;
//   minPlus3.innerHTML = `${Math.round(minP3)}°C`;
//   minPlus4.innerHTML = `${Math.round(minP4)}°C`;
// }

// function displayFahrenheit(event) {
//   event.preventDefault();
//   let currentTemperatureElement = document.querySelector("#temperature");
//   let maxCelsius = document.querySelector("#max-temp");
//   let minCelsius = document.querySelector("#min-temp");
//   let maxFahPlus1 = document.querySelector("#max-temp-plus1");
//   let maxFahPlus2 = document.querySelector("#max-temp-plus2");
//   let maxFahPlus3 = document.querySelector("#max-temp-plus3");
//   let maxFahPlus4 = document.querySelector("#max-temp-plus4");
//   let minFahPlus1 = document.querySelector("#min-temp-plus1");
//   let minFahPlus2 = document.querySelector("#min-temp-plus2");
//   let minFahPlus3 = document.querySelector("#min-temp-plus3");
//   let minFahPlus4 = document.querySelector("#min-temp-plus4");

//   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//   let maxFahrenheit = (maxCelsiusTemperature * 9) / 5 + 32;
//   let minFahrenheit = (minCelsiusTemperature * 9) / 5 + 32;
//   let maxFahrenheitPlus1 = (maxP1 * 9) / 5 + 32;
//   let maxFahrenheitPlus2 = (maxP2 * 9) / 5 + 32;
//   let maxFahrenheitPlus3 = (maxP3 * 9) / 5 + 32;
//   let maxFahrenheitPlus4 = (maxP4 * 9) / 5 + 32;
//   let minFahrenheitPlus1 = (minP1 * 9) / 5 + 32;
//   let minFahrenheitPlus2 = (minP2 * 9) / 5 + 32;
//   let minFahrenheitPlus3 = (minP3 * 9) / 5 + 32;
//   let minFahrenheitPlus4 = (minP4 * 9) / 5 + 32;

//   currentTemperatureElement.innerHTML = `${Math.round(
//     fahrenheitTemperature
//   )}°F`;
//   maxCelsius.innerHTML = `${Math.round(maxFahrenheit)}°F`;
//   minCelsius.innerHTML = `${Math.round(minFahrenheit)}°F`;

//   maxFahPlus1.innerHTML = `${Math.round(maxFahrenheitPlus1)}°F`;
//   maxFahPlus2.innerHTML = `${Math.round(maxFahrenheitPlus2)}°F`;
//   maxFahPlus3.innerHTML = `${Math.round(maxFahrenheitPlus3)}°F`;
//   maxFahPlus4.innerHTML = `${Math.round(maxFahrenheitPlus4)}°F`;
//   minFahPlus1.innerHTML = `${Math.round(minFahrenheitPlus1)}°F`;
//   minFahPlus2.innerHTML = `${Math.round(minFahrenheitPlus2)}°F`;
//   minFahPlus3.innerHTML = `${Math.round(minFahrenheitPlus3)}°F`;
//   minFahPlus4.innerHTML = `${Math.round(minFahrenheitPlus4)}°F`;
// }

// let celsiusTemperature = null;
// let maxCelsiusTemperature = null;
// let minCelsiusTemperature = null;
// let maxP1 = null;
// let minP1 = null;
// let maxP2 = null;
// let minP2 = null;
// let maxP3 = null;
// let minP3 = null;
// let maxP4 = null;
// let minP4 = null;

// let celsius = document.querySelector("#degree-unit-c");
// let fahrenheit = document.querySelector("#degree-unit-f");
// celsius.addEventListener("click", displayCelsius);
// fahrenheit.addEventListener("click", displayFahrenheit);
