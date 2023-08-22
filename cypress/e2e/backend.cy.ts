import { DateTime } from "luxon";

describe("Should test at a functional level", () => {
  //et token: string;

  before(() => {
    cy.getToken("rocha@gmail.com", "alana123")
    //.then((tkn) => {
    //token = tkn;
    //});
  });

  beforeEach(() => {
    cy.resetRest();
  });

  it("Should create an account", () => {
    cy.request({
      url: "https://barrigarest.wcaquino.me/contas",
      method: "POST",
      //headers: { Authorization: `JWT ${token}` },
      body: { nome: "Conta via rest" },
      failOnStatusCode: false,
    }).as("response");

    cy.get("@response").then((res: any) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", "Conta via rest");
    });
  });

  it("Should update an account", () => {
    cy.request({
      method: "GET",
      url: "https://barrigarest.wcaquino.me/contas",
      //headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: "conta alana alterada",
      },
    }).then((res: any) => {
      cy.request({
        url: `https://barrigarest.wcaquino.me/contas/${res.body[0]?.id}`,
        method: "PUT",
        //headers: { Authorization: `JWT ${token}` },
        body: {
          nome: "conta alana alterada dnv",
        },
        failOnStatusCode: false,
      }).as("response");
    });

    cy.get("@response").its("status").should("be.equal", 500);
  });

  it("Should not create an account with same name", () => {
    cy.request({
      url: "https://barrigarest.wcaquino.me/contas",
      method: "POST",
      //headers: { Authorization: `JWT ${token}` },
      body: {
        nome: "Conta mesmo nome",
      },
      failOnStatusCode: false,
    }).as("response");

    cy.get("@response").then((res: any) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!");
    });
  });

  it("Should create a transaction", () => {
    cy.getAccountByName("Conta para movimentacoes").then((contaId) => {
      cy.request({
        method: "POST",
        url: "https://barrigarest.wcaquino.me/transacoes",
        //headers: { Authorization: `JWT ${token}` },
        body: {
          conta_id: contaId,
          data_pagamento: DateTime.now()
            .plus({ days: 1 })
            .toFormat("dd/MM/yyyy"),
          data_transacao: DateTime.now().toFormat("dd/MM/yyyy"),
          descricao: "Desc",
          envolvido: "int",
          status: true,
          tipo: "REC",
          valor: "150",
        },
      }).as("response");
    });
    cy.get("@response").its("status").should("be.equal", 201);
  });

  it("Should get balance", () => {
    cy.request({
      method: "GET",
      url: "https://barrigarest.wcaquino.me/saldo",
      //headers: { Authorization: `JWT ${token}` },
    }).then((res) => {
      let saldoConta: null = null;
      res.body.forEach((c: any) => {
        if (c.conta === "Conta para saldo") saldoConta = c.saldo;
      });
      expect(saldoConta).to.be.equal("534.00");
    });

    cy.request({
      method: "GET",
      url: "https://barrigarest.wcaquino.me/transacoes",
      //headers: { Authorization: `JWT ${token}` },
      qs: { descricao: "Movimentacao 1, calculo saldo" },
    }).then((res) => {
      cy.request({
        method: "PUT",
        url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
        //headers: { Authorization: `JWT ${token}` },
        body: {
          status: true,
          data_pagamento: DateTime.fromISO(res.body[0].data_pagamento).toFormat(
            "dd/MM/yyyy"
          ),
          data_transacao: DateTime.fromISO(res.body[0].data_transacao).toFormat(
            "dd/MM/yyyy"
          ),
          descricao: res.body[0].descricao,
          envolvido: res.body[0].envolvido,
          valor: res.body[0].valor,
          conta_id: res.body[0].conta_id,
        },
      })
        .its("status")
        .should("be.equal", 200);
    });

    cy.request({
      method: "GET",
      url: "https://barrigarest.wcaquino.me/saldo",
     //headers: { Authorization: `JWT ${token}` },
    }).then((res) => {
      let saldoConta: null = null;
      res.body.forEach((c: any) => {
        if (c.conta === "Conta para saldo") saldoConta = c.saldo;
      });
      expect(saldoConta).to.be.equal("4034.00");
    });
  });

  it("Should remove a transaction", () => {
    cy.request({
      method: "GET",
      url: "https://barrigarest.wcaquino.me/transacoes/",
      //headers: { Authorization: `JWT ${token}` },
      qs: { descricao: "Movimentacao para exclusao" },
    }).then((res) => {
      cy.request({
        url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
        method: "DELETE",
        //headers: { Authorization: `JWT ${token}` },
      })
        .its("status")
        .should("be.equal", 204);
    });
  });
});
