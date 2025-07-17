import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    allowedHosts: ["f476df492bd8.ngrok-free.app"],
    open: true,
  },
});
