<template>
  <router-view />
</template>

<script setup lang="ts">
import { useThemeStore } from './store/theme'

const themeStore = useThemeStore()
themeStore.initTheme()
</script>

<style>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  background: var(--el-bg-color);
  color: var(--el-text-color-primary);
  transition: background 0.3s ease, color 0.3s ease;
}

html.dark body {
  background: #121212;
  color: #f0f0f0;
}
</style>
