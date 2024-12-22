<script setup lang="ts">
interface Props {
  title?: string
  onClick?: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <button @click="props.onClick"><slot></slot>{{ props.title }}</button>
</template>
