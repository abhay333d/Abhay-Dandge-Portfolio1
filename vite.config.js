import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    allowedHosts: [
      "09e3-2409-40c2-4055-4f95-ccce-5fa7-a021-eae.ngrok-free.app",
    ],
  },
});
