<template>
  <div :class="$style.container">
    <div :class="$style.iconWrapper">
      <slot name="icon" />
    </div>

    <slot />
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  gap: var(--ga-size-8);

  font-size: var(--text-xs);
  line-height: var(--text-xs--line-height);
}

.iconWrapper {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  padding: var(--ga-size-2);
  width: var(--ga-size-20);
  height: var(--ga-size-20);

  overflow: hidden;
}
</style>
