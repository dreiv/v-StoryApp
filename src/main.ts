import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import floating from '@/plugins/floatingVue'

import App from './App.vue'

createApp(App).use(createPinia()).use(floating).mount('#app')
