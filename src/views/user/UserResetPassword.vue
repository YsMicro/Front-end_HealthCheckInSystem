<script setup>
import {ElMessage} from 'element-plus';
import {reactive, ref} from 'vue';
import {updatePasswordService} from '@/api/user';
import {useRouter} from "vue-router";
import {useTokenStore} from "@/stores/token.js";

const router = useRouter();

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  rePassword: ''
});

const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};

const rules = {
  oldPassword: [
    {required: true, message: '请输入旧密码', trigger: 'blur'},
    {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
  ],
  newPassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
  ],
  rePassword: [
    {required: true, message: '请再次输入新密码', trigger: 'blur'},
    {validator: checkRePassword, trigger: 'blur'}
  ]
};

const formRef = ref(null);


const updatePassword = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await updatePasswordService(passwordForm);
        ElMessage.success('密码更新成功');

        // 登出逻辑
        const tokenStore = useTokenStore();
        tokenStore.removeToken(); // 移除 token

        // 跳转到登录页面
        router.push('/login');

      } catch (error) {
        ElMessage.error('密码更新失败');
      }
    } else {
      ElMessage.error('表单验证失败');
      return false;
    }
  });
};
</script>


<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>重置密码</span>
      </div>
    </template>
    <el-form ref="formRef" :model="passwordForm" :rules="rules" class="el-form" label-width="120px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" placeholder="请输入旧密码" show-password
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" placeholder="请输入新密码" show-password
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="rePassword">
        <el-input v-model="passwordForm.rePassword" placeholder="请再次输入新密码" show-password
                  type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePassword">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  //width: 50%;
  //margin: 0 auto;
}

.header {
  font-size: 20px;
  font-weight: bold;
}

.el-form {
  width: 40%;
  //margin: 0 auto;
}
</style>
