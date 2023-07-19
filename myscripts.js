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
}

function search(event) {
  event.preventDefault();
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let searchCity = document.querySelector("#search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Show current city

function showCurrentCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector("#current-temperature");
  currentCity.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = `${temperature}°`;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + `%`;
  document.querySelector("#winds").innerHTML =
    Math.round(response.data.wind.speed) + `km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentCity);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
