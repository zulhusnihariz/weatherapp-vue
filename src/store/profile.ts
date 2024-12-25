import localStorage from '@/adapter/local-storage'
import { setToastEvent } from '@/main'
import { fetchRestCountry } from '@/repositories/country'
import type { RestCountriesResponse } from '@/types/api'
import { LS_KEY } from '@/types/local-storage'
import type { Profile } from '@/types/profile'
import { computed, ref } from 'vue'

const initial: Profile = { fullName: "", email: '', phoneNumber: "", imageBase64: '' }
const state = ref<Profile>(structuredClone(initial))
const country = ref<RestCountriesResponse>()

export default function useProfile() {
  const loading = ref(false)

  function setProfile(data: Partial<Profile>) {
    state.value = { ...state.value, ...data }
    localStorage.setItem<Profile>(LS_KEY.PROFILE, state.value)

    setToastEvent({
      severity: 'success',
      summary: 'Profile Saved',
      life: 3000
    })
  }

  const profile = localStorage.getItem<Profile>(LS_KEY.PROFILE)
  if (profile != null) {
    state.value = profile
  }

  async function getCountryDetails(countryCode: string): Promise<RestCountriesResponse> {
    const { data, error: err } = await fetchRestCountry(countryCode)

    if (err !== undefined) {
      setToastEvent({ severity: 'error', summary: err.message, life: 3000 })
      return {} as RestCountriesResponse
    }

    if (data.length === 0) {
      setToastEvent({ severity: 'error', summary: "Country not found", life: 3000 })
      return {} as RestCountriesResponse
    }

    country.value = data[0]
    return country.value
  }

  return {
    loading: computed(() => loading.value),
    profile: computed(() => state.value),
    country: computed(() => country.value),
    setProfile,
    getCountryDetails
  }
}
