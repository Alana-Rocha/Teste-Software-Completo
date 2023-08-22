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
      Cypress.env("token", token);
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

Cypress.Commands.add("getAccountByName", (name: string) => {
  cy.getToken("rocha@gmail.com", "alana123").then((token) => {
    cy.request({
      method: "GET",
      url: "https://barrigarest.wcaquino.me/contas",
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: name,
      },
    }).then((res) => {
      return res.body[0]?.id;
    });
  });
});

Cypress.Commands.overwrite("request", (originalFn: any, ...options: any) => {
  if (options.length === 1) {
    if (Cypress.env("token")) {
      options[0].headers = {
        Authorization: `JWT ${Cypress.env("token")}`,
      };
    }
  }
  return originalFn(...options);
});
