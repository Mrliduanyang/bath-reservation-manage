<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.keyword"
        placeholder="姓名"
        style="width: 200px; margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleSearch"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
        搜索
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="users"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="序号"
        prop="index"
        sortable
        align="center"
        width="80"
      />
      <el-table-column
        label="注册时间"
        prop="updatedAt"
        sortable
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.updatedAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        sortable
        align="center"
        width="110"
      />
      <el-table-column
        label="学号"
        prop="studentId"
        align="center"
        min-width="150px"
      />
      <el-table-column
        label="性别"
        prop="sex"
        sortable
        align="center"
        width="110"
      />
      <el-table-column
        label="宿舍"
        prop="dormitory"
        sortable
        align="center"
        min-width="150"
      />
      <el-table-column label="用户状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.prohibit | statusColorMap">
            {{ row.prohibit | statusMap }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="用户管理"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            v-if="!row.prohibit"
            type="danger"
            @click="handleModifyStatus(row,true)"
          >
            禁止预约
          </el-button>
          <el-button
            v-if="row.prohibit"
            type="success"
            @click="handleModifyStatus(row,false)"
          >
            解除禁止
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="userCount>0"
      :total="userCount"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="getActivities"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { User } from '@/api/admin'

export default {
  name: 'User',
  components: { Pagination },
  filters: {
    statusColorMap(status) {
      return status ? 'danger' : 'success'
    },
    statusMap(status) {
      return status ? '已禁止' : '可预约'
    }
  },
  data() {
    return {
      users: [],
      listLoading: true,
      queryParams: {
        page: 1,
        limit: 20,
        keyword: '',
        author: ''
      },
      userCount: 0
    }
  },
  created() {
    this.getActivities()
  },
  methods: {
    /**
       * @function 获取已发布活动
       */
    async getActivities() {
      this.listLoading = true
      const tmp = await User.getUsers(this.queryParams)
      this.users = tmp.map((item, index) => ({
        index: index + 1,
        ...item
      }))
      this.userCount = await User.getUserCount(this.queryParams)
      this.listLoading = false
    },
    /**
       * @function 处理关键词搜索
       */
    handleSearch() {
      this.getActivities()
    },
    async handleModifyStatus(row, status) {
      this.$confirm('此操作将禁止所选用户预约洗浴, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          if (await User.modifyUserStatus({ objectId: row.objectId, status })) {
            row.prohibit = status
            this.$message({
              type: 'success',
              message: status ? '禁止预约成功' : '解除禁止成功'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    }
  }
}
</script>
