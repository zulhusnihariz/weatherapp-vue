<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import HomeNavbar from './navbar/HomeNavbar.vue'
import ProfileNavbar from './navbar/ProfileNavbar.vue'

const route = useRoute()
</script>

<template>
  <ProfileNavbar v-if="route.path == '/profile'" />
  <HomeNavbar v-if="route.path == '/'" />
  <RouterView />
</template>
