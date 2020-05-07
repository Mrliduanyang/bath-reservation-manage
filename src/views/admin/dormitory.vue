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
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleAddDormitory"
      >
        添加
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="dormitories"
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
        label="姓名"
        prop="name"
        sortable
        width="200px"
        align="center"
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
        width="110px"
        align="center"
      />
      <el-table-column
        label="宿舍"
        prop="dormitory"
        sortable
        align="center"
        min-width="150px"
      />
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdateDormitory(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDeleteDormitory(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="dormitoryCount>0"
      :total="dormitoryCount"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="getDormitories"
    />

    <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="activityForm"
        :rules="dormitoryRules"
        :model="dormitoryForm"
        label-position="left"
        label-width="110px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="dormitoryForm.name"
            :disabled="dialogStatus === 'update'"
            placeholder="请输入学生姓名"
          />
        </el-form-item>
        <el-form-item label="学号" prop="studentId">
          <el-input
            v-model="dormitoryForm.studentId"
            :disabled="dialogStatus === 'update'"
            placeholder="请输入学生学号"
          />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-switch
            v-model="dormitoryForm.sex"
            :disabled="dialogStatus === 'update'"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="女"
            inactive-text="男"
            active-value="女"
            inactive-value="男"
          />
        </el-form-item>
        <el-form-item label="宿舍" prop="dormitory">
          <el-input
            v-model="dormitoryForm.dormitory"
            placeholder="请输入学生宿舍"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'? submitDormitory(): updateDormitory()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { Dormitory } from '@/api/admin'

export default {
  name: 'Dormitory',
  components: { Pagination },
  filters: {
    statusColorMap(status) {
      return status ? 'danger' : 'success'
    },
    statusMap(status) {
      return status ? '禁止进入' : '可进入'
    },
    cancelStatusMap(status) {
      return status ? '已取消' : '未取消'
    },
    enterStatusMap(status) {
      return status ? '已进入浴室' : '未进入'
    }
  },
  data() {
    return {
      dormitories: [],
      dialogTitleMap: {
        update: '编辑学生信息',
        create: '添加学生信息'
      },
      dialogStatus: 'create',
      dialogFormVisible: false,
      dormitoryForm: {
        name: '',
        studentId: '',
        sex: '男',
        dormitory: ''
      },
      dormitoryRules: {
        name: [{
          required: true,
          message: '请输入学生姓名',
          trigger: 'blur'
        }],
        studentId: [{
          required: true,
          message: '请输入学生学号',
          trigger: 'blur'
        }],
        sex: [{
          required: true,
          message: '请选择学生性别',
          trigger: 'blur'
        }],
        dormitory: [{
          required: true,
          message: '请输入学生宿舍',
          trigger: 'blur'
        }]
      },
      listLoading: true,
      queryParams: {
        page: 1,
        limit: 20,
        keyword: '',
        author: ''
      },
      dormitoryCount: 0
    }
  },
  created() {
    this.getDormitories()
  },
  methods: {
    /**
       * @function 获取报名信息
       */
    async getDormitories() {
      this.listLoading = true
      const tmp = await Dormitory.getDormitories(this.queryParams)
      this.dormitories = tmp.map((item, index) => ({
        index: index + 1,
        ...item
      }))
      this.dormitoryCount = await Dormitory.getDormitoryCount(this.queryParams)
      this.listLoading = false
    },
    /**
       * @function 处理关键词搜索
       */
    handleSearch() {
      this.getDormitories()
    },
    /**
       * @function 打开添加活动弹窗
       */
    handleAddDormitory() {
      this.dormitoryForm = {
        name: '',
        studentId: '',
        sex: '男',
        dormitory: ''
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.activityForm.clearValidate()
      })
    },
    submitDormitory() {
      this.$refs.activityForm.validate(async(valid) => {
        if (valid) {
          await Dormitory.submitDormitory(this.dormitoryForm)
          await this.getDormitories()
          this.dialogFormVisible = false
        }
      })
    },
    /**
       * @function 打开编辑活动弹窗
       * @param row
       */
    handleUpdateDormitory(row) {
      this.dormitoryForm = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.activityForm.clearValidate()
      })
    },
    updateDormitory() {
      this.$refs.activityForm.validate(async(valid) => {
        if (valid) {
          await Dormitory.updateDormitory(this.dormitoryForm)
          await this.getDormitories()
          this.dialogFormVisible = false
        }
      })
    },
    async handleDeleteDormitory(row) {
      this.$confirm('此操作将永久删除所选用户的住宿信息, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          if (await Dormitory.deleteDormitory({ objectId: row.objectId })) {
            await this.getDormitories()
            this.$message({
              type: 'success',
              message: '住宿信息删除成功'
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
