Cypress.Commands.add("login", (username: string, password: string) => {
  cy.get('[data-test="email"]').type(username);
  cy.get('[data-test="passwd"]').type(password);
  cy.get(".btn").click();
});

Cypress.Commands.add("acessarMenuConta", () => {
  cy.get('[data-test="menu-settings"]').click();
  cy.get('[href="/contas"]').click();
});

Cypress.Commands.add("inserirConta", (conta) => {
  cy.get('[data-test="nome"]').type(conta);
  cy.get(".btn").click();
});

Cypress.Commands.add("getToken", (username, password) => {
  cy.request({
    method: "POST",
    url: "https://barrigarest.wcaquino.me/signin",
    body: {
      email: username,
      senha: password,
      redirecionar: false,
    },
  })
    .its("body.token")
    .should("not.be.empty")
    .then((token) => {
      return token;
    });
});

Cypress.Commands.add("resetRest", () => {
  cy.getToken("rocha@gmail.com", "alana123").then((token) => {
    cy.request({
      method: "GET",
      url: "https://barrigarest.wcaquino.me/reset",
      headers: { Authorization: `JWT ${token}` },
    })
      .its("status")
      .should("be.equal", 200);
  });
});
