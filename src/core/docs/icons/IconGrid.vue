<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { icons } from 'lucide-vue-next'
import { vTooltip } from 'floating-vue'

import GaButton from '@/core/components/GaButton.vue'
import GaInput from '@/core/components/GaInput.vue'

type IconKeys = keyof typeof icons

const filter = ref('')
const iconKeys = ref<IconKeys[]>([])
const copySuccess = ref<string | null>(null)
const copyError = ref<string | null>(null)

onMounted(() => {
  iconKeys.value = Object.keys(icons) as IconKeys[]
})

const filteredIcons = computed(() => {
  if (!filter.value) return iconKeys.value

  const regex = new RegExp(filter.value, 'i')
  return iconKeys.value.filter((key) => regex.test(key))
})

const searchInputState = computed(() => {
  if (!filter.value) return null // Default state for empty search
  return filteredIcons.value.length === 0 ? 'invalid' : 'success'
})

const copyToClipboard = (key: string) => {
  navigator.clipboard
    .writeText(key)
    .then(() => {
      copySuccess.value = key
      copyError.value = null
      setTimeout(() => {
        copySuccess.value = null
      }, 2000)
    })
    .catch((err) => {
      console.error('Could not copy text: ', err)
      copyError.value = key
      copySuccess.value = null
      setTimeout(() => {
        copyError.value = null
      }, 2000)
    })
}
</script>

<template>
  <label class="filter">
    <ga-input
      type="search"
      v-model="filter"
      aria-label="Filter icons"
      placeholder="Search icons..."
      :invalid="searchInputState === 'invalid'"
      :success="searchInputState === 'success'"
    />
    <span
      class="total"
      :class="{
        'total-error': searchInputState === 'invalid',
        'total-success': searchInputState === 'success',
      }"
    >
      ({{ filteredIcons.length }})
    </span>
  </label>
  <hr />

  <div class="container">
    <ga-button
      icon
      v-for="key in filteredIcons"
      :key="key"
      class="item"
      :class="{
        'copy-success': copySuccess === key,
        'copy-error': copyError === key,
      }"
      @click="copyToClipboard(key)"
      v-tooltip="`${key}`"
    >
      <component :is="icons[key]" class="icon" />
    </ga-button>
  </div>

  <div v-if="searchInputState === 'invalid'" class="no-results">
    No icons found for "{{ filter }}". Try a different search term.
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
}

.total {
  opacity: 0.8;
}

.total-error {
  color: var(--ga-color-text-error);
}

.total-success {
  color: var(--ga-color-text-success);
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
}

.no-results {
  padding: 16px;
  color: var(--ga-color-text-error);
  font-style: italic;
  text-align: center;
}

.copy-success {
  transition: all 0.2s ease-in-out;
  border-color: var(--ga-color-border-success) !important;
  background-color: var(--ga-color-surface-success) !important;
  color: var(--ga-color-text-on-success) !important;
}

.copy-error {
  transition: all 0.2s ease-in-out;
  border-color: var(--ga-color-border-error) !important;
  background-color: var(--ga-color-surface-error) !important;
  color: var(--ga-color-text-on-error) !important;
}
</style>
