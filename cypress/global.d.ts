/// <reference types="Cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<string>;
      acessarMenuConta(): Chainable<void>;
      inserirConta(conta: string): Chainable<string>;
      getToken(username: string, password: string): Chainable<string>;
      resetRest(): Chainable<void>;
    }
  }
}

export {};
