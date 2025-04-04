<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useFloating } from '../composables/useFloating'

const reference = useTemplateRef('reference')
const floating = useTemplateRef('floating')
const { floatingStyles } = useFloating(reference, floating)
</script>

<template>
  <span ref="reference" :class="$style.reference">
    <slot />
  </span>

  <teleport to="body">
    <div ref="floating" :style="floatingStyles">Tooltip</div>
  </teleport>
</template>

<style module>
.reference {
  /* display: contents; */
}
</style>
