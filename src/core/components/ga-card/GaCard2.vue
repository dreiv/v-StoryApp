<script setup lang="ts">
import { computed, useCssModule, watch } from 'vue'

export interface GaCardProps {
  title?: string
  description?: string
  selectable?: boolean
  disabled?: boolean
  expandable?: boolean
  expanded?: boolean
}

const props = defineProps<GaCardProps>()
const emit = defineEmits<{
  (e: 'select', value: boolean): void
  (e: 'click'): void
  (e: 'toggle-expand', value: boolean): void
  (e: 'update:expanded', value: boolean): void
}>()

const selected = defineModel<boolean>('selected', { default: false })
const modelExpanded = defineModel<boolean>('expanded', { default: false })

// Watch for expanded prop changes and update modelExpanded
watch(
  () => props.expanded,
  (val) => {
    if (val !== undefined && val !== modelExpanded.value) {
      modelExpanded.value = val
    }
  },
  { immediate: true },
)

// Emit events for backward compatibility
watch(selected, (val) => {
  emit('select', val)
})

watch(modelExpanded, (val) => {
  emit('toggle-expand', val)
  emit('update:expanded', val)
})

const handleCardClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

const handleExpandToggle = (event: Event) => {
  event.stopPropagation()
  if (props.expandable && !props.disabled) {
    const target = event.target as HTMLDetailsElement
    modelExpanded.value = target.open
  }
}

const style = useCssModule()
const classes = computed(() => [
  style.card,
  { [style.disabled]: props.disabled, [style.expanded]: modelExpanded.value },
])
</script>

<template>
  <details
    v-if="expandable"
    :class="classes"
    :open="modelExpanded"
    @toggle="handleExpandToggle"
    @click.stop
  >
    <summary :class="$style.summary" @click.stop="handleCardClick">
      <!-- Top slot (optional) - #8 -->
      <div :class="$style.topSlot" v-if="$slots.topSlot">
        <slot name="topSlot"></slot>
      </div>

      <div :class="$style.cardContent">
        <!-- Selector (optional) - #6 -->
        <div :class="$style.selector" v-if="selectable">
          <input
            type="checkbox"
            :disabled="disabled"
            v-model="selected"
            @click.stop
            :class="$style.checkbox"
          />
        </div>

        <div :class="$style.mainContent">
          <!-- Title - #2 -->
          <div :class="$style.title" v-if="$slots.title || title">
            <slot name="title">{{ title }}</slot>
          </div>

          <!-- Description - #3 -->
          <div :class="$style.description" v-if="$slots.description || description">
            <slot name="description">{{ description }}</slot>
          </div>

          <!-- Default slot for custom content -->
          <div :class="$style.body" v-if="$slots.default">
            <slot></slot>
          </div>
        </div>

        <div :class="$style.rightSection">
          <!-- Interactive icon (optional) - #5 -->
          <div :class="$style.interactiveIcon" v-if="$slots.interactiveIcon">
            <slot name="interactiveIcon"></slot>
          </div>

          <!-- Expandable chevron icon is automatically handled by the details element -->
          <div :class="$style.chevron">
            <svg
              :class="[$style.chevronIcon]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </summary>

    <!-- Bottom slot (optional) - #7 -->
    <div :class="$style.bottomSlot">
      <slot name="bottomSlot"></slot>
    </div>
  </details>

  <!-- Non-expandable version -->
  <div v-else :class="classes" @click="handleCardClick">
    <!-- Top slot (optional) - #8 -->
    <div :class="$style.topSlot" v-if="$slots.topSlot">
      <slot name="topSlot"></slot>
    </div>

    <div :class="$style.cardContent">
      <!-- Selector (optional) - #6 -->
      <div :class="$style.selector" v-if="selectable">
        <input
          type="checkbox"
          :disabled="disabled"
          v-model="selected"
          @click.stop
          :class="$style.checkbox"
        />
      </div>

      <div :class="$style.mainContent">
        <!-- Title - #2 -->
        <div :class="$style.title" v-if="$slots.title || title">
          <slot name="title">{{ title }}</slot>
        </div>

        <!-- Description - #3 -->
        <div :class="$style.description" v-if="$slots.description || description">
          <slot name="description">{{ description }}</slot>
        </div>

        <!-- Default slot for custom content -->
        <div :class="$style.body" v-if="$slots.default">
          <slot></slot>
        </div>
      </div>

      <div :class="$style.rightSection">
        <!-- Interactive icon (optional) - #5 -->
        <div :class="$style.interactiveIcon" v-if="$slots.interactiveIcon">
          <slot name="interactiveIcon"></slot>
        </div>
      </div>
    </div>

    <!-- Bottom slot for non-expandable cards - #7 -->
    <div :class="$style.bottomSlot" v-if="$slots.bottomSlot">
      <slot name="bottomSlot"></slot>
    </div>
  </div>
</template>

<style module>
.card {
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid var(--ga-color-border-secondary, #e6e6e6);
  border-radius: var(--ga-radius, 4px);
  background-color: var(--ga-color-white, #ffffff);
  padding: var(--ga-size-spacing-04, 16px);
  width: 100%;
}

.card:hover:not(.disabled) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Remove default styling from details element */
.card[open] {
  background-color: var(--ga-color-white, #ffffff);
}

.summary {
  display: block;
  cursor: pointer;
  list-style: none; /* Remove default arrow */
}

/* Remove default arrow from summary */
.summary::-webkit-details-marker {
  display: none;
}

.cardContent {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.selector {
  margin-right: var(--ga-size-spacing-03, 8px);
}

.checkbox {
  cursor: pointer;
}

.mainContent {
  flex: 1;
  min-width: 0; /* For proper text truncation */
}

.title {
  margin-bottom: 4px;
  color: var(--ga-color-text-primary, #333333);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
}

.description {
  color: var(--ga-color-text-secondary, #666666);
  font-size: 12px;
  line-height: 1.4;
}

.body {
  margin-top: var(--ga-size-spacing-02, 4px);
}

.rightSection {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-02, 4px);
  margin-left: auto;
}

.chevron {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.chevronIcon {
  transition: transform 0.3s ease;
}

/* Rotate chevron when details is open */
details[open] .chevronIcon {
  transform: rotate(180deg);
}

.topSlot {
  margin-bottom: var(--ga-size-spacing-03, 8px);
}

.bottomSlot {
  margin-top: var(--ga-size-spacing-03, 8px);
  border-top: 1px solid var(--ga-color-border-secondary, #e6e6e6);
  padding-top: var(--ga-size-spacing-03, 8px);
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.interactiveIcon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
