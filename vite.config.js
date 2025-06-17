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
        './Button': './src/components/button/Button.jsx',
        './Card': './src/components/card/Card.jsx',
        './Carousel': './src/components/carousel/Carousel.jsx',
        './Checkbox': './src/components/checkbox/Checkbox.jsx',
        './ConfirmationModal': './src/components/confirmation-modal/ConfirmationModal.jsx',
        './DatePicker': './src/components/date-picker/DatePicker.jsx',
        './DateTimePicker': './src/components/date-time-picker/DateTimePicker.jsx',
        './Form': './src/components/form/Form.jsx',
        './Header': './src/components/header/Header.jsx',
        './Input': './src/components/input/Input.jsx',
        './Modal': './src/components/modal/Modal.jsx',
        './MultiSelect': './src/components/multi-select/MultiSelect.jsx',
        './RadioButton': './src/components/radio-button/RadioButton.jsx',
        './ResourcePage': './src/components/resource-page/ResourcePage.jsx',
        './Select': './src/components/select/Select.jsx',
        './Table': './src/components/table/Table.jsx',
        './Tabs': './src/components/tabs/Tabs.jsx',
        './TimePicker': './src/components/time-picker/TimePicker.jsx',
        './Toggle': './src/components/toggle/Toggle.jsx',
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
      methods: '*',
      allowedHeaders: '*'
    },
    allowedHosts: ['components-ui', 'components-ui.davidcamelo.com']
  }
})
