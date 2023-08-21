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
    cy.get('[data-test="conta"]').select("Conta para movimentacoes");
    cy.get('[data-test="status"]').click();
    cy.get(".btn-primary").click();
    cy.get(".toast-message").should("contain", "sucesso");
  });

  it("Deve pegar o saldo", () => {
    cy.get('[data-test="menu-home"]').click();
    cy.get(".toast-message").should("contain", "Bem vindo");
    cy.xpathSaldo("Conta para saldo").should("contain", "3534");
  });

  it.only("Deve remover uma movimentação", () => {
    cy.get('[data-test="menu-extrato"]').click();
    cy.xpathBtnRemoveConta("Movimentacao para exclusao").click({
      multiple: true,
    });
  });
});
