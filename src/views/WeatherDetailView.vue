<script setup lang="ts">
import MainWeatherCard from '@/components/molecules/MainWeatherCard.vue'
import HourlyForecastList from '@/components/organisms/HourlyForecastList.vue'
import WeeklyForecastList from '@/components/organisms/WeeklyForecastList.vue'
import WeatherDetailNavbar from '@/navbar/WeatherDetailNavbar.vue'
import useWeather from '@/store/weather'
import type { Forecast } from '@/types/forecast'
import { splitter } from '@/utils/string-formatter'
import { onMounted, ref } from 'vue'
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

onBeforeRouteLeave(() => {
  resetWeather()
})

function selectDay(day: Forecast) {
  let [date, _] = splitter(day.dt_txt, ' ')
  hourly.value = transformed.value[date]

  document.getElementById('scrollHere')?.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>
<template>
  <div class="layout">
    <div class="navbar-container">
      <WeatherDetailNavbar v-if="route.path.startsWith('/weather/') && route.params?.id" />
      <MainWeatherCard :weather="weather" v-if="!loading" />
    </div>
    <div id="scrollHere"></div>
    <template v-if="loading"> Loading... </template>

    <template v-else>
      <div style="margin: 0 20px">
        <HourlyForecastList :forecasts="hourly" v-if="hourly" />
        <WeeklyForecastList :forecasts="weekly" :on-click="selectDay" v-if="weekly" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.layout {
  width: 100vw;
  margin: 0px;
}
.navbar-container {
  background: linear-gradient(118.25deg, #4f80fa 1.2%, #3764d7 59.26%, #335fd1 79.2%);
  width: 100vw;
}
</style>
