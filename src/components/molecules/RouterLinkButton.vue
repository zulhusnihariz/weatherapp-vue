<script setup lang="ts">
import ButtonAtom from '../atoms/ButtonAtom.vue'

interface Props {
  to: string
}

const { to } = defineProps<Props>()
</script>

<template>
  <RouterLink
    v-slot="{ navigate, isActive }"
    :to="to"
    custom
    style="
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      cursor: pointer;
      outline: inherit;
    "
  >
    <ButtonAtom @click="navigate" :class="{ active: isActive }">
      <slot></slot>
    </ButtonAtom>
  </RouterLink>
</template>
