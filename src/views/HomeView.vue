<script setup lang="ts">
import SavedWeatherList from '@/components/organisms/SavedWeatherList.vue'
import SearchCityInputField from '@/components/organisms/SearchCityInputField.vue'
import HomeNavbar from '@/navbar/HomeNavbar.vue'
</script>
<template>
  <HomeNavbar />
  <SearchCityInputField />
  <SavedWeatherList />
</template>
