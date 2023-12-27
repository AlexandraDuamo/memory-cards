export default defineNuxtConfig({
  devtools: { enabled: true },
  buildModules: ['nuxt-vite'],
  css: [
    '~/assets/scss/style.scss',
  ],
  server: {
    port: '3000',
    host: '127.0.0.1',
  },
  router: {
    base: '/'
  },
  routeRules: {
    '/api/character': { proxy: 'https://rickandmortyapi.com/api/character' },
    '/api/episode': { proxy: 'https://rickandmortyapi.com/api/episode' }
  },
  loaders: {
    sass: {
      implementation: require('sass'),
    },
  },
})
