<template>
  <div class="components-container">
    <pan-thumb :image="avatar" />
    <el-upload
      ref="avatar"
      style="position: absolute;bottom: 15px;margin-left: 170px;"
      action=""
      :multiple="false"
      :show-file-list="false"
      :http-request="uploadAvatar"
    >
      <el-button type="primary">
        修改头像
      </el-button>
    </el-upload>

  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb/index'

export default {
  name: 'AvatarUpload',
  components: { PanThumb },
  props: {
    avatar: {
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * @function 自定义上传（函数作为参数传进el-upload，只能放在这里）
     * @param uploadFiles
     */
    async uploadAvatar(uploadFiles) {
      const reader = new FileReader()
      const { file } = uploadFiles
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        this.$emit('update-avatar', reader.result)
      }
    }
  }
}
</script>

<style scoped>
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
