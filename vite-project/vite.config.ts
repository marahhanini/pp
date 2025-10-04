import tailwind from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwind(),
    Components({
      resolvers: [IconsResolver({ prefix: "i" })], // allows <i-mdi-map-outline />
    }),
    Icons({ autoInstall: true }),
  ],
});
