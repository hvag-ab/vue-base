import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    noCache: true 表示不需要缓存 要设置缓存一定要name 属性 跟  组件中的name名字一定要相同
     // param参数传递跳转到另一页面那么页面缓存标签就会另外生成一个 query参数传递就会在同一个标签生成 与 tagview 有冲突
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/test',
    component: () => import('@/views/test_connect_backend/index'),
    name: 'Test',
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home', //重定向 如果进入/路径 那么就重定向到/home路径
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: 'Home', icon: 'dashboard' }
    }]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  nestedRouter


  // 404 page must be placed at the end !!! 因为下面加了动态路由 
  // { path: '*', redirect: '/404', hidden: true }
]

// 动态路由

export const asyncRoutes = [
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link',roles: ['admin'] }
      }
    ]
  },

  // {

  //   path: '/user',

  //   component: Layout,

  //   redirect: '/user/userlist',

  //   alwaysShow: true,

  //   name: '用户管理',

  //   meta: { title: '用户管理', icon: 'el-icon-s-tools', roles: ['admin', 'test'] },

  //   children: [

  //     {

  //       path: 'userlist',

  //       name: '用户列表',

  //       component: () => import('@/views/user/index'),

  //       meta: { title: '用户列表', icon: 'table', roles: ['admin'] }

  //     }

  //   ]

  // },

  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  scrollBehavior(to, from, savedPosition) {
    // savedPosition 会在你使用浏览器前进或后退按钮时候生效
   // 这个跟你使用 router.go() 或 router.back() 效果一致
   // 这也是为什么我在 tab 栏结构中放入了一个 点击回退 的按钮
   if (savedPosition) {
        return savedPosition
      } else {
        // 如果不是通过上述行为切换组件，就会让页面回到顶部 否则路由跳转 页面会留在跳转前的位置
        return {x: 0, y: 0}
    }
  },
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
