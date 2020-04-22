import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from './utils/axios'

Vue.config.productionTip = false

// 绑定
Vue.use(ViewUI)

// 注入公共变量
Vue.prototype.$http = axios
Vue.prototype.$x2js = new x2js()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
