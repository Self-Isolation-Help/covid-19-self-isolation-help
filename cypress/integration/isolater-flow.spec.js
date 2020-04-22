describe("Home page continue button", () => {
  it("should click through to - is this tool right for you?", () => {
    cy.visit("/");
    cy.get(".card-content-md > .md").click();
    cy.url().should("eq", "https://selfisolationhelp.co.uk/question-one");
  });
});

describe("Is this tool right for you?", () => {
  it("should click through to what help do you need?", () => {
    cy.visit("/question-one");
    cy.get(
      ".ion-padding > .max-wrap > ion-card.md > .card-content-md > .md"
    ).click();
    cy.url().should("eq", "https://selfisolationhelp.co.uk/info");
  });
});

describe("What help do you need?", () => {
  it("should click through to more info ", () => {
    cy.visit("/info");
    cy.get(":nth-child(2) > .card-content-md > .md").click();
    cy.url().should("contain", "https://selfisolationhelp.co.uk/more-info");
  });
});

describe("More info", () => {
  it("should click through to self-isolator's information", () => {
    cy.visit("/more-info");
    cy.get(":nth-child(2) > .card-content-md > .md").click();
    cy.url().should("contain", "https://selfisolationhelp.co.uk/address");
  });
});

describe("Self-isolator's information", () => {
  it("should not allow to click through without required fields populated", () => {
    cy.visit("/address");
    cy.get(":nth-child(2) > .card-content-md > .md").click();
    cy.url().should("contain", "https://selfisolationhelp.co.uk/address");
  });
});
