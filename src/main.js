import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { WsConn } from './websocket'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ws = new WsConn()

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App)
}).$mount('#app')
