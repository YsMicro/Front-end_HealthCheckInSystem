<script setup>
import {Plus, Upload} from '@element-plus/icons-vue'
import {ref} from 'vue'
import avatar from '@/assets/default.png'
import {useTokenStore} from "@/stores/token.js"
import useUserInfoStore from "@/stores/userInfo.js"
import {userAvatarUpdateService} from "@/api/user.js"
import {ElMessage} from "element-plus";
import axios from "axios"; // 引入更新头像URL的API

const uploadRef = ref()
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()
const imgUrl = ref(userInfoStore.info.avatarUrl)

const uploadSuccess = async (result) => {
  const newAvatarUrl = result.data // 假设返回的数据结构为 { url: '新的头像URL' }
  imgUrl.value = newAvatarUrl

  // 更新数据库中的头像URL
  await userAvatarUpdateService(newAvatarUrl)

  // 更新本地存储的用户信息
  userInfoStore.setInfo({...userInfoStore.info, avatarUrl: newAvatarUrl})
}

//start vojago
const file = ref(null)

// 修改点2: 添加文件选择处理
const handleFileChange = (uploadFile) => {
  file.value = uploadFile.raw
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
}

// 修改点3: 修改上传按钮点击处理
const handleUpload = async () => {
  if (!file.value) {
    ElMessage.warning('请先选择图片')
    return
  }

  const formData = new FormData()
  formData.append('file', file.value)

  try {
    const result = await axios.post('/api/upload', formData, {
      headers: {
        'Authorization': tokenStore.token,
        'Content-Type': 'multipart/form-data'
      }
    })

    // 调用原有上传成功处理
    await uploadSuccess(result.data)
    ElMessage.success('头像上传成功')
  } catch (e) {
    ElMessage.error('上传失败')
  }
}
//end vojago
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>更换头像</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <!--        <el-upload
                    ref="uploadRef"
                    :auto-upload="true"
                    :headers="{'Authorization': tokenStore.token}"
                    :on-success="uploadSuccess"
                    :show-file-list="false"
                    action="/api/upload"
                    class="avatar-uploader"
                    name="file"
                >
                  <img v-if="imgUrl" :src="imgUrl" class="avatar"/>
                  <img v-else :src="avatar" width="278"/>
                </el-upload>-->
        <el-upload
            ref="uploadRef"
            :auto-upload="false"
            :headers="{'Authorization': tokenStore.token}"
            :on-change="handleFileChange"
            :on-success="uploadSuccess"
            :show-file-list="false"
            action="/api/upload"
            class="avatar-uploader"
            name="file"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar"/>
          <img v-else :src="avatar" width="278"/>
        </el-upload>
        <br/>
        <el-button :icon="Plus" size="large" type="primary" @click="uploadRef.$el.querySelector('input').click()">
          选择图片
        </el-button>
        <el-button :icon="Upload" size="large" type="success"
                   @click="handleUpload">
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
