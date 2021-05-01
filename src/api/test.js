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
