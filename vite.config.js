import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'components-ui',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/header/Header.jsx',
        './Button': './src/components/button/Button.jsx',
        './Input': './src/components/input/Input.jsx',
        './Modal': './src/components/modal/Modal.jsx',
        './ConfirmationModal': './src/components/modal/ConfirmationModal.jsx',
        './Table': './src/components/table/Table.jsx',
        './Form': './src/components/form/Form.jsx',
        './Tabs': './src/components/tabs/Tabs.jsx',
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
      origin: ['*'],
      methods: ['*'],
      allowedHeaders: ['*']
    },
    allowedHosts: ['components-ui', 'components-ui.davidcamelo.com']
  }
})
