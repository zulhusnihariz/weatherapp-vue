<script setup lang="ts">
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import RouterLinkButton from '@/components/molecules/RouterLinkButton.vue'
import useWeather from '@/store/weather'
import { useRoute } from 'vue-router'

const { isWeatherSaved, saveWeather, discardWeather, getWeather } = useWeather()
const route = useRoute()
const weather = await getWeather({ id: route.params.id as string, units: 'metric' })
</script>

<template>
  <header>
    <div class="header poppins-semibold">
      <RouterLinkButton to="/">
        <BackArrowIcon />
      </RouterLinkButton>

      <h1>{{ weather.name }}</h1>

      <template v-if="isWeatherSaved">
        <ButtonAtom v-on:click="discardWeather">
          <TrashIcon />
        </ButtonAtom>
      </template>

      <template v-else>
        <ButtonAtom v-on:click="saveWeather">
          <AddIcon />
        </ButtonAtom>
      </template>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background: #f4f7fc;
  height: 25vh;
  clip-path: ellipse(120% 60% at 50% 40%);
  font-family: 'Poppins';
  font-weight: 600;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
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
