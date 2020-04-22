import Axios from 'axios'
import Vue from 'vue'

// 配置基础URL
Axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// Axios.defaults.timeout = 3000

// 请求前进行拦截处理
Axios.interceptors.request.use(config => {
    // 这地方可以设置公共的http headers
    config.headers = {
        
    }

    // 这里也可以打开loading
    Vue.prototype.$Loading.start()

    return config
}, error => {
    // 请求前报错了，进入这里处理
    return Promise.reject(error)
})

// 响应前拦截处理
Axios.interceptors.response.use(
response => {
    // 对响应数据做点什么
    if (response.data.respCode && response.data.respCode !== '0000') {
        Vue.prototype.$Loading.error()
        Vue.prototype.$Message.error(response.data.respDesc)
        return Promise.reject(response.data)
    }
    Vue.prototype.$Loading.finish()
    return response
}, 
error => {
    // 对响应错误做点什么
    Vue.prototype.$Loading.error()
    let message = error.response.status === 404 ? '出错啦，您访问的地址不存在' : '出错啦，服务端错误'
    Vue.prototype.$Message.error(message)
    return Promise.reject(error)
})

export default Axios