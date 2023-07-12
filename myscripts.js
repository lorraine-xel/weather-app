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
let minutes = now.getMinutes();

let time = document.querySelector("#time");
time.innerHTML = `${day}, ${hour}:${minutes}`;

// Search form

function search(event) {
  let searchQuery = document.querySelector("#search");
  let city = document.querySelector("#current-city");
  city.innerHTML = `${searchQuery.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
