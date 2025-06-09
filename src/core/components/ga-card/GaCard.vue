<script lang="ts" setup>
export interface GaCardProps {
  title?: string
}

defineProps<GaCardProps>()
</script>

<template>
  <div :class="$style.card">
    <slot />
  </div>
</template>

<style module>
.card {
}
</style>
