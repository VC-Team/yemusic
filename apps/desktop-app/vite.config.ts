import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';

const pathSrc = path.resolve(__dirname, './src').replace(/\\/g, '/');

export default defineConfig({
  assetsInclude: /\.(pdf|jpg|png|svg)$/,
  resolve: {
    alias: {
      '@assets/': `${path.resolve(__dirname, './src/assets')}/`,
      '@app/': `${path.resolve(__dirname, './src/app')}/`,
      '@public/': `${path.resolve(__dirname, './src/public')}/`,
    },
  },
  publicDir: path.resolve(__dirname, './src/public'),
  plugins: [
    Vue(),
    Components({
      dirs: ['src/app/components'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ['assets/css/font', 'assets/css/global']
          .map(stylePathFile => `@import "${pathSrc}/${stylePathFile}";`)
          .join('\n'),
      },
    },
  },
});
