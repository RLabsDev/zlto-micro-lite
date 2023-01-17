import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { quasar, transformAssetUrls } from "@quasar/vite-plugin"
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // template: { transformAssetUrls }
    }),
    // quasar({
    //   sassVariables: 'src/quasar-variables.sass'
    // })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@config', replacement: path.resolve(__dirname, './src/config') },
      { find: '@plugins', replacement: path.resolve(__dirname, './src/plugins') },
      { find: '@views', replacement: path.resolve(__dirname, './src/views') },
      { find: '@mixins', replacement: path.resolve(__dirname, './src/mixins') },
      { find: '@svg', replacement: path.resolve(__dirname, './src/svg') },
      { find: '@models', replacement: path.resolve(__dirname, './src/models') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
    ],
  },
});
