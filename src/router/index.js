import Vue from 'vue'
import VueRouter from 'vue-router'
import adminRoute from './admin'
import mormalRoute from './normal'
import DashboardBoard from '@/pages/dashboard/board'

Vue.use(VueRouter)

const routes = [
  adminRoute,
  mormalRoute,
  {
    path: '/monitor/dashboard/:id/board',
    name: 'DashboardBoard',
    props: true,
    component: DashboardBoard
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
