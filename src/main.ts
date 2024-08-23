import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings }
]

const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
  history: createMemoryHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
