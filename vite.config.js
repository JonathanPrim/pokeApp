import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        background_color: 'grey',
        display: 'standalone',
        icons: [
          {
            purpose: 'any',
            sizes: '192x192',
            src: 'manifest-icon-192.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'maskable',
            sizes: '192x192',
            src: 'manifest-icon-192.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'manifest-icon-512.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'manifest-icon-512.maskable.png',
            type: 'image/png'
          }
        ],
        name: `PokemonWebsiteTest`,
        short_name: 'PokeTester',
        start_url: '.',
        theme_color: '#ff3300'
      },
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            handler: 'NetworkFirst',
            urlPattern: 'https://pokeapi.co/api/v2/pokemon/'
          },
          {
            handler: 'NetworkFirst',
            urlPattern:
              /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/[0-9a-z-_.]+\/?/
          }
        ],
        globPatterns: [
          'assets/**',
          'index.html',
          'manifest.webmanifest'
        ]
      }
    }),
    vue()
  ]
})
