import restcountries from "@/adapter/rest-countries";
import type { RestCountriesResponse } from "@/types/api";
import { tryCatch } from "@/utils/try-catch";

export async function getRestCountry(countryCode: string) {
  return await tryCatch<RestCountriesResponse[]>(async () => {
    const res = await restcountries.get(`/${countryCode}`)
    return res.data
  })
}
