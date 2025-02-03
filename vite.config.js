import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue2(), tailwindcss()],
});
