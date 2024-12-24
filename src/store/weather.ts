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
const myLocation = ref({ lon: 0, lat: 0 })

export default function useWeather() {
  const loading = ref(false)
  const error = ref<Error>()

  function setWeather(data: Partial<WeatherDetails>) {
    if (data.weather) state.value.weather = { ...state.value.weather, ...data.weather }
    if (data.forecast) state.value.forecast = { ...state.value.forecast, ...data.forecast }
  }

  async function getWeather(options: OpenWeatherQuery, refetch = false): Promise<WeatherResponse> {
    if (!isEmptyObject(state.value.weather) && !refetch) {
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
      loading.value = false
      setToastEvent({ severity: 'error', summary: err.message, life: 3000 })
      return initial.weather
    }

    setWeather({ weather: data })

    loading.value = false
    return state.value.weather
  }

  async function getForecast(options: OpenWeatherQuery, refetch = false): Promise<ForecastResponse> {

    if (!isEmptyObject(state.value.forecast) && !refetch) {
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
      loading.value = false
      setToastEvent({ severity: 'error', summary: err.message, life: 3000 })
      return initial.forecast
    }

    setWeather({ forecast: data })
    loading.value = false

    return state.value.forecast
  }

  function saveWeather(weather: WeatherResponse) {
    savedWeather.value = [...savedWeather.value, weather]
    localstorage.setItem<WeatherResponse[]>(LS_KEY.WEATHER, savedWeather.value)
  }

  function discardWeather(id: number) {
    savedWeather.value = savedWeather.value.filter((el) => el.id !== id)
    localstorage.setItem<WeatherResponse[]>(LS_KEY.WEATHER, savedWeather.value)
  }

  async function refreshWeather(id: number): Promise<void> {
    const weather = await getWeather({ id: `${id}`, units: 'metric' }, true)
    await getForecast({ id: `${id}`, units: 'metric' }, true)

    const index = savedWeather.value.findIndex(el => el.id === weather.id)
    if (index > -1) {
      discardWeather(id)
      saveWeather(weather)
    }
  }

  function isMyLocation(lon: number, lat: number) {
    return lon.toFixed(2) == myLocation.value.lon.toFixed(2) && lat.toFixed(2) == myLocation.value.lat.toFixed(2)
  }

  function isMyLocationSaved(lon: number, lat: number) {
    const saved = getSavedWeather()
    if (saved.length == 0) {
      return false
    }

    const index = saved.findIndex(el => {
      return el.coord.lat.toFixed(2) == lat.toFixed(2) && el.coord.lon.toFixed(2) == lon.toFixed(2)
    })

    return index === -1 ? false : true
  }

  async function saveMyLocation(lat: number, lon: number): Promise<void> {
    myLocation.value = { lat, lon }
    if (isMyLocationSaved(lon, lat)) return

    const weather = await getWeather({ lat, lon, units: 'metric' })
    saveWeather(weather)
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
    weather: computed(() => state.value.weather),
    isWeatherSaved: computed(() =>
      savedWeather.value.findIndex((el) => el.id === state.value.weather.id) >= 0 ? true : false,
    ),
    setWeather,
    saveWeather,
    getWeather,
    getForecast,
    getSavedWeather,
    discardWeather,
    resetWeather,
    saveMyLocation,
    refreshWeather,
    isMyLocation,
  }
}
