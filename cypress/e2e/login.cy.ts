describe("Teste funcional de login", () => {
  before(() => {
    cy.visit("/");
    cy.login("rocha@gmail.com", "alana123");
  });

  it("Deve realizar o login", () => {
    cy.get(".toast-message").should("exist");
    cy.get(".toast-message").should("contain", "Bem vindo");
  });
});
