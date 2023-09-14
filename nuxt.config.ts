export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools', '@pinia/nuxt'],
  css: ['~/assets/styles/main.css'],
  plugins: [
    { src: '~/plugins/vercel.ts', mode: 'client' },
    { src: '~/plugins/directives.ts' },
  ],
  devtools: {
    enabled: true,
  },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },
})
