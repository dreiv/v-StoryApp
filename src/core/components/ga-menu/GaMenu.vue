<script setup lang="ts">
import { Menu } from 'floating-vue'

defineProps<{ content?: string }>()
</script>

<template>
  <Menu>
    <button>Click me</button>

    <template #popper> test </template>
  </Menu>
</template>
