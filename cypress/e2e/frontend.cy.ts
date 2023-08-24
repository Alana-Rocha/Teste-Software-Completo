import buildEnv from "../support/buildEnv";

describe("Should test at a functional level", () => {
  after(() => {
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    buildEnv();
    cy.visit("/");
    cy.login("rocha@gmail.com", "teste");
    cy.resetRest();
    cy.get("[data-test=menu-home]").click();
  });

  it("Should create an account", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        fixture: "contas.json",
      }
    ).as("SaveContas");

    cy.acessarMenuConta();

    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        fixture: "contas.json",
      }
    ).as("contasSave");

    cy.inserirConta("Conta de teste");
    cy.get(".toast-message").should("contain", "Erro");
  });

  it("Should update an account", () => {
    cy.intercept(
      {
        method: "PUT",
        url: "https://barrigarest.wcaquino.me/contas/**",
      },
      {
        fixture: "conta-alterada.json",
      }
    ).as("contaAlt");

    cy.acessarMenuConta();
    cy.xpathBtnAlterar("Banco").click();
    cy.get("[data-test=nome]").clear().type("Conta alterada");
    cy.get(".btn").click();
    cy.get(".toast-message").should("contain", "Conta atualizada com sucesso");
  });

  it("Should not create an account with same name", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        fixture: "response.json",
        statusCode: 400,
      }
    ).as("SaveContasMesmoNome");

    cy.acessarMenuConta();

    cy.get("[data-test=nome]").type("Conta mesmo nome");
    cy.get(".btn").click();
    cy.get(".toast-message").should("contain", "code 400");
  });

  it("Should create a transaction", () => {
    cy.intercept(
      {
        method: "POST",
        url: "https://barrigarest.wcaquino.me/transacoes",
      },
      {
        fixture: "transacoes.json",
      }
    );

    cy.get("[data-test=menu-movimentacao]").click();
    cy.get("[data-test=descricao]").type("Desc");
    cy.get("[data-test=valor]").type("123");
    cy.get("[data-test=envolvido]").type("Inter");
    cy.get("[data-test=conta]").select("Banco");
    cy.get("[data-test=status]").click();
    cy.get(".btn-primary").click();
    cy.get(".toast-message").should("contain", "sucesso");

    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/extrato/**",
      },
      {
        fixture: "extrato.json",
      }
    );

    cy.get(".list-group > li").should("have.length", 7);
    cy.xpathExtrato("Desc", "123").should("exist");
  });

  it("Should get balance", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/transacoes/**",
      },
      {
        fixture: "newTransacao.json",
      }
    );

    cy.intercept(
      {
        method: "PUT",
        url: "https://barrigarest.wcaquino.me/transacoes/**",
      },
      {
        fixture: "newTransacao.json",
      }
    );

    cy.get("[data-test=menu-home]").click();
    cy.xpathSaldo("Carteira").should("contain", "100.000,00");
    cy.get("[data-test=menu-extrato]").click();
    cy.xpathAlterarElemento("Movimentacao 1, calculo saldo").click();
    cy.get("[data-test=descricao]").should(
      "have.value",
      "Movimentacao 1, calculo saldo"
    );
    cy.get("[data-test=status]").click();
    cy.get(".btn-primary").click();
    cy.get(".toast-message").should("contain", "sucesso");

    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/saldo",
      },
      {
        fixture: "newSaldo.json",
      }
    ).as("saldoFinal");

    cy.get("[data-test=menu-home]").click();
    cy.xpathSaldo("Conta para saldo").should("contain", "4.034.00");
  });

  it("Should remove a transaction", () => {
    cy.intercept(
      {
        method: "DELETE",
        url: "https://barrigarest.wcaquino.me/transacoes/**",
      },
      {
        statusCode: 204,
      }
    ).as("del");

    cy.get("[data-test=menu-extrato]").click();
    cy.xpathBtnRemoveElemento("Movimentacao para exclusao").click();
    cy.get(".toast-message").should("contain", "sucesso");
  });

  // -> Validando Dados <- //

  it.only("Should validate data send to create an account", () => {
    cy.intercept(
      {
        method: "POST",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        fixture: "contas.json",
      }
    ).as("SaveContas");

    cy.acessarMenuConta();

    cy.intercept(

      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        fixture: "contas.json",
      }
    ).as("contasSave");

    cy.inserirConta("{CONTROL}");
    //cy.wait("@contasSave").its("request.body").should("not.be.empty");
    cy.get(".toast-message").should("contain", "sucesso");
  });
});
