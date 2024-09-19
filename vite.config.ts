import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const target = "http://192.168.31.41:8060";
// const target = "http://192.168.31.41:8080";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [react()],
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./src/test/setup.ts",
  //   // you might want to disable it, if you don't have tests that rely on CSS
  //   // since parsing CSS is slow
  //   css: true,
  // },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: target,
        changeOrigin: true,
      },
      "/open": {
        target: target,
        changeOrigin: true,
      },
    },
  },
});
