import request from "@/utils/request.js";
// import {useTokenStore} from "@/stores/token.js";
// 健康记录列表查询
export const healthRecordListService = () => {
    // const tokenStore = useTokenStore();
    // return request.get('/healthRecord', {headers: {'Authorization': tokenStore.token}});
    return request.get('/healthRecord');
}

// 健康记录添加
export const healthRecordAddService = (healthRecordData) => {
    return request.post('/healthRecord', healthRecordData);
}

// 健康记录修改
export const healthRecordUpdateService = (healthRecordData) => {
    return request.put('/healthRecord', healthRecordData);
}

// 健康记录删除
export const healthRecordDeleteService = (id) => {
    return request.delete('/healthRecord', {
        data: {recordId: id}
    });
}