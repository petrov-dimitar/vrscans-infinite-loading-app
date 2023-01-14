import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  env: {
    REACT_APP_BASE_URL: 'http://localhost:3030'
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  }
});
