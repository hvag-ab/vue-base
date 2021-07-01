/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/*
解析url query参数
*/
export const getQueryString = (name) => { 
    let reg = `(^|&)${name}=([^&]*)(&|$)`
    let r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
}

/*
axios 下载file
*/

export const downloadFile = response => {
  //不能解析成json 说明可能是正常的二进制文件
  // 前提是服务端要在header设置Access-Control-Expose-Headers: Content-Disposition
  // 前端才能正常获取到Content-Disposition内容
  const disposition = response.headers["content-disposition"]
  let fileName = disposition.substring(
    disposition.indexOf("filename=") + 9,
    disposition.length
  );
  // iso8859-1的字符转换成中文
  fileName = decodeURI(escape(fileName))
  // 去掉双引号
  fileName = fileName.replace(/\"/g, "")

  const blobObject = response.data

  //兼容ie11
  if (window.navigator.msSaveOrOpenBlob) {
    const blobObject = new Blob([blobObject])
    window.navigator.msSaveOrOpenBlob(blobObject, fileName)
  }

  // 创建a标签并点击， 即触发下载
  let url = window.URL.createObjectURL(new Blob([blobObject]))
  let link = document.createElement("a")
  link.style.display = "none"
  link.href = url
  link.setAttribute("download", fileName)

  document.body.appendChild(link)
  link.click()
  // 释放URL 对象
  window.URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

