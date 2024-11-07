// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  nitro: {
    experimental: {
      websocket: true,
      database: true
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'radix-vue/nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode'
  ],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})