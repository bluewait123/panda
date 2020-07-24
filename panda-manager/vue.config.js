const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const BASE_URL = process.env.VUE_APP_PUBLIC_PATH

const config = {
    publicPath: BASE_URL,
    lintOnSave: false,
    devServer: {
        before: function (app) {
            if (!process.env.npm_config_proxydev) {
                app.use(require('connect-cgi-mock')({
                    // 模拟数据文件根目录（本地目录）
                    root: resolve(''),

                    // HTTP路由根路径（请求路径中/api下所有请求都会认为是CGI请求）
                    // 路由支持 字符串（仅支持根路径起）/正则/函数
                    route: '/mock'
                }))
            }
        }
    }
}

if (process.env.npm_config_proxydev) {
    config.devServer.proxy = {
        // '/mock': {
        //     target: 'http://127.0.0.1:12301/boss/',
        //     // target: 'http://127.0.0.1:8080/',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/mock': ''
        //     }
        // }
        '/mock/system': {
            target: 'http://120.79.216.133/',
            // target: 'http://127.0.0.1:12301/boss/',
            changeOrigin: true,
            pathRewrite: {
                '^/mock': ''
            }
        },
        '/mock/note': {
            target: 'http://120.79.216.133/',
            // target: 'http://127.0.0.1:8080/',
            changeOrigin: true,
            pathRewrite: {
                '^/mock': ''
            }
        },
        '/mock/file': {
            target: 'http://120.79.216.133/',
            // target: 'http://127.0.0.1:8080/',
            changeOrigin: true,
            pathRewrite: {
                '^/mock': ''
            }
        },
    }
}

module.exports = config