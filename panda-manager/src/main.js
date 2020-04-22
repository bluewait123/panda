import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from './utils/axios'
import x2js from 'x2js' //xml数据处理插件
import rule from './utils/rule'

Vue.config.productionTip = false

// 绑定
Vue.use(ViewUI)

// 注入公共变量
Vue.prototype.$http = axios
Vue.prototype.$x2js = new x2js()
Vue.prototype.$rule = rule

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
