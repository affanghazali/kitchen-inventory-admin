<template>
  <el-container style="min-height: 100vh">
    <el-aside width="200px">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="$router.push('/dashboard')"
          >Dashboard</el-menu-item
        >
        <el-menu-item index="2" @click="$router.push('/grocery')"
          >Grocery</el-menu-item
        >
        <el-menu-item index="3" @click="$router.push('/budget')"
          >Budget</el-menu-item
        >
        <el-menu-item index="4" @click="$router.push('/usage-logs')"
          >Usage Logs</el-menu-item
        >
        <el-menu-item @click="$router.push('/budget-history')"
          >Budget History</el-menu-item
        >
      </el-menu>
    </el-aside>

    <el-container>
      <el-header
        style="
          background: var(--el-bg-color);
          border-bottom: 1px solid var(--el-border-color);
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h2>Kitchen Inventory Admin</h2>
          <el-switch
            :model-value="themeStore.darkMode"
            active-text="🌙 Dark"
            inactive-text="☀️ Light"
            @change="themeStore.toggleDark"
          />

          <el-button type="danger" @click="logout">Logout</el-button>
        </div>
      </el-header>

      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { useThemeStore } from "../store/theme";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const themeStore = useThemeStore();
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const logout = () => {
  authStore.logout();
  toast.success("Logged out successfully!");
  router.push("/login");
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
