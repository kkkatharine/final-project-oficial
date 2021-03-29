function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `Today | ${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let weatherConditionElement = document.querySelector("#weather-condition");
  weatherConditionElement.innerHTML = response.data.weather[0].description;
  let minTempElement = document.querySelector("#min-temp");
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  let maxTempElement = document.querySelector("#max-temp");
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);
  forecastElement.innerHTML = ` <div class="col-3">
    <h3>${formatHours(forecast.dt * 1000)}</h3>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" />
    <div class="weather-forecast-temperature">
      <strong>${Math.round(forecast.main.temp_max)}º</strong> ${Math.round(
    forecast.main.temp_min
  )}º
    </div>
  </div>`;

  forecast = response.data.list[1];
  forecastElement.innerHTML += ` <div class="col-3">
<h3>${formatHours(forecast.dt * 1000)}</h3>
<img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" />
<div class="weather-forecast-temperature">
  <strong>${Math.round(forecast.main.temp_max)}º</strong> ${Math.round(
    forecast.main.temp_min
  )}º
</div>
</div>`;

  forecast = response.data.list[2];
  forecastElement.innerHTML += ` <div class="col-3">
<h3>${formatHours(forecast.dt * 1000)}</h3>
<img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" />
<div class="weather-forecast-temperature">
  <strong>${Math.round(forecast.main.temp_max)}º</strong> ${Math.round(
    forecast.main.temp_min
  )}º
</div>
</div>`;

  forecast = response.data.list[3];
  forecastElement.innerHTML += ` <div class="col-3">
<h3>${formatHours(forecast.dt * 1000)}</h3>
<img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" />
<div class="weather-forecast-temperature">
  <strong>${Math.round(forecast.main.temp_max)}º</strong> ${Math.round(
    forecast.main.temp_min
  )}º
</div>
</div>`;
}

function search(city) {
  let apiKey = "21cae2f9a5ebbd41bf28f1b8f97e683b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
search("Porto");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "21cae2f9a5ebbd41bf28f1b8f97e683b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
