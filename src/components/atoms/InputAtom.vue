<script setup lang="ts">
interface Props {
  disabled: boolean
}

const props = defineProps<Props>()
const text = defineModel<string>()
</script>

<template>
  <input v-model="text" :disabled="props.disabled" />
</template>
