export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  css: ["~/assets/styles/main.css"],
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
})
