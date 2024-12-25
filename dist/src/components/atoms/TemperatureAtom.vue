<script setup lang="ts">
import { useAttrs } from 'vue'

interface Props {
  temp: number
  unit?: string
  dp?: number
}
const { temp, unit, dp = 0 } = defineProps<Props>()
const attrs = useAttrs()
</script>

<template>
  <p v-bind="attrs">
    {{ temp.toFixed(dp) }}° <span v-if="unit"> {{ unit }}</span>
  </p>
</template>
