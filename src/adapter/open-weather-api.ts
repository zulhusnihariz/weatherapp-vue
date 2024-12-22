import axios from 'axios'

const openweatherapi = axios.create({
  baseURL: `${import.meta.env.VITE_OPEN_WEATHER_BASE_URL}`,
  timeout: 5000,
})

openweatherapi.interceptors.request.use(
  function (config) {
    const params = {
      APPID: import.meta.env.VITE_OPEN_WEATHER_APIKEY,
      ...config.params,
    }

    config.params = params
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default openweatherapi
