<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function backToHome() {
  router.push('/')
}
</script>

<template>
  <main id="main-not-found">
    <h1>Page Not Found</h1>

    <p id="back to home" role="button" @click="backToHome">Back to home</p>
  </main>
</template>

<style>
#main-not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

#back-to-home {
  align-self: start;
  cursor: pointer;
}
</style>
