<script setup lang="ts">
import { useAttrs } from 'vue'

interface Props {
  onFocus?: () => void
}

const { onFocus } = defineProps<Props>()

const attrs = useAttrs()
const text = defineModel<string>()
</script>

<template>
  <slot></slot>
  <input v-model="text" v-bind="attrs" @focus="onFocus" />
</template>
