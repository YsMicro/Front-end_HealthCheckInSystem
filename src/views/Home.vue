<template>
  <el-card class="page-container">
    <h2>欢迎使用健康打卡系统</h2>
    <p>这是一个基于Vue3+SpringBoot的个人健康管理系统</p>
    <!-- 后续可在此添加打字机效果组件 -->
    <TypeWriter
        :color="'#4bba84'"
        :fontSize="'2rem'"
        :phrases="['Hello World!', 'Hello Vue3!', ' Health Check-in System']"
        :speed="80"/>
  </el-card>
</template>

<style scoped>
.page-container {
  min-height: 400px;
  text-align: center;
}
</style>
<script setup>
import TypeWriter from "@/components/TypeWriter.vue";
</script>