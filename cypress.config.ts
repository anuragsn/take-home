import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // The base URL of your Next.js app
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
