# Weather App

A simple weather application built using **Vue 3 CLI** and **Vite**. This app allows users to check the weather of various cities, retrieve current weather, hourly forecasts and weekly forecasts informations

## Features

- Current weather information via the [OpenWeather API](https://openweathermap.org/).
- Country data powered by the [REST Countries API](https://restcountries.com/).
- City and country code data provided by a custom Go API hosted on Render [City & Country Code API](https://go-countries.onrender.com).

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Vue CLI](https://cli.vuejs.org/)
- An API key for the [OpenWeather API](https://home.openweathermap.org/users/sign_up).

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory. Use the provided `.env.example` file as template.

   Plug in your OpenWeather API key `VITE_OPEN_WEATHER_APIKEY={your_api_key}`.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## Usage

### OpenWeather API

Ensure you have a valid OpenWeather API key configured in your `.env` file. The app uses this key to fetch real-time weather data.

### REST Countries API

This API is used to retrieve country information. No setup is required for this dependency.

### Go API

The Go API is used to search city list and country code by timezone. It is hosted on Render. Note:

- The Go API will automatically **timeout after 15 minutes** of inactivity.
- The first request after a timeout may take longer to process while the API restarts.
- You can verify if the API is active by visiting its base URL (`https://go-countries.onrender.com?query=Malaysia`)
  directly in your browser or using tools like `curl` or Postman.

## Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start the development server. |
| `npm run build` | Build the app for production. |
| `npm run serve` | Serve the production build.   |
| `npm run lint`  | Lint and fix source files.    |
