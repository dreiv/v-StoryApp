<script lang="ts">
import { PopperWrapper } from 'floating-vue'

export default {
  ...PopperWrapper,
  vPopperTheme: 'tooltip',
}
</script>

<style>
.v-popper--theme-tooltip {
  display: inline-flex;

  .v-popper__inner {
    background-color: var(--ga-color-surface-action-hover);
    padding: var(--ga-size-8);
    color: var(--ga-color-text-on-action);
  }

  .v-popper__arrow-outer {
    border-color: var(--ga-color-surface-action-hover);
  }
}
</style>
