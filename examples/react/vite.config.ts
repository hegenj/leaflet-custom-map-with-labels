import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ez az "átirányítás"
      "@leaflet-custom/map-with-labels": path.resolve(
        __dirname,
        "../../dist/index.js",
      ),
    },
  },
});
