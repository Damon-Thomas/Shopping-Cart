import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './tests/setup.js',
    // css: true

  },
  // resolve: {
  //   alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  // }

})
