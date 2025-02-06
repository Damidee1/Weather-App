// const API_KEY = "f23ee9deb4e1a7450f3157c44ed020e1";
// const weatherIcon = document.querySelector(".weather-icon");
// const searchButton = document.getElementById("getWeather");
// const cityInput = document.getElementById("city");

// function getWeather() {
//   const cityInput = document.getElementById("city");
//   const cityName = cityInput.value;

//   if (cityName === "") {
//     alert("Please enter a city name.");
//     return;
//   }

//   // Get the latitude and longitude of the city
//   const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

//   fetch(geoUrl)
//     .then((response) => response.json())
//     .then((geoData) => {
//       // Check if data is found
//       if (geoData.length === 0) {
//         alert("City not found!");
//         return;
//       }

//       const lat = geoData[0].lat;
//       const lon = geoData[0].lon;

//       // weather data using the latitude and longitude
//       const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

//       return fetch(weatherUrl);
//     })
//     .then((response) => response.json())
//     .then((weatherData) => {
//       displayWeather(weatherData);
//     })
//     .catch((error) => {
//       console.error("Error fetching weather data:", error);
//       alert("Error fetching weather data. Please try again.");
//     });
// }

// function displayWeather(data) {
//   // const weatherInfoDiv = document.getElementById("getWeather");

//   // Extract the city name,temperature, and description
//   const cityName = data.name;
//   const temperature = data.main.temp;
//   const description = data.weather[0].description;
//   const mainCondition = data.weather[0].main;

//   document.querySelector(".city").innerHTML = data.name;
//   document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
//   document.querySelector(".description").innerHTML =
//     data.weather[0].description;

//   // Set weather icon based on the main weather condition
//   switch (mainCondition) {
//     case "Clouds":
//       weatherIcon.src =
//         "https://cdn-icons-png.flaticon.com/512/7774/7774417.png";
//       break;
//     case "Clear":
//       weatherIcon.src =
//         "https://static-00.iconduck.com/assets.00/clear-day-icon-1024x1024-exbd0lm2.png";
//       break;
//     case "Mist":
//       weatherIcon.src =
//         "https://cdn3d.iconscout.com/3d/premium/thumb/weather-6546350-5376613.png";
//       break;
//     case "Snow":
//       weatherIcon.src =
//         "https://static.vecteezy.com/system/resources/previews/022/287/856/original/3d-rendering-snowy-weather-icon-3d-render-snow-with-cloud-icon-snowfall-png.png";
//       break;
//     case "Smoke":
//       weatherIcon.src =
//         "https://cdn3d.iconscout.com/3d/premium/thumb/smoke-5175068-4328031.png";
//       break;
//     case "Rain":
//       weatherIcon.src =
//         "https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png";
//       break;
//     case "Drizzle":
//       weatherIcon.src =
//         "https://www.freeiconspng.com/thumbs/cloud-rain-icons/cloud-rain-weather-icon-25.png";
//       break;
//     default:
//       weatherIcon.src =
//         "https://static-00.iconduck.com/assets.00/clear-day-icon-1024x1024-exbd0lm2.png"; // Default to clear sky icon
//       break;
//   }

//   // Display weather details
//   const weatherHtml = `
//     <h2>${cityName}</h2>
//     <p>Temperature: ${temperature}°C</p>
//     <p>Description: ${description}</p>
//   `;

//   weatherHtml.innerHTML = weatherHtml;
// }
// // searchButton.addEventListener("click", () => {
// //   displayWeather(cityInput.value);
// // });
// // displayWeather();
// API Key for OpenWeather
const API_KEY = "f23ee9deb4e1a7450f3157c44ed020e1";

// Event listener for button click
document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("city").value; // Get user input
  if (city) {
    getCoordinates(city); // Fetch location coordinates
  } else {
    showError("Please enter a city name.");
  }
});

// Function to fetch latitude & longitude based on city name
function getCoordinates(city) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  fetch(geoUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        showError("City not found. Please try again.");
        return;
      }
      const lat = data[0].lat;
      const lon = data[0].lon;
      getWeather(lat, lon);
      getForecast(lat, lon);
    })
    .catch((error) => {
      console.error("Error fetching coordinates:", error);
      showError("Failed to fetch location data.");
    });
}

// Function to get current weather data
function getWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!data.main) {
        showError("Weather data unavailable.");
        return;
      }
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      showError("Failed to fetch weather data.");
    });
}

// Function to get 5-day weather forecast
function getForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!data.list) {
        showError("Forecast data unavailable.");
        return;
      }
      displayForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching forecast:", error);
      showError("Failed to fetch forecast data.");
    });
}

// Function to display current weather
function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = `
        <p><strong>Location:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp.toFixed(2)} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    `;
  clearError();
}

// Function to display weather forecast
function displayForecast(forecastList) {
  const forecastResult = document.getElementById("forecastResult");
  forecastResult.innerHTML = ""; // Clear previous results

  // Group forecast data by date
  const dailyForecasts = {};
  forecastList.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = item; // Store only first forecast of the day
    }
  });

  // Display forecast
  Object.entries(dailyForecasts).forEach(([date, forecast]) => {
    forecastResult.innerHTML += `
            <div class="forecast-day">
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Temperature:</strong> ${forecast.main.temp.toFixed(
                  2
                )} °C</p>
                <p><strong>Weather:</strong> ${
                  forecast.weather[0].description
                }</p>
            </div>
        `;
  });
}

// Function to show an error message
function showError(message) {
  document.getElementById("errorMessage").textContent = message;
}

// Function to clear error messages
function clearError() {
  document.getElementById("errorMessage").textContent = "";
}

// First, get the latitude and longitude for the city
//const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

// Call getWeather API when the button is clicked
//const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
