import { computed, ref } from 'vue'

const isSearching = ref(false)

export default function useUIState() {
  function setSearching(bool: boolean): void {
    isSearching.value = bool
  }

  return {
    isSearching: computed(() => isSearching.value),
    setSearching,
  }
}
