import { type Preview, setup } from '@storybook/vue3-vite'
import { App } from 'vue'

import floating from '../src/plugins/floatingVue'
import '@/assets/main.css'

setup((app: App) => {
  app.use(floating)
})

const preview: Preview = {
  parameters: { controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } } },
}

export default preview
