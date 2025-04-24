//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import {ElMessage} from 'element-plus'
//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
// const baseURL = 'http://8.140.238.228:8080/api';
const baseURL = '/api';
const instance = axios.create({baseURL})

//添加请求拦截器
import {useTokenStore} from "@/stores/token.js";

instance.interceptors.request.use(config => {
    const tokenStore = useTokenStore();
    if (tokenStore.token) {
        config.headers.Authorization = tokenStore.token;
    }
    return config;
}, err => {
    //在请求发出之前进行一些处理
    alert('请求异常');
    return Promise.reject(err);//异步的状态转化成失败的状态
})
import router from "@/router/index.js";
//添加响应拦截器
instance.interceptors.response.use(result => {
    console.log('完整响应体: ', result);
    if (result.data.code === 1) {
        return result.data;
    }
    // alert(result.data.message ? result.data.message : '服务异常');
    ElMessage.error(result.data.message ? result.data.message : '服务异常');
    return Promise.reject(result.data);
}, err => {
    console.log('完整响应体: ', err);
    //若响应状态码为401,则跳转到登录页
    if (err.response.status === 401) {
        ElMessage.warning('请登录');
        //跳转到登录页
        router.push('/login');
    } else {
        ElMessage.error('服务异常');
    }
    return Promise.reject(err);//异步的状态转化成失败的状态
})

export default instance;