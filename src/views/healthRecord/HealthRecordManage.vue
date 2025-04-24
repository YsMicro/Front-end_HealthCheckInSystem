<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {ref} from 'vue'

const healthRecord = ref([
  {
    "recordId": 3,
    "userId": "美食",
    "temperature": "my",
    "symptoms": "2023-09-02 12:06:59",
    "remark": "2023-09-02 12:06:59",
    "recordTime": "2023-09-02 12:06:59",
    "syncStatus": 0
  }
])

//声明列表查询异步函数
import {healthRecordListService} from "@/api/healthRecord.js"

const healthRecordList = async () => {
  let result = await healthRecordListService();
  healthRecord.value = result.data;
}
healthRecordList();
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>健康记录</span>
        <div class="extra">
          <el-button type="primary">添加记录</el-button>
        </div>
      </div>
    </template>
    <el-table :data="healthRecord" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="用户ID" prop="userId"></el-table-column>
      <el-table-column label="体温" prop="temperature"></el-table-column>
      <el-table-column label="症状" prop="symptoms"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="记录时间" prop="recordTime"></el-table-column>
      <el-table-column label="同步状态" prop="syncStatus"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary"></el-button>
          <el-button :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"/>
      </template>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>