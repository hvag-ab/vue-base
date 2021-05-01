import axios from 'axios'
import { Message } from 'element-ui'
import { startLoading, endLoading } from '@/utils/loading'
import { addPending,removePending  } from '@/utils/repeat-request'
import Cookies from 'js-cookie'
import store from '@/store'
import router from '@/router'

// 创建自定义接口服务实例
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

http.interceptors.request.use(config => {
  if (!config.hiddenLoading) {
    // 如果配置了hiddenLoading: true，则不显示加载进度条
    startLoading()
  }
  const token = store.getters.token
  if (token) {
    config.headers['Authorization'] = token
  }

  config.headers['X-CSRFToken'] = Cookies.get('csrftoken')

  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 将当前请求添加到 pending 中
  return config
}, error => {
  endLoading() //关闭loading
   // do something with request error
   console.log(error) // for debug
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
    endLoading()
    
    removePending(response.config)// 在请求结束后，移除本次请求

    console.log('res',response)

    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== true) {
      if (res.type === 'application/msexcel') return Promise.resolve(res)
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    endLoading()
    
    if(axios.isCancel(error)){ //需要注意的是在`catch`中捕获异常时，应该使用`axios.isCancel()`判断当前请求是否是主动取消的，
        console.log('repeated request: ' + error.message)
    }
    
    if (error && error.response) {
      switch (error.response.status) {
        case 403:
          // 对 403 错误进行处理 token过期
          //   store.dispatch('user/resetToken').then(() => {
          //     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          // 　　setTimeout(() => {
          //     　　router.replace({
          //     　　  path: '/login',
          //     　　query: {
          //     　　  redirect: router.currentRoute.fullPath
          //     　　}
          //   　　  })
          //   　}, 1000)
          //   })
          break
        case 401:

          break
        case 404:
          Message.error('请求资源不存在')
          break
        default:
          console.log('err:' + error) // for debug
      }
    }
    // 如果以上都不是的处理
    let errorinfo = error.response.data.message ? error.response.data.message : error.message
    return Promise.reject(errorinfo) // 返回接口返回的错误信息 方便后续catch err
  }
)


export default http
