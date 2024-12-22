<script setup lang="ts">
interface Props {
  temp: number
  unit?: string
}

const { temp, unit } = defineProps<Props>()
</script>

<template>
  <p>
    {{ temp }}° <span v-if="unit"> {{ unit }}</span>
  </p>
</template>
