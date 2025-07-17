import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    allowedHosts: ["c794-103-226-146-116.ngrok-free.app"],
    open: true,
  },
});
