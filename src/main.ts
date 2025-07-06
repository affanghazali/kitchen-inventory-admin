import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useThemeStore } from "./store/theme";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./assets/main.css";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(Toast)
  .use(createPinia())
  .mount("#app");

const themeStore = useThemeStore();
themeStore.initTheme();
