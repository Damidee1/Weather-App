// API Key for OpenWeather
const API_KEY = "f23ee9deb4e1a7450f3157c44ed020e1";

// Event listener for button click
document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value; // Get user input
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
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                showError("City not found. Please try again.");
                return;
            }
            const lat = data[0].lat;
            const lon = data[0].lon;
            getWeather(lat, lon);
            getForecast(lat, lon);
        })
        .catch(error => {
            console.error("Error fetching coordinates:", error);
            showError("Failed to fetch location data.");
        });
}

// Function to get current weather data
function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.main) {
                showError("Weather data unavailable.");
                return;
            }
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            showError("Failed to fetch weather data.");
        });
}

// Function to get 5-day weather forecast
function getForecast(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.list) {
                showError("Forecast data unavailable.");
                return;
            }
            displayForecast(data.list);
        })
        .catch(error => {
            console.error("Error fetching forecast:", error);
            showError("Failed to fetch forecast data.");
        });
}

// Function to display current weather
function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <p><strong>Location:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp.toFixed(2)} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    `;
    clearError();
}

// Function to display weather forecast
function displayForecast(forecastList) {
    const forecastResult = document.getElementById('forecastResult');
    forecastResult.innerHTML = ''; // Clear previous results

    // Group forecast data by date
    const dailyForecasts = {};
    forecastList.forEach(item => {
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
                <p><strong>Temperature:</strong> ${forecast.main.temp.toFixed(2)} °C</p>
                <p><strong>Weather:</strong> ${forecast.weather[0].description}</p>
            </div>
        `;
    });
}

// Function to show an error message
function showError(message) {
    document.getElementById('errorMessage').textContent = message;
}

// Function to clear error messages
function clearError() {
    document.getElementById('errorMessage').textContent = '';
}



// First, get the latitude and longitude for the city
//const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

// Call getWeather API when the button is clicked
//const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
