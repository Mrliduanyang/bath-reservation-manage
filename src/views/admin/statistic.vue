<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="queryParams.area"
        placeholder=""
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="item in bathArea"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-date-picker
        v-model="queryParams.dateRange"
        style="margin-left: 10px"
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
        查询
      </el-button>
    </div>
    <div id="chartDom" style="width: 100%;height:70vh;" />
    <el-table
      v-loading="listLoading"
      :data="statistic"
      border
      fit
      highlight-current-row
      height="600"
      style="width: 100%;"
    >
      <el-table-column
        label="时间"
        prop="time"
        align="center"
        min-width="200"
      />
      <el-table-column
        label="男部实际预约"
        prop="reservationMale"
        width="120px"
        align="center"
      />
      <el-table-column
        label="男部实际进入"
        prop="enteredMale"
        align="center"
        width="120px"
      />
      <el-table-column
        label="女部实际预约"
        prop="reservationFemale"
        width="120px"
        align="center"
      />
      <el-table-column
        label="女部实际进入"
        prop="enteredFemale"
        align="center"
        width="120px"
      />
      <el-table-column
        label="实际预约总数"
        prop="name"
        width="120px"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.reservationMale + row.reservationFemale }}
        </template>
      </el-table-column>
      <el-table-column
        label="实际进入总数"
        align="center"
        width="120px"
      >
        <template slot-scope="{row}">
          {{ row.enteredMale + row.enteredFemale }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Statistic } from '@/api/admin'
import { parseTime } from '@/utils'
import echarts from 'echarts'

export default {
  name: 'Statistic',
  data() {
    return {
      reservations: [],
      listLoading: true,
      queryParams: {
        area: '鹏翔浴池',
        dateRange: [parseTime(new Date(new Date().getTime() - 604800000), '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')]
      },
      bathArea: ['七里台浴池', '鹏翔浴池'],
      chartInstance: null,
      chartData: {
        'reservation_male': [],
        'reservation_female': [],
        'entered_male': [],
        'entered_female': []
      },
      statistic: []
    }
  },
  mounted() {
    this.chartInstance = echarts.init(document.getElementById('chartDom'))
    this.getStatistic()
  },
  methods: {
    dataProcess(data, type) {
      data.forEach(item => {
        if (item.sex === '男') {
          this.chartData[`${type}_male`].push([`${item.date} ${item.time}`, item._count])
        } else if (item.sex === '女') {
          this.chartData[`${type}_female`].push([`${item.date} ${item.time}`, item._count])
        }
      })
    },
    /**
       * @function 获取统计信息
       */
    async getStatistic() {
      this.chartInstance.showLoading()
      this.listLoading = true
      this.chartData = {
        'reservation_male': [],
        'reservation_female': [],
        'entered_male': [],
        'entered_female': []
      }
      this.statistic = []
      const reservationResp = await Statistic.getStatistic({ ...this.queryParams, cancelled: false })
      const enteredResp = await Statistic.getStatistic({ ...this.queryParams, cancelled: false, entered: true })
      // 实际预约人数
      this.dataProcess(reservationResp, 'reservation')
      // 实际进入人数
      this.dataProcess(enteredResp, 'entered')
      this.drawChart()
      const reservationMale = new Map(this.chartData.reservation_male)
      const reservationFemale = new Map(this.chartData.reservation_female)
      const enteredMale = new Map(this.chartData.entered_male)
      const enteredFemale = new Map(this.chartData.entered_female)
      const timeData = reservationMale.size >= reservationFemale.size ? reservationMale.keys() : reservationFemale.keys()
      for (const key of timeData) {
        this.statistic.push({
          time: key,
          reservationMale: reservationMale.get(key) || 0,
          reservationFemale: reservationFemale.get(key) || 0,
          enteredMale: enteredMale.get(key) || 0,
          enteredFemale: enteredFemale.get(key) || 0
        })
      }

      // for (let i = 0; i < reservationResp.length; i++) {
      //   const reservationItem = reservationResp[i]
      //   const enteredItem = enteredResp[i]
      //   this.statistic.push({
      //     time: `${reservationItem.date} ${reservationItem.time}`,
      //     re
      //   })
      // }
      this.chartInstance.hideLoading()
      this.listLoading = false
    },
    /**
       * @function 处理关键词搜索
       */
    handleSearch() {
      this.getStatistic()
    },
    /**
       * @function 初始化图表
       */
    drawChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['男部实际预约', '女部实际预约', '男部实际进入', '女部实际进入']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category'
        }
        ],
        yAxis: [{
          type: 'value'
        }
        ],
        dataZoom: [{
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'empty'
        }, {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'empty'
        }],
        series: [
          {
            name: '男部实际预约',
            type: 'bar',
            stack: '预约',
            data: this.chartData.reservation_male
          }, {
            name: '女部实际预约',
            type: 'bar',
            stack: '预约',
            data: this.chartData.reservation_female
          }, {
            name: '男部实际进入',
            type: 'bar',
            stack: '进入',
            data: this.chartData.entered_male
          }, {
            name: '女部实际进入',
            type: 'bar',
            stack: '进入',
            data: this.chartData.entered_female
          }
        ]
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>
