<template>
  <slot />

  <div v-if="$slots.nested" :class="$style.nested">
    <slot name="nested" />
  </div>
</template>

<style module>
.nested {
  display: flex;
  flex-direction: column;
  gap: var(--ga-size-spacing-03);

  margin-left: var(--ga-size-spacing-06);
}
</style>
