# Weather Dashboard 🌤️

## Overview

The **Weather Dashboard** is a simple web application that allows users to enter a location (city name or postal code) and retrieve real-time weather data using the OpenWeatherMap API. The dashboard dynamically updates to display the location, temperature, and a short weather description.

## Features

- 🌍 Search weather by city name or postal code.
- 📍 Automatic conversion of location to latitude and longitude using the OpenWeatherMap Geocoding API.
- 🌡️ Displays temperature in Celsius or Fahrenheit.
- ☁️ Provides a brief weather description (e.g., "clear sky", "light rain").
- 🔄 Dynamically updates the UI with fetched weather data.
- ❌ Handles errors gracefully (e.g., invalid locations, failed API requests).

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **API:** OpenWeatherMap Geocoding API & OpenWeatherMap Weather API  
- **Version Control:** Git & GitHub  

## How It Works

1. **Enter a location** (city name or postal code) in the input field.
2. The app fetches **latitude and longitude** from the OpenWeatherMap Geocoding API.
   ```bash
   http://api.openweathermap.org/geo/1.0/direct?q=<location>&appid=YOUR_API_KEY
   ```
3. It then fetches **current weather data** using the retrieved coordinates.
   ```bash
   https://api.openweathermap.org/data/2.5/weather?lat=<lat>&lon=<lon>&appid=YOUR_API_KEY
   ```
4. The **UI updates dynamically** to display the location name, temperature, and weather description.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-dashboard
   ```
3. Open `index.html` in your browser.

## API Setup

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/).
2. Replace `YOUR_API_KEY` in the API request URLs with your actual API key.

## Example JSON Response

```json
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
```

## Error Handling

- Displays an error message if the location is invalid.
- Handles failed API requests and shows appropriate feedback.

## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).