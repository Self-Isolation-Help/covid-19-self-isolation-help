/// <reference types="Cypress" />

describe("Home Page", () => {
  it("should display the site name on the homepage", () => {
    cy.visit("/");
    cy.get(".md card-content-md hydrated").should(
      "contain.text",
      "COVID-19 Self-Isolation Help for the UK"
    );
  });
});
