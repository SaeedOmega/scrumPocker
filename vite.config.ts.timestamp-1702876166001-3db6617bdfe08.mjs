// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { telefunc } from "file:///C:/Users/admin/Desktop/MyProject/scrumPocker/node_modules/telefunc/dist/cjs/node/vite/index.js";
import { defineConfig } from "file:///C:/Users/admin/Desktop/MyProject/scrumPocker/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/admin/Desktop/MyProject/scrumPocker/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/admin/Desktop/MyProject/scrumPocker/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import windi from "file:///C:/Users/admin/Desktop/MyProject/scrumPocker/node_modules/vite-plugin-windicss/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/admin/Desktop/MyProject/scrumPocker/vite.config.ts";
var port = 3e3;
var vite_config_default = defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    windi(),
    telefunc({
      disableNamingConvention: true
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: { target: "esnext" },
  appType: "spa",
  server: { port, host: true },
  preview: { port }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEZXNrdG9wXFxcXE15UHJvamVjdFxcXFxzY3J1bVBvY2tlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYWRtaW5cXFxcRGVza3RvcFxcXFxNeVByb2plY3RcXFxcc2NydW1Qb2NrZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FkbWluL0Rlc2t0b3AvTXlQcm9qZWN0L3NjcnVtUG9ja2VyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbi8vIEB0cy1pZ25vcmVcclxuaW1wb3J0IHsgdGVsZWZ1bmMgfSBmcm9tICd0ZWxlZnVuYy92aXRlJ1xyXG5pbXBvcnQgdHlwZSB7IFVzZXJDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHdpbmRpIGZyb20gJ3ZpdGUtcGx1Z2luLXdpbmRpY3NzJ1xyXG5cclxuY29uc3QgcG9ydCA9IDMwMDBcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKHtcclxuICAgICAgc2NyaXB0OiB7XHJcbiAgICAgICAgZGVmaW5lTW9kZWw6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHdpbmRpKCksXHJcbiAgICB0ZWxlZnVuYyh7XHJcbiAgICAgIGRpc2FibGVOYW1pbmdDb252ZW50aW9uOiB0cnVlXHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7IHRhcmdldDogJ2VzbmV4dCcgfSxcclxuICBhcHBUeXBlOiAnc3BhJyxcclxuICBzZXJ2ZXI6IHsgcG9ydCwgaG9zdDogdHJ1ZSB9LFxyXG4gIHByZXZpZXc6IHsgcG9ydCB9XHJcbn0pIGFzIFVzZXJDb25maWdcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVSxTQUFTLGVBQWUsV0FBVztBQUVyVyxTQUFTLGdCQUFnQjtBQUd6QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sV0FBVztBQVJ5TCxJQUFNLDJDQUEyQztBQVU1UCxJQUFNLE9BQU87QUFHYixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixRQUFRO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AseUJBQXlCO0FBQUEsSUFDM0IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPLEVBQUUsUUFBUSxTQUFTO0FBQUEsRUFDMUIsU0FBUztBQUFBLEVBQ1QsUUFBUSxFQUFFLE1BQU0sTUFBTSxLQUFLO0FBQUEsRUFDM0IsU0FBUyxFQUFFLEtBQUs7QUFDbEIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
