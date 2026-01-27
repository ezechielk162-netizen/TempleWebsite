// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    './assets/css/main.css'
  ],
  modules: [
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@ant-design-vue/nuxt'
  ],
  runtimeConfig: {
    public: {
    },
  },
  i18n: {
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix',
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      redirectOn: 'root'
    }
  },
  fonts: {
    families: [
      {
        name: "Poppins",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
        styles: ["normal"],
        display: "swap"
      }
    ]
  }
})