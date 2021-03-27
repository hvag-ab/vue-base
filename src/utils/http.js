import axios from 'axios'
import { Message } from 'element-ui'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/loading'
import Cookies from 'js-cookie'
import store from '@/store'
import { getToken } from '@/utils/auth'


// 创建自定义接口服务实例
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

http.interceptors.request.use(config => {
  if (config.showLoading) {
    // 如果配置了showLoading: true，则显示loading
    showFullScreenLoading()
  }
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = token
  }
  // 在post请求前统一添加X-CSRFToken的header信息
  if (config.method != 'get') {
    config.headers['X-CSRFToken'] = Cookies.get('csrftoken')
    config.headers['X-Requested-With'] = 'XMLHttpRequest' // requestedWith 为 XMLHttpRequest 则为 Ajax 请求。
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
  }
  // console.log(config)
  return config
}, error => {
  tryHideFullScreenLoading()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

// response interceptor
http.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 响应成功关闭loading
    tryHideFullScreenLoading()

    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== true) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    tryHideFullScreenLoading()
    // if (error.response.data) {
    //   Message({
    //     message: error.response.data.msg,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }else{
    //   console.log('err:' + error) // for debug
    //   Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }
    // return Promise.reject(error) // 返回接口返回的错误信息 方便后续catch err
    if (error && error.response) {
      switch (error.response.status) {
          case 400:
              // 对400错误您的处理\
              break
          case 403:
              // 对 403 错误进行处理 token过期
              store.dispatch('user/resetToken').then(() => {
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            　　setTimeout(() => {
                　　router.replace({
                　　  path: '/login',
                　　query: {
                　　  redirect: router.currentRoute.fullPath
                　　}
              　　  })
              　}, 1000)
              })
              break
          case 404:
            Message.error('请求资源不存在')
            break
          default:
            console.log('err:' + error) // for debug
      }
    }
    // 如果以上都不是的处理
    let errorinfo = error.response.data.msg ? error.response.data.msg: error.message
    return Promise.reject(errorinfo) // 返回接口返回的错误信息 方便后续catch err
  }
)



export default http
