describe("Inserir nova conta", () => {
  before(() => {
    cy.visit("/");
    cy.login("rocha@gmail.com", "alana123");
  });
  it("Deve criar uma transação", () => {
    cy.get('[data-test="menu-movimentacao"]').click();
    cy.get("#descricao").type("Desc");
    cy.get('[data-test="valor"]').type("150.45");
    cy.get("#envolvido").type("Inter");
    cy.get('[data-test="status"]').click()
    cy.get(".btn-primary").click();
    cy.get(".toast-message").should("contain", "sucesso");
  });

  it('Deve pegar o saldo', () => {
    cy.get('[data-test="menu-movimentacao"]').click()
  })
});
