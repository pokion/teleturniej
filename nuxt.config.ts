// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      websocket: true
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt','radix-vue/nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})