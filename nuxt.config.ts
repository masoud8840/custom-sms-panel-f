import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "notivue/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: [
    "./assets/css/main.css",
    "notivue/notification.css",
    "notivue/animations.css",
    "notivue/notification-progress.css",
  ],
  app: {
    head: {
      htmlAttrs: {
        dir: "rtl",
        lang: "fa",
      },
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: "http://localhost:3001/api/v1",
      // baseUrl: "http://81.12.41.178:81/api/v1",
    },
  },

  notivue: {
    position: "bottom-left",
    limit: 3,
    enqueue: true,
    avoidDuplicates: true,
    notifications: {
      global: {
        duration: 3000,
      },
    },
  },

  plugins: ["./plugins/dayjs.ts"],
});
