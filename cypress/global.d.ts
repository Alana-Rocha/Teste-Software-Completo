/// <reference types="Cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      acessarMenuConta(): Chainable<void>;
      inserirConta(conta: string): Chainable<void>;
    }
  }
}

export {};
