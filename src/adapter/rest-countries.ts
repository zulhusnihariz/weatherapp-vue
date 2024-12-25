import axios from "axios"

const restcountries = axios.create({
  baseURL: import.meta.env.VITE_REST_COUNTRIES_BASEURL,
  timeout: 5000,
})


export default restcountries
