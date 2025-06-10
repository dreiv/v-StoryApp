<script lang="ts" setup>
export interface GaCardProps {
  title?: string
}

defineProps<GaCardProps>()
</script>

<template>
  <div :class="$style.card">
    <header v-if="$slots.header || title" :class="$style.header">
      <slot name="header">
        <slot name="title">
          <span :class="$style.title">{{ title }}</span>
        </slot>

        <div v-if="$slots.actions" :class="$style.actions">
          <slot name="actions" />
        </div>
      </slot>
    </header>

    <div v-if="$slots.default"><slot /></div>

    <div v-if="$slots.interactive" :class="$style.interactive">
      <slot name="interactive" />
    </div>
  </div>
</template>

<style module>
.card {
  display: flex;
  flex-direction: column;
  gap: var(--ga-size-spacing-03);

  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius);
  padding: var(--ga-size-spacing-05);
}

.header {
  display: flex;
  justify-content: space-between;
  gap: var(--ga-size-spacing-05);
}

.title {
  font-weight: var(--ga-font-weight-bold);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  letter-spacing: var(--ga-text-md-tracking);
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-05);
}

.interactive {
  display: flex;
  justify-content: end;
}
</style>
