import request from '@/utils/http'

export const test_get = (params) => {
    return request({
        url: 'test/te',
        method: 'get',
        params
    })
}