Weather Dashboard 🌤️
Overview
The Weather Dashboard is a simple web application that allows users to enter a location (city name or postal code) and retrieve real-time weather data using the OpenWeatherMap API. The dashboard dynamically updates to display the location, temperature, and a short weather description.

Features
🌍 Search weather by city name or postal code.
📍 Automatic conversion of location to latitude and longitude using the OpenWeatherMap Geocoding API.
🌡️ Displays temperature in Celsius or Fahrenheit.
☁️ Provides a brief weather description (e.g., "clear sky", "light rain").
🔄 Dynamically updates the UI with fetched weather data.
❌ Handles errors gracefully (e.g., invalid locations, failed API requests).
Technologies Used
Frontend: HTML, CSS, JavaScript
API: OpenWeatherMap Geocoding API & OpenWeatherMap Weather API
Version Control: Git & GitHub
How It Works
Enter a location (city name or postal code) in the input field.
The app fetches latitude and longitude from the OpenWeatherMap Geocoding API.
http://api.openweathermap.org/geo/1.0/direct?q=<location>&appid=YOUR_API_KEY
It then fetches current weather data using the retrieved coordinates.
https://api.openweathermap.org/data/2.5/weather?lat=<lat>&lon=<lon>&appid=YOUR_API_KEY
The UI updates dynamically to display the location name, temperature, and weather description.
Installation
Clone the repository:
git clone https://github.com/yourusername/weather-dashboard.git
Navigate to the project directory:
cd weather-dashboard
Open index.html in your browser.
API Setup
Sign up for a free API key at OpenWeatherMap.
Replace YOUR_API_KEY in the API request URLs with your actual API key.
Example JSON Response
{
"name": "London",
"main": {
"temp": 15.5
},
"weather": [
{
"description": "light rain"
}
]
}
Error Handling
Displays an error message if the location is invalid.
Handles failed API requests and shows appropriate feedback.
Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

License
This project is open-source and available under the MIT License.
