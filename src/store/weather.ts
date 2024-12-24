import localstorage from '@/adapter/local-storage'
import dummyForecast from '@/data/default-forecast.json'
import dummyWeather from '@/data/default-weather.json'
import { setToastEvent } from '@/main'
import { fetchForecast, fetchWeather } from '@/repositories/weather'
import type { ApiResponse, OpenWeatherQuery } from '@/types/api'
import type { ForecastResponse } from '@/types/forecast'
import { LS_KEY } from '@/types/local-storage'
import type { WeatherResponse } from '@/types/weather'
import { isEmptyObject } from '@/utils/validate'
import { computed, ref } from 'vue'

export interface WeatherDetails {
  weather: WeatherResponse
  forecast: ForecastResponse
}

const initial = {
  weather: {},
  forecast: {},
} as WeatherDetails

const useDummy = Boolean(import.meta.env.VITE_DUMMY_DATA == 'true')
const savedWeather = ref<WeatherResponse[]>([])
const state = ref(structuredClone(initial))

export default function useWeather() {
  const loading = ref(false)
  const error = ref<Error>()

  function setWeather(data: Partial<WeatherDetails>) {
    if (data.weather) state.value.weather = { ...state.value.weather, ...data.weather }
    if (data.forecast) state.value.forecast = { ...state.value.forecast, ...data.forecast }
  }

  async function getWeather(options: OpenWeatherQuery): Promise<WeatherResponse> {
    if (!isEmptyObject(state.value.weather)) {
      return state.value.weather
    }

    loading.value = true

    if (useDummy) {
      let { data }: ApiResponse<WeatherResponse> = {
        data: dummyWeather,
        error: undefined,
      }

      setWeather({ weather: data })
      loading.value = false

      return state.value.weather
    }

    const { data, error: err } = await fetchWeather(options)

    if (err !== undefined) {
      error.value = err
      setToastEvent({ severity: 'error', summary: err.message, life: 3000 })
      loading.value = false
      return initial.weather
    }

    setWeather({ weather: data })

    loading.value = false
    return state.value.weather
  }

  async function getForecast(options: OpenWeatherQuery): Promise<ForecastResponse> {

    if (!isEmptyObject(state.value.forecast)) {
      return state.value.forecast
    }

    loading.value = true

    if (useDummy) {
      let { data }: ApiResponse<ForecastResponse> = {
        data: dummyForecast as ForecastResponse,
        error: undefined,
      }

      setWeather({ forecast: data })
      loading.value = false
      return state.value.forecast
    }

    const { data, error: err } = await fetchForecast(options)
    if (err !== undefined) {
      error.value = err
      setToastEvent({ severity: 'error', summary: err.message, life: 3000 })
      loading.value = false
      return initial.forecast
    }

    setWeather({ forecast: data })
    loading.value = false

    return state.value.forecast
  }

  function saveWeather() {
    savedWeather.value = [...savedWeather.value, state.value.weather]
    localstorage.setItem<WeatherResponse[]>(LS_KEY.WEATHER, savedWeather.value)
    setToastEvent({ "severity": "success", summary: "Weather Saved", life: 3000 })
  }

  function discardWeather() {
    savedWeather.value = savedWeather.value.filter((el) => el.id !== state.value.weather.id)
    localstorage.setItem<WeatherResponse[]>(LS_KEY.WEATHER, savedWeather.value)
    setToastEvent({ "severity": "warn", summary: "Weather Removed", life: 3000 })
  }

  function getSavedWeather(): WeatherResponse[] {
    const saved = localstorage.getItem<WeatherResponse[]>(LS_KEY.WEATHER)

    if (saved === null) {
      localstorage.setItem<WeatherResponse[]>(LS_KEY.WEATHER, [])
      savedWeather.value = []
      return savedWeather.value
    }

    savedWeather.value = saved
    return savedWeather.value
  }

  function resetWeather() {
    state.value = structuredClone(initial)
  }

  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    savedWeather: computed(() => savedWeather.value),
    isWeatherSaved: computed(() =>
      savedWeather.value.findIndex((el) => el.id === state.value.weather.id) >= 0 ? true : false,
    ),
    setWeather,
    saveWeather,
    getWeather,
    getForecast,
    getSavedWeather,
    discardWeather,
    resetWeather
  }
}
