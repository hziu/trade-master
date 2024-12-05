import './assets/style/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { VueQueryPlugin } from '@tanstack/vue-query'
import 'element-plus/dist/index.css'

import App from './app.vue'
import router from '@/router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)



app.mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })
