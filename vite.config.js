import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                // target: 'http://8.140.238.228:8080',
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
        },
    },
})
