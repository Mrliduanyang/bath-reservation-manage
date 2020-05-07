<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.keyword"
        placeholder="姓名"
        style="width: 200px; margin-right: 10px"
        class="filter-item"
      />
      <el-date-picker
        v-model="queryParams.dateRange"
        class="filter-item"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button
        style="margin-left: 10px;"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
      >
        搜索
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="reservations"
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
        width="110px"
        align="center"
      >
        <template slot-scope="{row}">
          <el-tooltip
            class="item"
            effect="dark"
            :content="row.dormitory"
            placement="top"
          >
            <span>{{ row.name }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="学号"
        align="center"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <el-tooltip
            class="item"
            effect="dark"
            :content="row.dormitory"
            placement="top"
          >
            <span>{{ row.studentId }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex"
        sortable
        width="110px"
        align="center"
      />
      <el-table-column
        label="预约时间"
        prop="date"
        sortable
        min-width="150px"
        align="center"
      />
      <el-table-column
        label="预约浴池"
        prop="area"
        sortable
        min-width="150px"
        align="center"
      />
      <el-table-column
        label="是否取消"
        prop="cancelled"
        class-name="status-col"
        width="100"
        sortable
      >
        <template slot-scope="{row}">
          <el-tag :type="row.cancelled | statusColorMap">
            {{ row.cancelled | cancelStatusMap }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="是否进入"
        prop="entered"
        class-name="status-col"
        width="100"
        sortable
      >
        <template slot-scope="{row}">
          <el-tag :type="row.entered | statusColorMap">
            {{ row.entered | enterStatusMap }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="预约状态"
        prop="prohibit"
        class-name="status-col"
        width="100"
        sortable
      >
        <template slot-scope="{row}">
          <el-tag :type="row.prohibit | statusColorMap">
            {{ row.prohibit | statusMap }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="预约管理"
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
            禁止进入
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
      v-show="reservationCount>0"
      :total="reservationCount"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="getReservations"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { Reservation } from '@/api/admin'

export default {
  name: 'Reservation',
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
      reservations: [],
      listLoading: true,
      queryParams: {
        page: 1,
        limit: 20,
        keyword: '',
        dateRange: []
      },
      reservationCount: 0,
    }
  },
  created() {
    this.getReservations()
  },
  methods: {
    /**
       * @function 获取报名信息
       */
    async getReservations() {
      this.listLoading = true
      const tmp = await Reservation.getReservations(this.queryParams)
      const studentIds = tmp.map((item) => item.studentId)
      const dormitories = await Reservation.getDormitoryById(studentIds)
      this.reservations = tmp.map((item, index) => ({
        index: index + 1,
        dormitory: dormitories[index].dormitory,
        ...item,
        date: `${item.date} ${item.time}`
      }))
      this.reservationCount = await Reservation.getReservationCount(this.queryParams)
      this.listLoading = false
    },
    /**
       * @function 处理关键词搜索
       */
    handleSearch() {
      this.getReservations()
    },
    async handleModifyStatus(row, status) {
      this.$confirm('此操作将禁止所选用户进入浴室, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          if (await Reservation.modifyReservationStatus({ objectId: row.objectId, status })) {
            row.prohibit = status
            this.$message({
              type: 'success',
              message: status ? '禁止进入成功' : '解除禁止成功'
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
