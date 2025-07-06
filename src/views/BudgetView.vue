<template>
  <div>
    <h2>💰 Monthly Budget</h2>

    <el-row :gutter="20">
      <!-- SET BUDGET FORM -->
      <el-col :xs="24" :md="10" v-if="showForm">
        <transition name="fade-slide">
          <el-card class="budget-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3>Set Budget</h3>
              <el-button type="text" @click="showForm = false">⇆</el-button>
            </div>

            <el-form :model="form">
              <el-form-item label="Month">
                <el-input-number v-model="form.month" :min="1" :max="12" />
              </el-form-item>
              <el-form-item label="Year">
                <el-input-number v-model="form.year" :min="2000" :max="2100" />
              </el-form-item>
              <el-form-item label="Budget Amount">
                <el-input-number v-model="form.budgetAmount" :min="0" />
              </el-form-item>

              <el-button type="primary" @click="saveBudget">Save Budget</el-button>
            </el-form>
          </el-card>
        </transition>
      </el-col>

      <!-- CURRENT BUDGET PANEL -->
      <el-col :xs="24" :md="14" v-if="showDetails">
        <transition name="fade-slide">
          <el-card class="budget-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3>Current Budget</h3>
              <el-button type="text" @click="showDetails = false">⇆</el-button>
            </div>

            <el-descriptions title="This Month" :column="1" border>
              <el-descriptions-item label="Month">{{ current?.month }}</el-descriptions-item>
              <el-descriptions-item label="Year">{{ current?.year }}</el-descriptions-item>
              <el-descriptions-item label="Amount">{{ current?.budgetAmount }}</el-descriptions-item>
              <el-descriptions-item label="Spent">{{ current?.totalSpent }}</el-descriptions-item>
              <el-descriptions-item label="Remaining">
                {{ current?.budgetAmount - current?.totalSpent }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </transition>
      </el-col>
    </el-row>

    <!-- Toggle buttons -->
    <div style="margin-top: 20px;">
      <el-button v-if="!showForm" @click="showForm = true">Show Form</el-button>
      <el-button v-if="!showDetails" @click="showDetails = true">Show Details</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { ElMessage } from 'element-plus'

const showForm = ref(true)
const showDetails = ref(true)

const form = ref({
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  budgetAmount: 0
})

const current = ref(null)

const fetchCurrent = async () => {
  const res = await api.get('/budget/current')
  current.value = res.data
}

const saveBudget = async () => {
  await api.post('/budget', form.value)
  ElMessage.success('Budget set!')
  fetchCurrent()
}

onMounted(fetchCurrent)
</script>

<style scoped>
.budget-card {
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
