describe("Should test at a functional level", () => {
  let token: string;

  before(() => {
    cy.getToken("rocha@gmail.com", "alana123").then((tkn) => {
      token = tkn;
    });
  });

  beforeEach(() => {
    cy.resetRest();
  });

  it("Should create an account", () => {
    cy.request({
      url: "https://barrigarest.wcaquino.me/contas",
      method: "POST",
      headers: { Authorization: `JWT ${token}` },
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
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: "conta alana alterada",
      },
    }).then((res: any) => {
      console.log(res.body);
      cy.request({
        url: `https://barrigarest.wcaquino.me/contas/${res.body[0]?.id}`,
        method: "PUT",
        headers: { Authorization: `JWT ${token}` },
        body: {
          nome: "conta alana alterada dnv",
        },
        failOnStatusCode: false,
      }).as("response");
    });
    cy.get("@response").its("status").should("be.equal", 500);
  });

  it.only("Should not create an account with same name", () => {
    cy.request({
      url: "https://barrigarest.wcaquino.me/contas",
      method: "POST",
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: "Conta mesmo nome",
      },
      failOnStatusCode: false,
    }).as("response");
    cy.get("@response").then((res: any) => {
      console.log(res);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", "Conta via rest");
    });
  });
  it("Should crete an account with same name", () => {});
  it("Should crete a transaction", () => {});
  it("Should get balance", () => {});
  it("Should remove a transaction", () => {});
});
