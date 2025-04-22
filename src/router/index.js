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
        component: LayoutVue
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出
export default router