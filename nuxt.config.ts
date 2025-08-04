import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./assets/css/main.css"],
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

  plugins: ["./plugins/dayjs.ts"],
});
