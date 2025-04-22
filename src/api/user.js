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