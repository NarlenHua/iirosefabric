import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      // 删除所有注释，包括 license 注释
      format: {
        comments: false
      },

      compress: {
        // 删除命令台输出
        drop_console: true,
        drop_debugger: true,
        // 保留类名
        keep_classnames: true,
        // 保留函数名
        keep_fnames: true,
      }
    },
    rollupOptions: {
      input: {
        // 这里的'main'是你的入口文件名，你可以自定义  
        // main: '/index.html',
        main: '/src/main.ts',
      },
      output: {
        // chunkFileNames: '[name]-[hash].js', // 代码块命名格式，包含 hash 值  
        // assetFileNames: '[name]-[hash].[ext]', // 静态资源命名格式，包含 hash 值和原扩展名  
        entryFileNames: '[name].js', // 入口文件命名格式  
      },
    },
  },
})
