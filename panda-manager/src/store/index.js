import Vue from 'vue'
import Vuex from 'vuex'

import tags from './module/tags'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        // 存放的键值对就是所要管理的状态
    },
    getters:{
        
    },
    mutations:{
        // 方法都有默认的形参([state] [,payload])
        
    },
    actions:{
        // 由于直接在mutation方法中进行异步操作，将会引起数据失效。所以提供了Actions来专门进行异步操作，最终提交mutation方法
        // Actions中的方法有两个默认参数 ([context] [,payload]) context 上下文(相当于箭头函数中的this)对象

    },
    modules:{
        // 每个模块拥有自己的 state、mutations、actions、getters、甚至是嵌套子模块
        tags
    }
})

export default store