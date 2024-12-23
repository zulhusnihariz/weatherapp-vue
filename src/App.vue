<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <Toast position="top-left" />
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style>
.p-toast-message-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-toast {
  display: flex;
}
.p-toast-icon {
  display: none;
}
</style>
