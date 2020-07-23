export default [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录',
            keepAlive: false
        }
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/components/main.vue'),
        children : [
            {
                path: '/work',
                name: 'work',
                component: () => import('@/views/work.vue'),
                meta: {
                    title: '工作台',
                    keepAlive: false
                }
            },
            {
                path: '/system_user',
                name: 'system_user',
                component: () => import('@/views/system/user/list.vue'),
                meta: {
                    title: '用户管理',
                    keepAlive: true
                }
            },
            {
                path: '/system_role',
                name: 'system_role',
                component: () => import('@/views/system/role/list.vue'),
                meta: {
                    title: '角色管理',
                    keepAlive: true
                }
            },
            {
                path: '/note_type',
                name: 'note_type',
                component: () => import('@/views/note/type/list.vue'),
                meta: {
                    title: '笔记种类配置',
                    keepAlive: true
                }
            },
            {
                path: '/note_data',
                name: 'note_data',
                component: () => import('@/views/note/data/list.vue'),
                meta: {
                    title: '笔记管理',
                    keepAlive: true
                }
            },
            {
                path: '/note_data_query',
                name: 'note_data_query',
                component: () => import('@/views/note/data/query.vue'),
                meta: {
                    title: '笔记高级查询',
                    keepAlive: true
                }
            },
            {
                path: '/note_data_add',
                name: 'note_data_add',
                component: () => import('@/views/note/data/add.vue'),
                meta: {
                    title: '新增笔记',
                    keepAlive: false
                }
            },
            {
                path: '/note_data_preview',
                name: 'note_data_preview',
                component: () => import('@/views/note/data/preview.vue'),
                meta: {
                    title: '笔记预览',
                    keepAlive: false
                }
            },
            {
                path: '/main_404',
                name: 'main_404',
                component: () => import('@/components/error/404.vue')
            }
        ]
    },
    {
        path: '*',  
        name: 'error_404',
        component: () => import('@/components/error/404.vue')
    }
]