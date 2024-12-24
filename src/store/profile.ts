import localStorage from '@/adapter/local-storage'
import { setToastEvent } from '@/main'
import { LS_KEY } from '@/types/local-storage'
import type { Profile } from '@/types/profile'
import { computed, ref } from 'vue'

const initial: Profile = { fullName: "", email: '', phoneNumber: "", imageBase64: '' }
const state = ref<Profile>(structuredClone(initial))

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

  return {
    loading: computed(() => loading.value),
    profile: computed(() => state.value),
    setProfile,
  }
}
