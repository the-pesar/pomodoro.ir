export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/styles/main.css"],
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
})
