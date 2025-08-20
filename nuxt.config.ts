// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ssr: false,
  devServer: {
    port: 4898,
  },
  app: {
    head: {
      title: 'ClickUp Routine GUI',
    },
  },
  runtimeConfig: {
    clickupApiKey: process.env.NUXT_CLICKUP_API_KEY,
    clickupSpaceId: process.env.NUXT_CLICKUP_SPACE_ID,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
