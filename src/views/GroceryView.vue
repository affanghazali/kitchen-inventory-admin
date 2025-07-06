<template>
  <div>
    <h2>🍗 Grocery Items</h2>

    <el-row :gutter="20">
      <!-- ADD ITEM PANEL -->
      <el-col :xs="24" :md="10" v-if="showForm">
        <transition name="fade-slide">
          <el-card>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3>Add New Item</h3>
              <el-button type="text" @click="showForm = false">
                ⇆
              </el-button>
            </div>

            <el-form :model="form">
              <el-form-item label="Name">
                <el-input v-model="form.name" placeholder="e.g. Rice" />
              </el-form-item>

              <el-form-item label="Category">
                <el-input v-model="form.category" placeholder="e.g. Grains" />
              </el-form-item>

              <el-form-item label="Unit">
                <el-input v-model="form.unit" placeholder="e.g. kg" />
              </el-form-item>

              <el-form-item label="Quantity">
                <el-input-number v-model="form.quantity" :min="0" />
              </el-form-item>

              <el-form-item label="Unit Price">
                <el-input-number v-model="form.unitPrice" :min="0" />
              </el-form-item>

              <el-form-item label="Threshold">
                <el-input-number v-model="form.threshold" :min="0" />
              </el-form-item>

              <el-button type="primary" @click="addItem">Add Item</el-button>
            </el-form>
          </el-card>
        </transition>
      </el-col>

      <!-- ITEMS LIST PANEL -->
      <el-col :xs="24" :md="14" v-if="showList">
        <transition name="fade-slide">
          <el-card>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3>Item List</h3>
              <el-button type="text" @click="showList = false">
                ⇆
              </el-button>
            </div>

            <el-table :data="items" style="width: 100%">
              <el-table-column prop="name" label="Name" />
              <el-table-column prop="category" label="Category" />
              <el-table-column prop="quantity" label="Quantity" />
              <el-table-column prop="unitPrice" label="Unit Price" />
              <el-table-column prop="threshold" label="Threshold" />
              <el-table-column label="Actions">
                <template #default="scope">
                  <el-button type="danger" size="small" @click="deleteItem(scope.row._id)">
                    Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </transition>
      </el-col>
    </el-row>

    <!-- Show toggle buttons if any panel is hidden -->
    <div style="margin-top: 20px;">
      <el-button v-if="!showForm" @click="showForm = true">Show Add Form</el-button>
      <el-button v-if="!showList" @click="showList = true">Show Items</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { ElMessage } from 'element-plus'

const form = ref({
  name: '',
  category: '',
  unit: '',
  quantity: 0,
  unitPrice: 0,
  threshold: 0
})

const items = ref([])

const showForm = ref(true)
const showList = ref(true)

const fetchItems = async () => {
  const res = await api.get('/grocery')
  items.value = res.data
}

const addItem = async () => {
  await api.post('/grocery', form.value)
  ElMessage.success('Item added!')
  form.value = { name: '', category: '', unit: '', quantity: 0, unitPrice: 0, threshold: 0 }
  fetchItems()
}

const deleteItem = async (id: string) => {
  await api.delete(`/grocery/${id}`)
  ElMessage.success('Item deleted!')
  fetchItems()
}

onMounted(fetchItems)
</script>

<style scoped>
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
