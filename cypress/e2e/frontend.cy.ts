// describe("Teste funcional de login", () => {
//   after(() => {
//     cy.clearLocalStorage();
//   });

import buildEnv from "../support/buildEnv";

//   before(() => {
//     cy.intercept(
//       {
//         method: "POST",
//         url: "https://barrigarest.wcaquino.me/signin",
//       },
//       {
//         fixture: "login.json",
//       }
//     ).as("signin");

//     cy.intercept(
//       {
//         method: "GET",
//         url: "https://barrigarest.wcaquino.me/saldo",
//       },
//       {
//         fixture: "saldo.json",
//       }
//     ).as("saldo");

//     cy.intercept(
//       {
//         method: "GET",
//         url: "https://barrigarest.wcaquino.me/contas",
//       },
//       {
//         fixture: "contas.json",
//       }
//     ).as("contas");

//     cy.visit("/");
//     cy.loginFast("rocha@gmail.com", "a");
//   });

//   beforeEach(() => {
//     cy.get("[data-test=menu-home]").click();
//   });

//   it("Deve criar uma conta", () => {
//     cy.acessarMenuConta();
//     cy.inserirConta("Conta de teste");
//     cy.get(".toast-message").should("contain", "Erro");
//   });

//   it.skip("Deve alterar uma conta", () => {
//     cy.acessarMenuConta();
//     cy.xpathBtnAlterar("Conta para alterar").click();
//     cy.get("[data-test=nome]").clear().type("Conta alterada");
//     cy.get(".btn").click();
//     cy.get(".toast-message").should("contain", "Conta atualizada com sucesso");
//   });

//   it.skip("Deve criar uma transação", () => {
//     cy.get('[data-test="menu-movimentacao"]').click();
//     cy.get("#descricao").type("Desc");
//     cy.get('[data-test="valor"]').type("150.45");
//     cy.get("#envolvido").type("Inter");
//     cy.get('[data-test="conta"]').select("Conta para movimentacoes");
//     cy.get('[data-test="status"]').click();
//     cy.get(".btn-primary").click();
//     cy.get(".toast-message").should("contain", "sucesso");
//   });

//   it("Deve pegar o saldo", () => {
//     cy.get('[data-test="menu-home"]').click();
//     cy.get(".toast-message").should("contain", "Bem vindo");
//     cy.xpathSaldo("Conta para saldo").should("contain", "534");
//   });

//   it("Deve remover uma movimentação", () => {
//     cy.get('[data-test="menu-extrato"]').click();
//     cy.xpathBtnRemoveConta("Movimentacao para exclusao").click({
//       multiple: true,
//     });
//   });
// });

describe("Should test at a functional level", () => {
  //   //   before(() => {
  //   //     cy.visit("/");
  //   //     cy.login("rocha@gmail.com", "alana123");
  //   //   });
  after(() => {
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    buildEnv();
    cy.visit("/");
    cy.login("rocha@gmail.com", "teste");
    //cy.resetRest();
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

  it.only("Should create a transaction", () => {
    cy.intercept(
      {
        method: "POST",
        url: "https://barrigarest.wcaquino.me/transacoes",
      },
      {
        fixture: "transacoes.json",
      }
    );

    // cy.intercept(
    //   {
    //     method: "GET",
    //     url: "https://barrigarest.wcaquino.me/extrato/**",
    //   },
    //   {
    //     fixture: "movimentacaoSalva.json",
    //   }
    // );

    cy.get("[data-test=menu-movimentacao]").click();
    cy.get("[data-test=descricao]").type("Desc");
    cy.get("[data-test=valor]").type("123");
    cy.get("[data-test=envolvido]").type("Inter");
    cy.get("[data-test=conta]").select("Banco");
    cy.get("[data-test=status]").click();
    cy.get(".btn-primary").click();
    cy.get(".toast-message").should("contain", "sucesso");
    cy.get(".list-group > li").should("have.length", 7);
    cy.xpathExtrato("Desc", "123").should("exist");
  });

  // it.only("Should get balance", () => {
  //   cy.intercept(
  //     {
  //       method: "GET",
  //       url: "https://barrigarest.wcaquino.me/transacoes/**",
  //     },
  //     {
  //       fixture: "transacoes.json",
  //     }
  //   );

  //   cy.intercept(
  //     {
  //       method: "PUT",
  //       url: "https://barrigarest.wcaquino.me/transacoes/**",
  //     },
  //     {
  //       fixture: "transacoes.json",
  //     }
  //   );

  //   cy.get("[data-test=menu-home]").click();
  //   cy.xpathSaldo("Carteira").should("contain", "100.000,00");
  //   cy.get("[data-test=menu-extrato]").click();
  //   cy.xpathAlterarElemento("Movimentacao 1, calculo saldo").click();
  //   cy.get("[data-test=descricao]").should(
  //     "have.value",
  //     "Movimentacao 1, calculo saldo"
  //   );
  //   cy.get("[data-test=status]").click();
  //   cy.get(".btn-primary").click();
  //   cy.get(".toast-message").should("contain", "sucesso");

  //   cy.intercept(
  //     {
  //       method: "GET",
  //       url: "https://barrigarest.wcaquino.me/saldo",
  //     },
  //     {
  //       fixture: "carteira-transacao.json",
  //     }
  //   ).as("saldoFinal");

  //   cy.get("[data-test=menu-home]").click();
  //   cy.xpathSaldo("Conta para saldo").should("contain", "4034,00");
  // });

  // it("Should remove a transaction", () => {
  //   cy.get("[data-test=menu-extrato]").click();
  //   cy.xpathBtnRemoveElemento("Movimentacao para exclusao").click();
  //   cy.get(".toast-message").should("contain", "sucesso");
  // });
});
