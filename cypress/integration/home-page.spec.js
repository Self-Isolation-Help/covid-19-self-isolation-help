/// <reference types="Cypress" />

describe("Home Page", () => {
  it("should display the site name on the homepage", () => {
    cy.visit("/");
    cy.get("h1").should(
      "contain.text",
      "COVID-19 Self-Isolation Help for the UK"
    );
  });
});
