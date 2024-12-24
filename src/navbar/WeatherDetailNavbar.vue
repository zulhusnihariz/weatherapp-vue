<script setup lang="ts">
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import RouterLinkButton from '@/components/molecules/RouterLinkButton.vue'
import { setToastEvent } from '@/main'
import useWeather from '@/store/weather'
import { useRoute } from 'vue-router'

const { isWeatherSaved, saveWeather, discardWeather, getWeather } = useWeather()
const route = useRoute()
const weather = await getWeather({ id: route.params.id as string, units: 'metric' })

function save() {
  saveWeather(weather)
  setToastEvent({ severity: 'success', summary: 'Weather Saved', life: 3000 })
}

function remove() {
  discardWeather(weather.id)
  setToastEvent({ severity: 'warn', summary: 'Weather Removed', life: 3000 })
}
</script>

<template>
  <header class="header">
    <RouterLinkButton to="/">
      <BackArrowIcon :fill="'white'" />
    </RouterLinkButton>

    <p>{{ weather.name }}</p>

    <template v-if="isWeatherSaved">
      <ButtonAtom @click="remove" class="action-button">
        <TrashIcon />
      </ButtonAtom>
    </template>

    <template v-else>
      <ButtonAtom @click="save" class="action-button">
        <AddIcon />
      </ButtonAtom>
    </template>
  </header>
</template>

<style scoped>
.action-button {
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: inherit;
}
.header {
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
