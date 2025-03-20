<script setup lang="ts">
import { computed, useCssModule } from 'vue'

export interface CheckboxProps {
  checked?: boolean
}

const { checked } = defineProps<CheckboxProps>()
const style = useCssModule()

const classes = computed(() => [style.checkbox])
</script>

<template>
  <label :class="classes">
    <input type="checkbox" :checked />
    <div class="marker"></div>

    <span><slot /></span>
  </label>
</template>

<style module>
.checkbox {
  display: inline-flex;
  gap: var(--ga-size-4);
}
</style>
