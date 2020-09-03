import Vue from 'vue'
import VueRouter from 'vue-router'
import Monitor from '@/pages/monitor/index.vue'
import Home from '@/pages/home/index.vue'
import Device from '@/pages/device/index.vue'
import Dashboard from '@/pages/dashboard/index.vue'
import DeviceView from '@/pages/device/view.vue'
import DeviceOverview from '@/pages/device/overview.vue'
import DeviceAnalyze from '@/pages/device/analyze'
import DeviceErrorlog from '@/pages/device/errorlogs.vue'

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
      },
      {
        path: 'device/:id',
        props: true,
        component: DeviceView,
        children: [
          {
            path: 'overview',
            name: 'DeviceOverview',
            props: true,
            component: DeviceOverview
          },
          {
            path: 'errorlogs',
            name: 'DeviceErrorlog',
            props: true,
            component: DeviceErrorlog
          },
          {
            path: 'analyze',
            name: 'DeviceAnalyze',
            props: true,
            component: DeviceAnalyze
          }
        ]
      },
      {
        path: 'dashboards',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
