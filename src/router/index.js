import Vue from 'vue'
import VueRouter from 'vue-router'
import Monitor from '@/pages/monitor/index.vue'
import Home from '@/pages/home/index.vue'
import Device from '@/pages/device/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/monitor',
    name: 'Monitor',
    redirect: { name: 'Home' },
    component: Monitor,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'devices',
        name: 'Device',
        component: Device
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
