<script setup lang="ts">
import type { WeatherResponse } from '@/types/weather'
import TemperatureAtom from '../atoms/TemperatureAtom.vue'

interface Props {
  weather: WeatherResponse
}

const { weather } = defineProps<Props>()
</script>

<template>
  <div>
    <div style="display: flex; flex-direction: column">
      <p>{{ weather.name }}</p>
      <p>{{ weather.timezone }}</p>
      <p>{{ weather.weather[0].description }}</p>

      <TemperatureAtom :temp="weather.main.temp" />
      <p>{{ weather.main.temp_max }}°</p>
      <p>{{ weather.main.temp_min }}°</p>
    </div>
  </div>
</template>
