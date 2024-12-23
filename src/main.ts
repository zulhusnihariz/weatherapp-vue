import 'primeicons/primeicons.css'
import './assets/main.css'

import PrimaVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(PrimaVue, {
  unstyled: true
}
)

app.mount('#app')
