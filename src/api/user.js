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

// 用户登录
export const userLoginService = (loginData) => {
    //借助UrlSearchParams对象拼接请求参数
    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }
    return request.post('/user/login', params);
}

// 管理员登录
export const adminLoginService = (loginData) => {
    const params = new URLSearchParams();
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }
    return request.post('/admin/login', params);
}

// 获取用户信息
export const userInfoService = () => {
    return request.get('/user/userInfo');
}

// 更新用户信息
export const updateUserInfoService = (userInfoData) => {
    return request.put('/user/update', userInfoData);
}

// 更新用户头像
export const userAvatarUpdateService = (avatarUrl) => {
    const params = new URLSearchParams();
    params.append('avatarUrl', avatarUrl);
    console.log("params:" + params);
    return request.patch('/user/updateAvatar', params);
}