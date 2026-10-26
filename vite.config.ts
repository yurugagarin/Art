import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' sayesinde uygulama GitHub Pages'te alt klasörde (/Art/) de çalışır.
export default defineConfig({
  base: './',
  plugins: [react()],
})
