import react from '@vitejs/plugin-react'
// import { resolve } from 'path'
import { defineConfig } from 'vite'

// const root = resolve(__dirname, 'src')
// const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis',
  },
  base: "/",
  resolve: {
    alias: {
      process: 'process/browser',
      util: 'util',
    },
  },

  plugins: [react()],

})

  // root,

  // build: {
  //   outDir,
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: resolve(root, 'index.html'),
  //       about: resolve(root, 'about', 'index.html')
  //     }
  //   }
  // }
