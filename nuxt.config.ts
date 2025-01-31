// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
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
    '@nuxtjs/color-mode',
    'nuxt-file-storage',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
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
  },
  fileStorage: {
    mount: process.cwd()
  },
  imports: {
    dirs: ['stores']
  }
})