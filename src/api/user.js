//导入请求模块
import request from "@/utils/request.js";
//定义用户注册接口
export const userRegisterService = (registerData) => {
    //借助UrlSearchParams对象拼接请求参数
    const params = new URLSearchParams();
    for (let key in registerData) {
        params.append(key, registerData[key]);
    }
    return request.post('/user/register', params);
}

export const userLoginService = (loginData) => {
    //借助UrlSearchParams对象拼接请求参数
    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }
    return request.post('/user/login', params);
}

export const adminLoginService = (loginData) => {
    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }
    return request.post('/admin/login', params);
}
