import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router/'
import '@/registerServiceWorker'
import '@/assets/styles/main.scss'

createApp(App).use(createPinia()).use(router).mount('#app')
