import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'FluxIcons',
      fileName: (format) => `flux-icons.${format}.js`
    },
    rollupOptions: {
      // Vue'yi paketin içine GÖMME. Kullanıcının projesindeki Vue'yu kullansın.
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    outDir: 'dist-lib', // Çıktılar bu klasöre gidecek
    emptyOutDir: true
  }
});