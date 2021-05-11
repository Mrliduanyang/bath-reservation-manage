<template>
  <el-dialog
    title="个人信息"
    :visible.sync="showUserInfo"
    @closed="onDialogClose"
  >
    <el-form
      ref="userInfoForm"
      :model="userInfo"
      :rules="rules"
      label-position="right"
      label-width="80px"
      style="width: 400px; margin-left:50px;"
    >

      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="userInfo.username"
          disabled
        />
      </el-form-item>

      <el-form-item
        label="角色"
        prop="role"
      >
        <el-input
          v-model="userInfo.role"
          disabled
        />
      </el-form-item>

      <el-form-item
        label="头像"
        prop="avatar"
      >
        <avatar-upload
          :avatar="userInfo.avatar"
          @update-avatar="updateAvatar"
        />
      </el-form-item>

      <el-form-item
        label="真实姓名"
        prop="realName"
      >
        <el-input
          v-model="userInfo.realName"
          disabled
        />
      </el-form-item>

      <el-form-item
        label="密码"
        prop="oldPwd"
      >
        <el-input
          v-model="userInfo.oldPwd"
          placeholder="请输入原密码"
        />
      </el-form-item>

      <el-form-item
        label="新密码"
        prop="newPwd"
      >
        <el-input
          v-model="userInfo.newPwd"
          placeholder="请输入新密码"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        @click="showUserInfo = false"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        @click="updateUserInfo"
      >
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import AvatarUpload from './AvatarUpload'

export default {
  name: 'UserInfo',
  components: { AvatarUpload },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      rules: {
        oldPwd: [{
          required: true,
          trigger: 'blur',
          message: '旧密码不得为空'
        }, {
          min: 8,
          max: 20,
          message: '旧密码长度在 8 到 20 个字符',
          trigger: 'blur'
        }, {
          pattern: /^[A-Za-z0-9]+$/,
          trigger: 'blur',
          message: '旧密码不合规范'
        }],
        newPwd: [{
          required: true,
          trigger: 'blur',
          message: '新密码不得为空'
        }, {
          min: 8,
          max: 20,
          message: '新密码长度在 8 到 20 个字符',
          trigger: 'blur'
        }, {
          pattern: /^[A-Za-z0-9]+$/,
          trigger: 'blur',
          message: '新密码不合规范'
        }]
      }
    }
  },
  computed: {
    showUserInfo: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    updateAvatar(avatar) {
      this.$emit('update-avatar', avatar)
    },
    updateUserInfo() {
      this.$refs.userInfoForm.validate((valid) => {
        if (valid) {
          this.$emit('update-user', this.userInfo)
        }
      })
    },
    onDialogClose() {
      this.$refs.userInfoForm.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
