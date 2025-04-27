import {createRouter, createWebHistory} from "vue-router";

// 导入组件
import LoginVue from "@/views/Login.vue";
import LayoutVue from "@/views/Layout.vue";
import {ElMessage} from "element-plus";

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
                path: '/home',
                component: () => import('@/views/Home.vue')
            },
            // 修改默认重定向
            {
                path: '/layout',
                component: LayoutVue,
                redirect: '/home', // 添加这行设置默认跳转
                children: [
                    // ...原有路由配置
                ]
            },
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
    const token = localStorage.getItem('token'); // 从本地存储获取token
    const userRole = localStorage.getItem('userRole') || 'user';

    // 白名单配置
    const whiteList = ['/login'];

    // 非白名单路径且无token时跳转登录
    if (!whiteList.includes(to.path) && !token) {
        next('/login');
        ElMessage.warning('请先登录');
        return;
    }

    // 管理员权限校验
    if (to.meta.requiresAdmin && userRole !== 'admin') {
        next('/login');
        ElMessage.warning('需要管理员权限');
    } else {
        next();
    }
});


// 导出
export default router