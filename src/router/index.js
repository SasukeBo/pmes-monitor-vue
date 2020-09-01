import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/monitor',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
