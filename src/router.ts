import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/home/index.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/about/index.vue'),
        },
        { path: "/:pathMatch(.*)*", redirect: "/" },
    ]
})

router.beforeEach((to) => {
    const store = useUserStore()

    // 如果用户未登录且访问的不是登录页面，则重定向到登录页
    if (!store.islogin && to.name !== 'login') {
        return { name: 'login' }
    }

    // 如果用户已登录且访问登录页面，则重定向到首页
    if (store.islogin && to.name === 'login') {
        return { name: 'home' }
    }
})

export default router