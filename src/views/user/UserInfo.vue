<!--
<script setup>
import {ref} from 'vue'

import useUserInfoStore from "@/stores/userInfo.js";

const userInfoStore = useUserInfoStore();
const userInfo = ref({...userInfoStore.info});
const rules = {
  nickname: [
    {required: true, message: '请输入用户昵称', trigger: 'blur'},
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    {required: true, message: '请输入用户邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
  ]
}
import {updateUserInfoService} from '@/api/user.js';
import {ElMessage} from "element-plus";
// 更新用户信息
const updateUserInfo = async () => {
  let result = await updateUserInfoService(userInfo.value);
  if (result.code === 1) {
    userInfoStore.setInfo(result.data);
    ElMessage.success('更新用户信息成功');
  } else {
    ElMessage.error('更新用户信息失败');
  }
  // 修改Pinia中的用户信息
  userInfoStore.setInfo(userInfo.value);
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
-->


<!--

<script setup>
import { ref } from 'vue'

import useUserInfoStore from "@/stores/userInfo.js";

const userInfoStore = useUserInfoStore();
const userInfo = ref({
  ...userInfoStore.info,
  // gender: 'unknown', // 默认值
  // phone: '' // 默认值
});
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  phone: [
    {pattern: /*/^1[3-9]\d{9}$/*//^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}
import { updateUserInfoService } from '@/api/user.js';
import { ElMessage } from "element-plus";
// 更新用户信息
const updateUserInfo = async () => {
  let result = await updateUserInfoService(userInfo.value);
  if (result.code === 1) {
    userInfoStore.setInfo(result.data);
    ElMessage.success('更新用户信息成功');
  } else {
    ElMessage.error('更新用户信息失败');
  }
  // 修改Pinia中的用户信息
  userInfoStore.setInfo(userInfo.value);
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="userInfo.gender" placeholder="请选择性别">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
              <el-option label="未知" value="unknown"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
-->


<script setup>
import {ref} from 'vue'
import {ElForm, ElMessage} from 'element-plus' // 引入 ElForm
import useUserInfoStore from "@/stores/userInfo.js";
import {updateUserInfoService} from '@/api/user.js';

const userInfoStore = useUserInfoStore();
const userInfo = ref({
  ...userInfoStore.info/*,
  gender: 'unknown', // 默认值
  phone: '' // 默认值*/
});
const rules = {
  nickname: [
    {required: true, message: '请输入用户昵称', trigger: 'blur'},
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    {required: true, message: '请输入用户邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
  ],
  gender: [
    {required: true, message: '请选择性别', trigger: 'change'}
  ],
  phone: [
    {pattern: /*/^1[3-9]\d{9}$/*//^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur'} // 修正正则表达式
  ]
}

// 定义 formRef 用于获取表单实例
const formRef = ref(null);

// 更新用户信息
const updateUserInfo = async () => {
  // 表单验证
  await formRef.value.validate((valid) => {
    if (valid) {
      // 验证通过，执行更新操作
      updateUserInfoService(userInfo.value).then(result => {
        if (result.code === 1) {
          userInfoStore.setInfo(result.data);
          ElMessage.success('更新用户信息成功');
        } else {
          ElMessage.error('更新用户信息失败');
        }
      }).catch(error => {
        ElMessage.error('更新用户信息失败');
      });
    } else {
      // 验证失败，阻止表单提交
      ElMessage.error('请检查表单输入');
      return false;
    }
  });
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form ref="formRef" :model="userInfo" :rules="rules" label-width="100px" size="large">
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="userInfo.gender" placeholder="请选择性别">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
              <el-option label="保密" value="unknown"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
