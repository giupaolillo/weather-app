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

function formatDayOfTheWeek(timestamp) {
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfTheWeek[timestamp.getDay()];
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

function changeThemeColours(iconId) {
  let body = document.querySelector("body");

  if (iconId === "01d" || iconId === "02d") {
    body.classList = "sunny-background";
  } else {
    if (iconId === "01n" || iconId === "02n") {
      body.classList = "night-background";
    } else {
      if (
        iconId === "03d" ||
        iconId === "03n" ||
        iconId === "04d" ||
        iconId === "04n" ||
        iconId === "50d" ||
        iconId === "50n"
      ) {
        body.classList = "cloudy-background";
      } else {
        if (iconId === "13d" || iconId === "13n") {
          body.classList = "snowy-background";
        } else {
          body.classList = "rainy-background";
        }
      }
    }
  }
}

function temperatureFeedback(response) {
  celsiusTemperature = response.data.current.temp;

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
  changeThemeColours(mainIconCode);
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
  let forecast = response.data.daily.slice(1, 4);

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

                  <div class="forecast-weekday" id="weekday-plus1">${formatDayOfTheWeek(
                    forecastDate
                  )}</div>

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

function search(city) {
  let units = "metric";
  let apiKey = "84b3eb09d0d56e52df88211f6a4b3d2d";
  let endpointApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(endpointApi).then(temperatureSearchCoordinates);
}

search("Alaska");

let form = document.querySelector("#search-form");
form.addEventListener("submit", newLocation);

let coordButton = document.querySelector("#coord-button");
coordButton.addEventListener("click", showLocation);

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
