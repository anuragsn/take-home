describe("Product Management", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a new product", () => {
    cy.visit("/add-product");
    cy.get('input[name="name"]').type("New Product");
    cy.get('input[name="description"]').type("Description of new product");
    cy.get('input[name="price"]').type("100");
    cy.get('input[name="quantity"]').type("10");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("New Product");
  });

  it("should edit a product", () => {
    cy.visit("/");
    cy.get(":nth-child(1) > .flex > a").click();
    cy.url().should("include", "/edit-product");
    cy.get('input[name="name"]').clear().type("Updated Product");
    cy.get('input[name="description"]')
      .clear()
      .type("Updated description of product");
    cy.get('input[name="price"]').clear().type("150");
    cy.get('input[name="quantity"]').clear().type("15");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Updated Product");
    cy.visit("/");
  });

  it("should delete a product", () => {
    cy.visit("/");
    cy.get(":nth-child(2).flex > :nth-child(2)").click();
    cy.contains("Updated Product").should("not.exist");
  });
});
