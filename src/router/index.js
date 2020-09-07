import Vue from 'vue'
import VueRouter from 'vue-router'
import adminRoute from './admin'
import mormalRoute from './normal'

Vue.use(VueRouter)

const routes = [adminRoute, mormalRoute]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
