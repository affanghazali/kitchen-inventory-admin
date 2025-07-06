<template>
  <div>
    <h1>🏠 Dashboard</h1>

    <el-card class="stat-cards">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>💰 Total Budget: {{ summary.totalBudget }}</el-card>
        </el-col>
        <el-col :span="8">
          <el-card>📉 Total Spent: {{ summary.totalSpent }}</el-card>
        </el-col>
        <el-col :span="8">
          <el-card>✅ Total Savings: {{ summary.totalSavings }}</el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <v-chart :option="barOption" style="height: 400px;" />
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <v-chart :option="pieOption" style="height: 400px;" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../api/axios'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const summary = ref({ totalBudget: 0, totalSpent: 0, totalSavings: 0, trend: [] })
const barOption = ref({})
const pieOption = ref({})

const year = new Date().getFullYear()

const fetchSummary = async () => {
  const res = await api.get(`/budget/summary/${year}`)
  summary.value = res.data
  updateCharts()
}

const updateCharts = () => {
  barOption.value = {
    title: { text: `Monthly Spend Trend (${year})` },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: summary.value.trend.map(item => new Date(0, item.month - 1).toLocaleString('default', { month: 'short' }))
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Spent',
        type: 'bar',
        data: summary.value.trend.map(item => item.totalSpent),
        itemStyle: { color: '#409EFF' }
      }
    ]
  }

  pieOption.value = {
    title: { text: `Budget vs Spent vs Savings (${year})` },
    tooltip: { trigger: 'item' },
    legend: { top: '5%', left: 'center' },
    series: [
      {
        name: 'Budget Breakdown',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
        labelLine: { show: false },
        data: [
          { value: summary.value.totalSpent, name: 'Spent' },
          { value: summary.value.totalSavings, name: 'Savings' }
        ]
      }
    ]
  }
}

onMounted(fetchSummary)
</script>

<style scoped>
.stat-cards .el-card {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
</style>
