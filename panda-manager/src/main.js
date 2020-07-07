import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from './utils/axios'
import x2js from 'x2js' //xml数据处理插件
import rule from './utils/rule'
import enums from './constant/enums'
import cascaderMulti from "cascader-multi"
import './index.less'

Vue.config.productionTip = false

// 绑定
Vue.use(ViewUI)
Vue.use(cascaderMulti)

// 注入公共变量
Vue.prototype.$http = axios
Vue.prototype.$x2js = new x2js()
Vue.prototype.$rule = rule
Vue.prototype.$enums = enums

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
