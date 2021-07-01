import request from '@/utils/http'

export const testGet = (params) => {
    return request({
        url: 'yourpath',
        method: 'get',
        params
    })
}

export const testPost = (data) => {
    return request({
        url: 'yourpath',
        method: 'post',
        data
    })
}

export const testUpdate = (data) => {
    return request({
        url: 'yourpath',
        method: 'patch',
        data
    })
}

export const testDelete = (data) => {
    return request({
        url: 'yourpath',
        method: 'delete',
        data
    })
}

//上传文件请求
export const upload = (data) => {
    return request({
        url: 'yourpath',
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data
    })
}

export const download = (params) => {
    return request({
        url: 'api/v1/app/download_excel/',
        method: 'get',
        responseType: 'blob', // 表明返回服务器返回的文件二进制类型
        params
    })
}
