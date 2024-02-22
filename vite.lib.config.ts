// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path' // npm i -D @types/node
import dts from 'vite-plugin-dts' // npm i -D vite-plugin-dts

export default defineConfig({
    build: {
        emptyOutDir: true,
        minify: false,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/lib/t-drawer.ts'),
            name: 'tdrawer',
            fileName: "t-drawer",
            // fileName: (format) => `index.${format}.js`,
            formats: ['es', 'umd', 'cjs', 'iife'],
            
        },
        rollupOptions: {
            output: {
                assetFileNames: "t-drawer.[ext]",
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    plugins: [dts({
        rollupTypes: true,
    })]
})