import gocountries from "@/adapter/go-countries";
import restcountries from "@/adapter/rest-countries";
import type { RestCountriesResponse } from "@/types/api";
import type { City, CountryCode } from "@/types/city";
import { tryCatch } from "@/utils/try-catch";

export async function fetchRestCountry(countryCode: string) {
  return await tryCatch<RestCountriesResponse[]>(async () => {
    const res = await restcountries.get(`/${countryCode}`)
    return res.data
  })
}

export async function fetchCity(query: string) {
  return await tryCatch<City[]>(async () => {
    const res = await gocountries.get(`?query=${query}`)
    return res.data
  })
}

export async function fetchCountryCode(timezone: string) {
  return await tryCatch<CountryCode>(async () => {
    const res = await gocountries.get(`?timezone=${timezone}`)
    return res.data
  })
}
