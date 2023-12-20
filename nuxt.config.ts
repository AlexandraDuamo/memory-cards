// https://nuxt.com/docs/api/configuration/nuxt-config
import {configDev} from './config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  buildModules: ['nuxt-vite'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/proxy',
    'nuxt-swiper'
  ],
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
  pinia: {
    storesDirs: ['./store/**', './store'],
  },
  loaders: {
    sass: {
      implementation: require('sass'),
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
})
