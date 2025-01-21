import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  preview: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 4173,      // Default port for preview mode
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
