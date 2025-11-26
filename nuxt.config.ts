// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/css/main.css',       // DOĞRU (Tilde ile başlar)
    '~/assets/css/animations.css'  // DOĞRU (Tilde ile başlar)
  ],
})