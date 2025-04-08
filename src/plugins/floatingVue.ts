import { type Plugin } from 'vue'
import FloatingVue from 'floating-vue'

const floating: Plugin = {
  install(app, options) {
    app.use(FloatingVue, {
      distance: 10,
      ...options,
    })
  },
}

export default floating
