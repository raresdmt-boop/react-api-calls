import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const proxy = {
  "/users-api": { target: "http://localhost:8111", rewrite: (path: string) => path.replace(/^\/users-api/, "") },
  "/jobs-api": { target: "http://localhost:8107", rewrite: (path: string) => path.replace(/^\/jobs-api/, "") },
  "/shop-api": { target: "http://localhost:8104", rewrite: (path: string) => path.replace(/^\/shop-api/, "") },
  "/school-api": { target: "http://localhost:8105", rewrite: (path: string) => path.replace(/^\/school-api/, "") },
};

export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
});
