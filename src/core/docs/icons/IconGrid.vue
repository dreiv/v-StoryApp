<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { icons } from 'lucide-vue-next'

type IconKeys = keyof typeof icons

const filter = ref('')
const iconKeys = ref<IconKeys[]>([])

onMounted(() => {
  iconKeys.value = Object.keys(icons) as IconKeys[]
})

const filteredIcons = computed(() => {
  if (!filter.value) return iconKeys.value

  const regex = new RegExp(filter.value, 'i')
  return iconKeys.value.filter((key) => regex.test(key))
})

const copyToClipboard = (key: string) => {
  navigator.clipboard
    .writeText(key)
    .then(() => {
      alert(`Copied "${key}" to clipboard!`)
    })
    .catch((err) => {
      console.error('Could not copy text: ', err)
    })
}
</script>

<template>
  <label class="filter">
    <input type="search" v-model="filter" aria-label="Filter icons" placeholder="Search icons..." />
    <span class="total">({{ filteredIcons.length }})</span>
  </label>
  <hr />

  <div class="container">
    <button
      v-for="key in filteredIcons"
      :key
      :title="key"
      class="item"
      @click="copyToClipboard(key)"
    >
      <component :is="icons[key]" class="icon" />
    </button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 8px;
  padding: 8px;
}

.total {
  opacity: 0.8;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px;
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
