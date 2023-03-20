export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  css: ["~/assets/styles/main.css"],
  pwa: {
    manifest: {
      name: "pomodoro",
      short_name: "pmdr",
      description: "desc...",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    workbox: { navigateFallback: "/" },
    devOptions: { enabled: true, type: "module" },
  },
})
