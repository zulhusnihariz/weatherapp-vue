<script setup lang="ts">
import { useAttrs } from 'vue'
interface Props {
  icon: string
  alt: string
}

const { icon, alt } = defineProps<Props>()
const attrs = useAttrs()
</script>

<template>
  <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" :alt="alt" :attrs="attrs" />
</template>
