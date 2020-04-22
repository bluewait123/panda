export default [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/components/main.vue'),
        children : [
            {
                path: '/work',
                name: 'work',
                component: () => import('@/views/work.vue')
            }
        ]
    }
]