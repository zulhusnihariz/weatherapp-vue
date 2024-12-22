import localStorage from '@/adapter/local-storage'
import { LS_KEY } from '@/types/local-storage'
import type { Profile } from '@/types/profile'
import { computed, ref } from 'vue'

const initial: Profile = { fullName: "", email: '', phoneNumber: "", }
const state = ref<Profile>(initial)

export default function useProfile() {
  const loading = ref(false)

  function setProfile(data: Profile) {
    state.value = data
    localStorage.setItem<Profile>(LS_KEY.PROFILE, data)
  }

  function getProfile(): Profile {
    const profile = localStorage.getItem<Profile>(LS_KEY.PROFILE)

    if (profile === null) {
      localStorage.setItem<Profile>(LS_KEY.PROFILE, initial)
      state.value = initial
      return state.value
    }

    state.value = profile
    return state.value
  }

  return {
    loading: computed(() => loading.value),
    profile: computed(() => state.value),
    setProfile,
    getProfile
  }
}
