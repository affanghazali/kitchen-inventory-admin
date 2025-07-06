import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    darkMode: localStorage.getItem("darkMode") === "true",
  }),
  actions: {
    toggleDark() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkMode", String(this.darkMode));
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    initTheme() {
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      if (localStorage.getItem("darkMode") === null) {
        this.darkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        localStorage.setItem("darkMode", String(this.darkMode));
      }
    },
  },
});
