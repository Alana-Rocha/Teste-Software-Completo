Cypress.Commands.add("xpathSaldo", (nome: string) => {
  const xpathSaldo = `//td[contains(., '${nome}')]/../td[2]`;
  cy.xpath(xpathSaldo);
});

Cypress.Commands.add("xpathExtrato", (desc: string, value: string) => {
  const xpathExtrato = `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`;
  cy.xpath(xpathExtrato);
});

Cypress.Commands.add("xpathBtnAlterar", (nome: string) => {
  const xpathBtnAlterar = `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`;
  cy.xpath(xpathBtnAlterar);
});

Cypress.Commands.add("xpathBtnRemoveConta", (conta: string) => {
  const xpathBtnRemoveConta = `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`;
  cy.xpath(xpathBtnRemoveConta);
});

