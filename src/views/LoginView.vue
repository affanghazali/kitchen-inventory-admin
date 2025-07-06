<template>
  <div class="login-wrapper">
    <div class="overlay"></div>
    <el-card class="login-card animate__animated animate__fadeInDown">
      <div class="logo">
        <h1>🍽️ KitchenControl</h1>
        <p class="tagline">Keep your kitchen stocked and smart</p>
      </div>

      <el-form :model="form" label-position="top">
        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="you@example.com" />
        </el-form-item>

        <el-form-item label="Password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="********"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%;"
            @click="login"
            :loading="loading"
          >
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '../api/axios'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const form = ref({ email: '', password: '' })
const loading = ref(false)

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const login = async () => {
  try {
    loading.value = true
    const res = await api.post('/auth/login', form.value)
    authStore.setAuth(res.data.token, res.data.user)
    toast.success(`Welcome back, ${res.data.user.name}!`)
    router.push('/dashboard')
  } catch (err) {
    toast.error('Login failed — please check your credentials.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(5px);
}

.login-card {
  position: relative;
  max-width: 400px;
  width: 100%;
  padding: 40px 30px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: #fff;
}

.login-card .logo {
  text-align: center;
  margin-bottom: 20px;
}

.login-card .logo h1 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

.login-card .tagline {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

html.dark .login-wrapper {
  background: linear-gradient(135deg, #1e3a8a, #6b21a8);
}

html.dark .login-card {
  background: rgba(18, 18, 18, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.el-form-item__label {
  color: #fff;
}

.el-input__inner {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
}

.el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
</style>

