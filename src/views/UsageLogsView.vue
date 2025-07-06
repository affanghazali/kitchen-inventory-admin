<template>
  <div>
    <h1>📑 Usage Logs</h1>

    <el-card>
      <el-table
        v-if="logs.length"
        :data="logs"
        style="width: 100%;"
        stripe
        highlight-current-row
      >
        <el-table-column prop="groceryItemId.name" label="Item" width="200" />
        <el-table-column prop="quantityUsed" label="Quantity Used" width="150" />
        <el-table-column
          label="Used By"
          width="200"
        >
          <template #default="scope">
            {{ scope.row.usedBy?.name || 'Unknown' }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="Date" width="250">
          <template #default="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>
      </el-table>

      <div v-else style="text-align: center; padding: 40px;">
        <el-empty description="No usage logs yet." />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const logs = ref([])

const fetchLogs = async () => {
  const res = await api.get('/usage/logs')
  logs.value = res.data
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleString()
}

onMounted(fetchLogs)
</script>
