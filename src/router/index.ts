import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import GroceryView from '../views/GroceryView.vue'
import BudgetView from '../views/BudgetView.vue'
import UsageLogsView from '../views/UsageLogsView.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import BudgetHistoryView from '../views/BudgetHistoryView.vue'


const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    {
      path: '/',
      component: AdminLayout,
      children: [
        { path: '/dashboard', component: DashboardView },
        { path: '/grocery', component: GroceryView },
        { path: '/budget', component: BudgetView },
        { path: '/usage-logs', component: UsageLogsView },
        { path: '/budget-history', component: BudgetHistoryView },
      ]
    }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
