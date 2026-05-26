import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Standalone SPA build for cPanel / static hosting.
// Output: dist-static/ (single folder with index.html + assets/)
// Usage:  bun run build:static
// Then upload everything inside dist-static/ to your cPanel public_html/.
export default defineConfig({
  root: path.resolve(__dirname, "static-app"),
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "dist-static"),
    emptyOutDir: true,
  },
});
