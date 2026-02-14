// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    './assets/css/main.css',
    'leaflet/dist/leaflet.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@ant-design-vue/nuxt'
  ],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_KEY,
    email: process.env.EMAIL_RECEIVE,
    cryptoSecrect: process.env.CRYPTO_SECRET,
    public: {
      resendApiKey: process.env.RESEND_KEY,
      email: process.env.EMAIL_RECEIVE,
      cryptoSecrect: process.env.CRYPTO_SECRET
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
  }
})