import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/forminator/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
