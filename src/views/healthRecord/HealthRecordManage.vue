<script setup>
import {Delete, Edit} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
//声明列表查询异步函数
import {
  healthRecordAddService,
  healthRecordDeleteService,
  healthRecordListPageService,
  healthRecordListService,
  healthRecordUpdateService
} from "@/api/healthRecord.js"

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

const healthRecordList = async () => {
  let result = await healthRecordListService();
  healthRecord.value = result.data;
}
healthRecordList();

//控制健康记录弹窗
const dialogVisible = ref(false)

//添加健康记录数据模型
const addForm = ref({
  userId: null,        // 数字类型
  temperature: null,   // 数字类型（带小数）
  symptoms: [],        // 字符串数组
  remark: '',          // 字符串
  recordTime: '',      // 日期字符串
  syncStatus: 0        // 数字（0/1）
})
//添加健康记录表单校验
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
const title = ref('');

const showDialog = (row) => {
  dialogVisible.value = true;
  title.value = '编辑记录';
  addForm.value.recordId = row.recordId;
  addForm.value.userId = row.userId;
  addForm.value.temperature = row.temperature;
  addForm.value.symptoms = row.symptoms;
  addForm.value.recordTime = row.recordTime;
  addForm.value.remark = row.remark;
  addForm.value.id = row.id;
}

// 编辑健康记录
const updateHealthRecord = async () => {
  try {
    let result = await healthRecordUpdateService(addForm.value);
    ElMessage.success(result.message ? result.message : '修改成功');
    healthRecordList();
    dialogVisible.value = false;
  } catch (error) {
    console.log(error);
  }
}

// 清空表单
const clearForm = () => {
  addForm.value.temperature = null;
  addForm.value.symptoms = [];
  addForm.value.remark = '';
  addForm.value.recordTime = '';
}

// 删除健康记录
const deleteHealthRecord = (id) => {
  try {
    ElMessageBox.confirm(
        // 'proxy will permanently delete the file. Continue?',
        '确认要删除这条记录吗？',
        // 'Warning',
        '警告',
        {
          // confirmButtonText: 'OK',
          confirmButtonText: '确认',
          // cancelButtonText: 'Cancel',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          let result = await healthRecordDeleteService(id);
          ElMessage({
            type: 'success',
            // message: 'Delete completed',
            message: '删除成功',
          })
          healthRecordList();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除',
          })
        })
  } catch (error) {
    console.log(error);
  }
}

// 分页
const pageNum = ref(1);
const pageSize = ref(5);
const total = ref(20);
const onSizeChange = (size) => {
  pageSize.value = size;
  healthRecordListPage();
}
const onCurrentChange = (num) => {
  pageNum.value = num;
  healthRecordListPage();
}

// 获取健康记录分页列表
const healthRecordListPage = async () => {
  try {
    let params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      userId: addForm.value.userId
    }
    let result = await healthRecordListPageService(params);
    total.value = result.data.total;
    healthRecord.value = result.data.items;
  } catch (error) {
    console.log(error);
  }
}
healthRecordListPage();
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>健康记录</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible = true;title = '添加记录';">添加记录</el-button>
        </div>
      </div>
    </template>

    <!-- 搜索表单 -->
    <!--    <el-form inline style="display: flex; flex-wrap: wrap; gap: 10px">
          <el-form-item label="文章分类：" style="margin-right: 20px">
            <el-select placeholder="请选择" v-model="categoryId" style="width: 200px">
              <el-option
                  v-for="c in categorys"
                  :key="c.id"
                  :label="c.categoryName"
                  :value="c.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布状态：">
            <el-select placeholder="请选择" v-model="state">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>-->

    <el-table :data="healthRecord" max-height="calc(100vh - 400px)" style="width: 100%">
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
          <el-button :icon="Edit" circle plain type="primary"
                     @click="showDialog(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteHealthRecord(row.recordId)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"/>
      </template>
    </el-table>
    <!-- 添加健康记录弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="40%" @close="clearForm()">
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
                v-for="item in ['无明显症状','咳嗽', '发热', '乏力', '头痛']"
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
                    <el-button @click="dialogVisible = false;">取消</el-button>
                    <el-button type="primary"
                               @click="title==='添加记录'? addHealthRecord(): updateHealthRecord()"> 确认 </el-button>
                </span>
      </template>
    </el-dialog>
    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
                   :total="total" background layout="jumper, total, sizes, prev, pager, next"
                   style="margin-top: 20px; justify-content: flex-end"
                   @size-change="onSizeChange" @current-change="onCurrentChange"/>
    <!--    <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[100, 200, 300, 400]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />-->
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