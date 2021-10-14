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

//上传文件请求 这里有一个坑 let formData = new FormData();  这个formData对象 类字典 formData.append('a','b'), 传入这个对象的时候upload(formData) 
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
