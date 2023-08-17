import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "oxcrcy",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://barrigareact.wcaquino.me/",
    defaultCommandTimeout: 15000,
  },
});
