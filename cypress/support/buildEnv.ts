const buildEnv = () => {
  cy.intercept(
    {
      method: "POST",
      url: "https://barrigarest.wcaquino.me/signin",
    },
    {
      fixture: "login.json",
    }
  ).as("signin");

  cy.intercept(
    {
      method: "GET",
      url: "https://barrigarest.wcaquino.me/saldo",
    },
    {
      fixture: "saldo.json",
    }
  ).as("saldo");

  cy.intercept(
    {
      method: "GET",
      url: "https://barrigarest.wcaquino.me/contas",
    },
    {
      fixture: "contas2.json",
    }
  ).as("contas");

  cy.intercept(
    {
      method: "GET",
      url: "https://barrigarest.wcaquino.me/extrato/**",
    },
    {
      fixture: "movimentacaoSalva.json",
    }
  );
};
export default buildEnv;
