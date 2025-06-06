import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'components-ui',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/header/Header.jsx',
        './InputTest': './src/components/input/InputTest.jsx',
        './List': './src/components/list/List.jsx'
      },
      shared: ['react']
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    allowedHosts: ['components-ui']
  },
  preview: {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization']
    },
    allowedHosts: ['components-ui', 'components-ui.davidcamelo.com']
  }
})
