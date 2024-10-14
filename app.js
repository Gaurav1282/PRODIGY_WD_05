const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "847e9b815e27df6ea5bf3fb888bb0e67";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === "404") {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  } else {
    weather_body.style.display = "flex";
    location_not_found.style.display = "none";
  }

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

  description.innerHTML = `${weather_data.weather[0].description}`;

  humidity.innerHTML = `${weather_data.main.humidity}%`;

  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  const weatherCondition = weather_data.weather[0].main.toLowerCase();

  switch (weatherCondition) {
    case "clouds":
      weather_img.src = "./Assets/cloud.png";
      break;

    case "clear":
      weather_img.src = "./Assets/clear.png";
      break;

    case "rain":
      weather_img.src = "./Assets/rain.png";
      break;

    case "mist":
      weather_img.src = "./Assets/mist.png";
      break;

    case "snow":
      weather_img.src = "./Assets/snow.png";
      break;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(inputBox.value);
  }
});
