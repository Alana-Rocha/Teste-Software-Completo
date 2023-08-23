describe("Should test at a functional level", () => {
  //   before(() => {
  //     cy.visit("/");
  //     cy.login("rocha@gmail.com", "alana123");
  //   });

  beforeEach(() => {
    cy.visit("/");
    cy.login("rocha@gmail.com", "alana123");
    cy.resetRest();
    cy.get("[data-test=menu-home]").click();
  });

  it("Should create an account", () => {
    cy.acessarMenuConta();
    cy.inserirConta("Conta de teste");
    cy.get(".toast-message").should("contain", "Conta inserida com sucesso");
  });

  it("Should update an account", () => {
    // cy.get(':nth-child(7) > :nth-child(2) > .fa-edit')
    cy.acessarMenuConta();
    cy.xpathBtnAlterar("Conta para alterar").click();
    cy.get("[data-test=nome]").clear().type("Conta alterada");
    cy.get(".btn").click();
    cy.get(".toast-message").should("contain", "Conta atualizada com sucesso");
  });

  it("Should not create an account with same name", () => {
    cy.acessarMenuConta();

    cy.get("[data-test=nome]").type("Conta mesmo nome");
    cy.get(".btn").click();
    cy.get(".toast-message").should("contain", "code 400");
  });

  it("Should create a transaction", () => {
    cy.get("[data-test=menu-movimentacao]").click();
    cy.get("[data-test=descricao]").type("Desc");
    cy.get("[data-test=valor]").type("123");
    cy.get("[data-test=envolvido]").type("Inter");
    cy.get("[data-test=conta]").select("Conta para movimentacoes");
    cy.get("[data-test=status]").click();
    cy.get(".btn-primary").click();
    cy.get(".toast-message").should("contain", "sucesso");
    cy.get(".list-group > li").should("have.length", 7);
    cy.xpathExtrato("Desc", "123").should("exist");
  });

  it("Should get balance", () => {
    cy.get("[data-test=menu-home]").click();
    cy.xpathSaldo("Conta para saldo").should("contain", "534,00");
    cy.get("[data-test=menu-extrato]").click();
    cy.xpathAlterarElemento("Movimentacao 1, calculo saldo").click();
    // cy.wait(1000)
    cy.get("[data-test=descricao]").should(
      "have.value",
      "Movimentacao 1, calculo saldo"
    );
    cy.get("[data-test=status]").click();
    cy.get(".btn-primary").click();
    cy.get(".toast-message").should("contain", "sucesso");
    cy.get("[data-test=menu-home]").click();
    cy.xpathSaldo("Conta para saldo").should("contain", "4.034,00");
  });
  
  it("Should remove a transaction", () => {
    cy.get("[data-test=menu-extrato]").click();
    cy.xpathBtnRemoveElemento("Movimentacao para exclusao").click();
    cy.get(".toast-message").should("contain", "sucesso");
  });
});
