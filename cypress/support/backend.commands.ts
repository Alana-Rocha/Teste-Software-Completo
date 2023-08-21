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
