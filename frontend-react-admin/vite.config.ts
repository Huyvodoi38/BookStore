import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: true,
    open: true,
  },
  build: {
    sourcemap: mode === "development",
  },
  base: "./",
}));
