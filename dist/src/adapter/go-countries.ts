
import axios from "axios"

const gocountries = axios.create({
  baseURL: import.meta.env.VITE_GO_COUNTRIES_BASEURL,
  timeout: 5000,
})

export default gocountries
