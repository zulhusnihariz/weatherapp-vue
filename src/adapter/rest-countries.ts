import axios from "axios"

const restcountries = axios.create({
  baseURL: `https://restcountries.com/v3.1/alpha`,
  timeout: 5000,
})


export default restcountries
