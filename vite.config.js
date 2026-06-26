import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const previewFrameHeaders = {
  'Content-Security-Policy': "frame-ancestors 'self' http: https:",
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: previewFrameHeaders,
  },
  preview: {
    headers: previewFrameHeaders,
  },
})
