<script setup lang="ts">
interface Props {
  fill?: string
}

const { fill = 'black' } = defineProps<Props>()
</script>

<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.28796 12L14.298 18.01L15.712 16.596L11.112 11.996L15.712 7.39599L14.298 5.98999L8.28796 12Z"
      :fill="fill"
    />
  </svg>
</template>
