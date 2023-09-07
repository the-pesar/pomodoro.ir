export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools'],
  css: ['~/assets/styles/main.css'],
  plugins: [
    { src: '~/plugins/vercel.ts', mode: 'client' },
    { src: '~/plugins/directives.ts' },
  ],
  devtools: {
    enabled: true,
  },
})
