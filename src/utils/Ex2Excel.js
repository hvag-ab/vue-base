import http from '@/utils/http.js'

export const exportExcel = async (url, options = {}, method = 'post') => {
  const response = await http({
    method: method,
    url: url, // 请求地址
    data: options, // 参数
    params: options,
    responseType: 'blob' // 表明返回服务器返回的数据类型
  }).catch(err => err)
  const blob = new Blob([response], {
    type: 'application/vnd.ms-excel'
  })
  console.log(blob)
  const fileName = Date.parse(new Date()) + '.xlsx'
  if (window.navigator.msSaveOrOpenBlob) {
    // console.log(2)
    navigator.msSaveBlob(blob, fileName)
  } else {
    // console.log(3)
    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    // 释放内存
    window.URL.revokeObjectURL(link.href)
  }
}
