import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Load environment variables
  console.log(env);
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate", // Ensures service worker updates automatically
        manifest: {
          name: "Depa Track",
          short_name: "DepaTrack",
          description: "Todas tus visitas a departamentos en un solo lugar",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "./images/icons/icon-48x48.png",
              sizes: "48x48",
              type: "image/png",
            },
            {
              src: "/images/icons/icon-72x72.png",
              sizes: "72x72",
              type: "image/png",
            },
            {
              src: "/images/icons/icon-96x96.png",
              sizes: "96x96",
              type: "image/png",
            },
            {
              src: "/images/icons/icon-128x128.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: "./images/icons/icon-144x144.png",
              sizes: "144x144",
              type: "image/png",
            },
            {
              src: "./images/icons/icon-152x152.png",
              sizes: "152x152",
              type: "image/png",
            },
            {
              src: "./images/icons/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/images/icons/icon-256x256.png",
              sizes: "256x256",
              type: "image/png",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,svg,ico}"], // Caches static assets
        },
        devOptions: {
          enabled: true, // Enable PWA during development
        },
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      hmr: {
        overlay: true,
      },
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
