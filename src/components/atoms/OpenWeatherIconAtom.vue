<script setup lang="ts">
interface Props {
  icon: string
  alt: string
}

const { icon, alt } = defineProps<Props>()
</script>

<template>
  <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" :alt="alt" />
</template>
