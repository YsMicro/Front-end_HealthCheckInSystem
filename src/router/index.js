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
                component: () => import('@/views/user/UserManage.vue'),
                meta: {requiresAdmin: true}
            }
        ]
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userRole = localStorage.getItem('userRole') || 'user';

    if (to.meta.requiresAdmin && userRole !== 'admin') {
        next('/login'); // 无权限则跳转登录页
        ElMessage.warning('需要管理员权限');
    } else {
        next();
    }
});


// 导出
export default router