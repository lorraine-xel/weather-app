// Day and time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = (`0` + now.getMinutes()).slice(-2);

let time = document.querySelector("#time");
time.innerHTML = `${day}, ${hour}:${minutes}`;

// Search form

function getForecast(coordinates) {
  console.log(coordinates);
  let key = "e3eft7bfc6da6ae4d3f22301108b40fo";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(response.data.main.temp) + `°`;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + `%`;
  document.querySelector("#winds").innerHTML =
    Math.round(response.data.wind.speed) + `km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchHistory.push(city);
  localStorage.setItem(
    `searchHistory_${search}`,
    JSON.stringify(searchHistory)
  );
  console.log(`Search History for Form ${search}:`, searchHistory);

  for (let i = 0; i < recentSearchParagraphs.length; i++) {
    let index = searchHistory.length - 1 - i;
    if (index >= 0) {
      recentSearchParagraphs[i].textContent = `${searchHistory[index]}`;
    } else {
      recentSearchParagraphs[i].textContent = ``;
    }
  }
  searchCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
let searchHistory =
  JSON.parse(localStorage.getItem(`searchHistory_${search}`)) || [];

let recentSearchParagraphs = [
  document.querySelector("#search1"),
  document.querySelector("#search2"),
  document.querySelector("#search3"),
];

searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Lisbon");

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  console.log(response.data.daily);

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.time
              )}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png"
                alt=""
                width="42"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> ${Math.round(
                  forecastDay.temperature.maximum
                )}° </span>
                <span class="weather-forecast-temperature-min"> ${Math.round(
                  forecastDay.temperature.minimum
                )}° </span>
              </div>
            </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Search history
