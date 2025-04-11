<script setup lang="ts">
import { PopperWrapper } from 'floating-vue'

defineProps<{ content?: string }>()
</script>

<template>
  <PopperWrapper theme="tooltip">
    <slot />

    <template #popper> test </template>
  </PopperWrapper>
</template>
