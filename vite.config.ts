import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { purgeCSS } from './src/plugins/purgeCss'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [vue(), vueDevTools()]
  if (mode !== 'test') plugins.push(purgeCSS({ variables: true }))

  return {
    plugins: plugins,
    base: process.env.NODE_ENV === 'production' ? '/v-StoryApp/' : '/',
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  }
})
