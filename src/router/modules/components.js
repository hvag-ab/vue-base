/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
    path: '/components',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ComponentDemo',
    meta: {
        title: 'Components',
        icon: 'el-icon-s-help'
    },
    children: [
        {
            path: 'table',
            name: 'Table',
            component: () => import('@/views/table/index'),
            meta: { title: 'Table', icon: 'table' }
        },
        {
            path: 'tree',
            name: 'Tree',
            component: () => import('@/views/tree/index'),
            meta: { title: 'Tree', icon: 'tree' }
        },
        {
            path: 'form',
            name: 'Form',
            component: () => import('@/views/form/index'),
            meta: { title: 'Form', icon: 'form' }
        },
        {
            path: 'https://github.com/hvag-ab',
            meta: { title: 'External Link', icon: 'link' }
        }
    ]
}

export default componentsRouter