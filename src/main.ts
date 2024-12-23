import 'primeicons/primeicons.css'
import './assets/main.css'

import Aura from '@primevue/themes/aura'
import { ToastService, type ToastMessageOptions } from 'primevue'
import PrimaVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
  .use(PrimaVue, {
    theme: {
      preset: Aura
    }
  })
  .use(ToastService)

app.mount('#app')

export function setToastEvent(options: ToastMessageOptions) {
  app.config.globalProperties.$toast.add(options)
}
