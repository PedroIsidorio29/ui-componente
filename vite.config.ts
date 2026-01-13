import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: resolve(__dirname, 'src/styles/_quasar-variables.sass')
    }),
    dts({
      entryRoot: "src",
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.d.ts"],
      rollupTypes: true
    })
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "DpmgUIKit",
      fileName: "index"
    },
    rollupOptions: {
      external: ["vue", "quasar"],
      output: {
        globals: {
          vue: "Vue",
          quasar: "Quasar"
        }
      }
    }
  }
});
