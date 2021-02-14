const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    "id|+1":1,  //数字从当前数开始后续依次加一
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],//status是数组中的一个，随机的
    author: "@cname",    //名字为随机中文名字
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)' // 8-28之间的随机数字
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      query = config.query
      console.log(config)
      let { page, pageSize } = query
      page = page || 1
      pageSize = pageSize || 10

      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items.slice((page-1)*pageSize,page*pageSize)
        }
      }
    }
  }
]
