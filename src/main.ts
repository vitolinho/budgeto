import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'
import Index from './views/Index.vue'
import Details from './views/Details.vue'
import Settings from './views/Settings.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/:id', component: Details },
  { path: '/settings', component: Settings }
]

const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
