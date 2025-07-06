<template>
  <div>
    <h1>📊 Budget History - {{ year }}</h1>

    <el-input-number
      v-model="year"
      :min="2000"
      :max="2100"
      @change="fetchHistory"
    />

    <el-table :data="history" style="width: 100%; margin-top: 20px" stripe>
      <el-table-column prop="month" label="Month" width="100">
        <template #default="scope">{{ monthName(scope.row.month) }}</template>
      </el-table-column>
      <el-table-column prop="budgetAmount" label="Budget Amount" />
      <el-table-column prop="totalSpent" label="Total Spent" />
      <el-table-column prop="savings" label="Savings">
        <template #default="scope">
          <span style="color: green">{{ scope.row.savings }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="overflow" label="Overflow">
        <template #default="scope">
          <span :style="{ color: scope.row.overflow > 0 ? 'red' : 'inherit' }">
            {{ scope.row.overflow }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Used %">
        <template #default="scope">
          <el-progress
            :percentage="scope.row.percentUsed"
            :status="scope.row.percentUsed > 100 ? 'exception' : 'success'"
          />
        </template>
      </el-table-column>
      <el-table-column prop="carryForward" label="Carry Forward" />
      <el-table-column prop="adjustedBudget" label="Adjusted Budget" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api/axios";

const year = ref(new Date().getFullYear());
const history = ref([]);

const fetchHistory = async () => {
  const res = await api.get(`/budget/history/${year.value}`);
  history.value = res.data;
};

const monthName = (month: number) =>
  new Date(0, month - 1).toLocaleString("default", { month: "long" });

onMounted(fetchHistory);
</script>
