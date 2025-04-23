import {createRouter, createWebHistory} from "vue-router";

// 导入组件
import LoginVue from "@/views/Login.vue";
import LayoutVue from "@/views/Layout.vue";

// 定义路由关系
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: LoginVue
    },
    {
        path: '/layout',
        // path: '/',
        component: LayoutVue,
        children: [
            {
                path: '/healthRecord/manage',
                component: () => import('@/views/healthRecord/HealthRecordManage.vue')
            },
            {
                path: '/user/avatar',
                component: () => import('@/views/user/UserAvatar.vue')
            },
            {
                path: '/user/resetPassword',
                component: () => import('@/views/user/UserResetPassword.vue')
            },
            {
                path: '/user/info',
                component: () => import('@/views/user/UserInfo.vue')
            },
            {
                path: '/user/manage',
                component: () => import('@/views/user/UserManage.vue')
            }
        ]
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出
export default router