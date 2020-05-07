<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :src="avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span
              style="display:block;"
              @click="handelLogout"
            >
              退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showUserInfo: false,
      userInfo: {
        username: '',
        role: '',
        avatar: '',
        realName: '',
        oldPwd: '',
        newPwd: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'username',
      'avatar',
      'realName',
      'role',
      'token'
    ]),
    isOwner() {
      return this.role === 'user'
    }
  },
  methods: {
    /**
     * @function 切换侧边栏折叠、展开状态
     */
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    /**
     * @function 登出
     */
    handelLogout() {
      if (this.role === 'admin') {
        this.$store.dispatch('user/logOut')
          .then(() => {
            this.$router.push({ path: '/login/admin' })
          })
      } else {
        this.$store.dispatch('user/logOut')
          .then(() => {
            this.$router.push({ path: '/login/user' })
          })
      }
      location.reload()
    },
    /**
     * @function 显示用户信息模态框
     */
    handleShowUserInfo() {
      this.userInfo.username = this.username
      this.userInfo.role = this.role
      this.userInfo.avatar = this.avatar
      this.userInfo.realName = this.realName
      this.showUserInfo = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
