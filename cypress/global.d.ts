/// <reference types="Cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<string>;
      acessarMenuConta(): Chainable<void>;
      inserirConta(conta: string): Chainable<string>;
      getToken(username: string, password: string): Chainable<string>;
      resetRest(): Chainable<void>;
      xpathSaldo(nome: string): Chainable<string>;
      xpathExtrato(desc: string, value: string): Chainable<string>;
      xpathBtnAlterar(nome: string): Chainable<string>;
      xpathBtnRemoveConta(conta: string): Chainable<string>;
      resetApp(): Chainable<void>;
      getAccountByName(nome: string): Chainable<any>;
      request(originalFn: any, ...options: any): Chainable<any>;
    }
  }
}

export {};
