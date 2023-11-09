import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(store).use(router).mount('#app')
// just use the router for this app - this is what it means
