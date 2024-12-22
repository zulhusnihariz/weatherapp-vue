import openweatherapi from "@/adapter/open-weather-api"
import type { ApiResponse, OpenWeatherQuery } from "@/types/api"
import type { ForecastResponse } from "@/types/forecast"
import type { WeatherResponse } from "@/types/weather"
import { tryCatch } from "@/utils/try-catch"

export async function fetchWeather(options: OpenWeatherQuery): Promise<ApiResponse<WeatherResponse>> {
  return await tryCatch<WeatherResponse>(async () => {
    const res = await openweatherapi.get('/weather', { params: options })
    return res.data
  })
}

export async function fetchForecast(options: OpenWeatherQuery): Promise<ApiResponse<ForecastResponse>> {
  return await tryCatch<ForecastResponse>(async () => {
    const res = await openweatherapi.get('/forecast', { params: options })

    return res.data
  })
}
