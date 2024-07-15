import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'script.js',
      name: 'rektive',
      fileName: (format) => `rektive.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
