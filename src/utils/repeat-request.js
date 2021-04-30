const pending = new Map() // 声明一个 Map 用于存储每个请求的标识 和 取消函数

export const changePending = (config) => {
    const url = [
        config.method, //方法
        config.url,//路径
        qs.stringify(config.params),//查询参数
        qs.stringify(config.data)//提交数据
    ].join('&') //转换成字符串
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
        if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      		pending.set(url, cancel) //键：url 值：取消函数
    	}else{// 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
            let cancel = pending.get(url)
            cancel(url)
            pending.delete(url)
        }
    })
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
 export const clearPending = () => {
    for (const [url, cancel] of pending) {
      cancel(url)
    }
    pending.clear()
  }
  
