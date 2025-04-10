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

  margin-left: calc(var(--ga-size-16) + var(--ga-size-10));
}
</style>
