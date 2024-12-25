<script setup lang="ts">
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import RouterLinkButton from '@/components/molecules/RouterLinkButton.vue'
import useWeather from '@/store/weather'
import { useRoute, useRouter } from 'vue-router'

const { isWeatherSaved, saveWeather, discardWeather, getWeather } = useWeather()
const route = useRoute()
const router = useRouter()
const weather = await getWeather({ id: route.params.id as string, units: 'metric' })

function save() {
  saveWeather(weather)
  router.push('/')
}

function remove() {
  discardWeather(weather.id)
  router.push('/')
}
</script>

<template>
  <header id="wdetails-navbar">
    <RouterLinkButton to="/">
      <BackArrowIcon :fill="'white'" />
    </RouterLinkButton>

    <p>{{ weather.name }}</p>

    <template v-if="isWeatherSaved">
      <ButtonAtom @click="remove" id="remove-btn" aria-label="remove saved weather">
        <TrashIcon />
      </ButtonAtom>
    </template>

    <template v-else>
      <ButtonAtom @click="save" id="save-btn" aria-label="save weather">
        <AddIcon />
      </ButtonAtom>
    </template>
  </header>
</template>

<style>
#save-btn,
#remove-btn {
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: inherit;
}
#wdetails-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: min-content;
  font-family: 'Poppins';
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
  max-width: 343px;
  margin: 20px 0;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>
