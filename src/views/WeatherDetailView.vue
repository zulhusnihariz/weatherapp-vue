<script setup lang="ts">
import OpenWeatherIconAtom from '@/components/atoms/OpenWeatherIconAtom.vue'
import TemperatureAtom from '@/components/atoms/TemperatureAtom.vue'
import HourlyForecastList from '@/components/organisms/HourlyForecastList.vue'
import WeeklyForecastList from '@/components/organisms/WeeklyForecastList.vue'
import WeatherDetailNavbar from '@/navbar/WeatherDetailNavbar.vue'
import useWeather from '@/store/weather'
import type { Forecast } from '@/types/forecast'
import { formatDate } from '@/utils/date-formatter'
import { splitter } from '@/utils/string-formatter'
import { computed, onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

const { loading, getWeather, getForecast, resetWeather } = useWeather()
const route = useRoute()

const weather = await getWeather({
  id: route.params.id as string,
  units: 'metric',
})

const forecast = await getForecast({
  id: route.params.id as string,
  units: 'metric',
})

const hourly = ref<Forecast[]>([])
const weekly = ref<Forecast[]>([])
const transformed = ref<{ [key: string]: Forecast[] }>({})

onMounted(() => {
  transformed.value = forecast.list.reduce(
    (acc, curr) => {
      const [date, _] = splitter(curr.dt_txt, ' ')

      if (!acc[date]) {
        acc[date] = []
        weekly.value.push(curr)
      }

      acc[date].push(curr)

      return acc
    },
    {} as { [key: string]: Forecast[] },
  )

  let dates = Object.keys(transformed.value)
  hourly.value = transformed.value[dates[0]]
})

const hasWeatherData = computed(() => {
  return weather && weather.weather && weather.weather.length > 0
})

onBeforeRouteLeave(() => {
  resetWeather()
})

function selectDay(day: Forecast) {
  let [date, _] = splitter(day.dt_txt, ' ')
  hourly.value = transformed.value[date]
}
</script>
<template>
  <WeatherDetailNavbar v-if="route.path.startsWith('/weather/') && route.params?.id" />
  <template v-if="loading"> Loading... </template>

  <template v-else>
    <div>
      <p>{{ formatDate(weather.dt) }}</p>
      <TemperatureAtom :temp="weather.main.temp" />

      <template v-if="hasWeatherData">
        <OpenWeatherIconAtom
          :icon="weather.weather[0].icon"
          :alt="weather.weather[0].description"
        />
        <p>{{ weather.weather[0].description }}</p>
      </template>
    </div>

    <div v-if="hourly">
      <HourlyForecastList :forecasts="hourly" />
    </div>

    <div v-if="weekly">
      <WeeklyForecastList :forecasts="weekly" :on-click="selectDay" />
    </div>
  </template>
</template>
