describe("Inserir nova conta", () => {
  before(() => {
    cy.visit("/");
    cy.login("rocha@gmail.com", "alana123");
    cy.resetApp();
  });

  it("Deve criar uma conta", () => {
    cy.acessarMenuConta();
    cy.inserirConta("Conta Alana");
    cy.get(".toast-message").should("contain", "Conta inserida com sucesso");
  });

  it("Deve alterar uma conta", () => {
    cy.acessarMenuConta();
    cy.get('[data-test="nome"]').type("Conta Alana");
    cy.get(".fa-edit").then(($el) => {
      const lastFar = $el.last();
      if (lastFar) {
        cy.wrap(lastFar).click();
        cy.get('[data-test="nome"]').clear().type("Conta alterada");
        cy.get(".btn").click();
        cy.get(".toast-message").should(
          "contain",
          "Conta atualizada com sucesso!"
        );
      }
    });
  });

  //   it("Não deve criar uma conta com o mesmo nome", () => {
  //     cy.acessarMenuConta();
  //     cy.get('[data-test="nome"]').clear().type("Conta mesmo nome");
  //     cy.get(".btn").click();
  //     cy.get(".toast-message").should("contain", "code 400");
  //   });
});
