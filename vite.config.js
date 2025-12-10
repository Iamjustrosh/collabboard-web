import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "vite-plugin-mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx(),
  ],
});
