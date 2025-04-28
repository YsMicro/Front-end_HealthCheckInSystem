<script setup>
import {
  CaretBottom,
  Crop,
  EditPen,
  House,
  Management,
  Promotion,
  SwitchButton,
  User,
  UserFilled,
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import {ref} from "vue";
import {userInfoService} from "@/api/user.js";
import useUserInfoStore from "@/stores/userInfo.js";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {useTokenStore} from "@/stores/token.js";

const userRole = ref(localStorage.getItem('userRole') || 'user');


const userInfoStore = useUserInfoStore();
// 获取用户信息
const getUserInfo = async () => {
  let result = await userInfoService();
  userInfoStore.setInfo(result.data);

};
getUserInfo();

const router = useRouter();
// 头像点击事件
const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm(
        '确定要退出登录吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          // 登出操作
          useTokenStore().removeToken();
          userInfoStore.removeInfo();
          router.push('/login');
          ElMessage({
            type: 'success',
            message: '登出成功',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消登出',
          })
        })
  } else {
    // 路由跳转
    router.push('/user/' + command);
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#144C29A8" text-color="#fff" router>
        <el-menu-item index="/home">
          <el-icon>
            <House/>
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/healthRecord/manage">
          <el-icon>
            <Management/>
          </el-icon>
          <span>健康记录</span>
        </el-menu-item>
        <el-menu-item v-if="userRole === 'admin'" index="/user/manage">
          <el-icon>
            <Promotion/>
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon>
              <UserFilled/>
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/info">
            <el-icon>
              <User/>
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop/>
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/resetPassword">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>用户名：<strong>{{ userInfoStore.info.nickname }}</strong></div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.avatarUrl?userInfoStore.info.avatarUrl:avatar"/>
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="User" command="info">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item :icon="EditPen" command="resetPassword">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <!--        <div style="width: 1290px; height: 570px;border: 1px solid red;">-->
        <!--          内容展示区-->
        <!--        </div>-->
        <router-view/>
      </el-main>
      <!-- 底部区域 -->
      <!--      <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>-->
      <el-footer>个人健康打卡系统 ©2025 Created by Vojago</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: rgba(20, 76, 41, 0.66);

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: rgba(20, 76, 41, 0.66);
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: rgba(69, 140, 101, 0.66);
  }
}
</style>