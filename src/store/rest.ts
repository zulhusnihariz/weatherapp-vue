
import { setToastEvent } from '@/main'
import { fetchCity, fetchCountryCode } from '@/repositories/country'
import type { CountryCode } from '@/types/city'


export default function useGoCountries() {
  async function queryCity(query: string) {
    const { data, error } = await fetchCity(query)

    if (error !== undefined) {
      setToastEvent({ severity: 'error', summary: "Local Rest error", life: 3000 })
      return []
    }

    return data
  }

  async function queryCountryCode(): Promise<CountryCode> {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { data, error } = await fetchCountryCode(timezone)

    if (error !== undefined) {
      setToastEvent({ severity: 'error', summary: "Local Rest error", life: 3000 })
      return { country: '', code: '' }
    }

    return data
  }

  return {
    queryCity,
    queryCountryCode,
  }
}
