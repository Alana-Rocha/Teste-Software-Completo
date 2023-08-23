Cypress.Commands.add("login", (username: string, password: string) => {
  cy.get('[data-test="email"]').type(username);
  cy.get('[data-test="passwd"]').type(password);
  cy.get(".btn").click();
});

Cypress.Commands.add("acessarMenuConta", () => {
  cy.get('[data-test="menu-settings"]').click();
  cy.get('[href="/contas"]').click();
});

Cypress.Commands.add("inserirConta", (conta: string) => {
  cy.get('[data-test="nome"]').type(conta);
  cy.get(".btn").click();
});



Cypress.Commands.add("resetApp", () => {
  cy.get("[data-test=menu-settings]").click();
  cy.get('[href="/reset"]').click();
});
