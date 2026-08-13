import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import electron from "vite-plugin-electron/simple";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: "src/main/main.ts",
      },
      preload: {
        input: "src/preload/preload.ts",
      },
      renderer: {},
    }),
    react(),
    tailwindcss(),
    svgr(),
  ],
});
