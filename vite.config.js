/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'components-ui',
      filename: 'remoteEntry.js',
      exposes: {
        './api': './src/services/api.jsx',
        './AuthContext': './src/context/AuthContext.jsx',
        './ThemeContext': './src/context/ThemeContext.jsx',
        './Accordion': './src/components/accordion/Accordion.jsx',
        './Alert': './src/components/alert/Alert.jsx',
        './Avatar': './src/components/avatar/Avatar.jsx',
        './Badge': './src/components/badge/Badge.jsx',
        './Breadcrumbs': './src/components/breadcrumbs/Breadcrumbs.jsx',
        './Button': './src/components/button/Button.jsx',
        './Card': './src/components/card/Card.jsx',
        './Carousel': './src/components/carousel/Carousel.jsx',
        './Checkbox': './src/components/checkbox/Checkbox.jsx',
        './ConfirmationModal': './src/components/confirmation-modal/ConfirmationModal.jsx',
        './DatePicker': './src/components/date-picker/DatePicker.jsx',
        './DateTimePicker': './src/components/date-time-picker/DateTimePicker.jsx',
        './Drawer': './src/components/drawer/Drawer.jsx',
        './Footer': './src/components/footer/Footer.jsx',
        './Form': './src/components/form/Form.jsx',
        './Header': './src/components/header/Header.jsx',
        './Input': './src/components/input/Input.jsx',
        './Login': './src/components/login/Login.jsx',
        './Modal': './src/components/modal/Modal.jsx',
        './MultiSelect': './src/components/multi-select/MultiSelect.jsx',
        './Pagination': './src/components/pagination/Pagination.jsx',
        './PrivateRoute': './src/components/private-route/PrivateRoute.jsx',
        './ProgressBar': './src/components/progress-bar/ProgressBar.jsx',
        './RadioButton': './src/components/radio-button/RadioButton.jsx',
        './ResourcePage': './src/components/resource-page/ResourcePage.jsx',
        './Schedule': './src/components/schedule/Schedule.jsx',
        './Select': './src/components/select/Select.jsx',
        './SignUp': './src/components/sign-up/SignUp.jsx',
        './Spinner': './src/components/spinner/Spinner.jsx',
        './Table': './src/components/table/Table.jsx',
        './Tabs': './src/components/tabs/Tabs.jsx',
        './TimePicker': './src/components/time-picker/TimePicker.jsx',
        './Toggle': './src/components/toggle/Toggle.jsx',
        './Tooltip': './src/components/tooltip/Tooltip.jsx',
        './Uploader': './src/components/uploader/Uploader.jsx',
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
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.js']
      }
    }]
  }
});
