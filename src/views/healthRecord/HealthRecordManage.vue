<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {ElMessage} from "element-plus";

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

//控制健康记录弹窗
const dialogVisible = ref(false)

//添加健康记录数据模型
// const categoryModel = ref({
//   categoryName: '',
//   categoryAlias: ''
// })
const addForm = ref({
  userId: null,        // 数字类型
  temperature: null,   // 数字类型（带小数）
  symptoms: [],        // 字符串数组
  remark: '',          // 字符串
  recordTime: '',      // 日期字符串
  syncStatus: 0        // 数字（0/1）
})
//添加健康记录表单校验
// const rules = {
//   categoryName: [
//     { required: true, message: '请输入分类名称', trigger: 'blur' },
//   ],
//   categoryAlias: [
//     { required: true, message: '请输入分类别名', trigger: 'blur' },
//   ]
// }
const rules = {
  // userId: [
  //   {required: true, message: '用户ID不能为空', trigger: 'blur'},
  //   {type: 'number', message: '必须为数字类型'}
  // ],
  temperature: [
    {required: true, message: '体温不能为空'},
    {type: 'number', message: '必须为数字'},
    {
      validator: (rule, value, cb) =>
          value < 30 ? cb(new Error("体温不能低于30℃")) :
              value > 50 ? cb(new Error("体温不能高于50℃")) : cb()
    }
  ],
  symptoms: [
    {type: 'array', required: true, message: '至少选择一个症状', trigger: 'change'}
  ],
  recordTime: [
    {required: true, message: '请选择记录时间', trigger: 'change'}
  ]
}
import {healthRecordAddService} from "@/api/healthRecord.js";
// 添加健康记录
const addHealthRecord = async () => {
  try {
    let result = await healthRecordAddService(addForm.value);
    ElMessage.success(result.message ? result.message : '添加成功');
    healthRecordList();
    dialogVisible.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>健康记录</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible = true">添加记录</el-button>
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
      <!--      <el-table-column label="同步状态" prop="syncStatus"></el-table-column>-->
      <el-table-column label="同步状态">
        <template #default="{row}">
          <el-tag :type="row.syncStatus ? 'success' : 'warning'">
            {{ row.syncStatus ? '已同步' : '未同步' }}
          </el-tag>
        </template>
      </el-table-column>
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

    <!-- 添加健康记录弹窗 -->
    <!--    <el-dialog v-model="dialogVisible" title="添加健康记录" width="30%">-->
    <!--      <el-form :model="addForm" :rules="rules" label-width="100px" style="padding-right: 30px">-->
    <!--        <el-form-item label="分类名称" prop="categoryName">-->
    <!--          <el-input v-model="addForm.categoryName" minlength="1" maxlength="10"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="分类别名" prop="categoryAlias">-->
    <!--          <el-input v-model="addForm.categoryAlias" minlength="1" maxlength="15"></el-input>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <template #footer>-->
    <!--        <span class="dialog-footer">-->
    <!--            <el-button @click="dialogVisible = false">取消</el-button>-->
    <!--            <el-button type="primary"> 确认 </el-button>-->
    <!--        </span>-->
    <!--      </template>-->
    <!--    </el-dialog>-->
    <el-dialog v-model="dialogVisible" title="添加健康记录" width="40%">
      <el-form :model="addForm" :rules="rules" label-width="120px">
        <!--        <el-form-item label="用户ID" prop="userId">-->
        <!--          <el-input-number v-model="addForm.userId" :min="1"/>-->
        <!--        </el-form-item>-->

        <el-form-item label="体温(℃)" prop="temperature">
          <el-input-number
              v-model="addForm.temperature"
              :precision="1"
              :step="0.1"
              :min="30"
              :max="50"/>
        </el-form-item>

        <el-form-item label="症状" prop="symptoms">
          <el-select
              v-model="addForm.symptoms"
              multiple
              filterable
              allow-create
              placeholder="可输入或选择症状">
            <el-option
                v-for="item in ['咳嗽', '发热', '乏力', '头痛']"
                :key="item"
                :label="item"
                :value="item"/>
          </el-select>
        </el-form-item>

        <el-form-item label="记录时间" prop="recordTime">
          <el-date-picker
              v-model="addForm.recordTime"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"/>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
              v-model="addForm.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入备注信息"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addHealthRecord"> 确认 </el-button>
                </span>
      </template>
    </el-dialog>
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