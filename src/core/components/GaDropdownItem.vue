<script setup lang="ts">
export interface DropdownItemProps {
  label?: string
  selected?: boolean
  disabled?: boolean
  active?: boolean
}

defineProps<DropdownItemProps>()
</script>

<template>
  <div :class="$style.item">
    <slot>{{ label }}</slot>
  </div>
</template>

<style module>
.item {
}
</style>
