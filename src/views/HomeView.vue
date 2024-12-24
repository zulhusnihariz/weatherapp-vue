<script setup lang="ts">
import SavedWeatherList from '@/components/organisms/SavedWeatherList.vue'
import SearchCityInputField from '@/components/organisms/SearchCityInputField.vue'
import HomeNavbar from '@/navbar/HomeNavbar.vue'
import useUIState from '@/store/ui-state'
import useWeather from '@/store/weather'
import { onMounted } from 'vue'

const { isSearching } = useUIState()
const { saveMyLocation } = useWeather()

function showPosition(position: GeolocationPosition): void {
  if (position?.coords) {
    saveMyLocation(position.coords.latitude, position.coords.longitude)
  }
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  }
})
</script>
<template>
  <div class="layout">
    <HomeNavbar />
    <main>
      <SearchCityInputField />
      <template v-if="!isSearching">
        <SavedWeatherList />
      </template>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}
</style>
