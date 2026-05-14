describe("project flow", () => {
   beforeEach(() => {
      cy.clearLocalStorage();
   });

   it("should create project and add task", () => {
      cy.visit("http://localhost:5173");

      cy.contains("Add project").click();

      cy.get('input[name="name"]').type("Website Redesign");

      cy.get('input[name="description"]').type(
         "Update landing page",
      );

      //cy.contains("Add project").click();
      cy.get('button[type="submit"]').click()

      cy.contains("Website Redesign").should("exist");

      cy.contains("Website Redesign").click();

      cy.contains("Add task").click();

      cy.get('input[name="title"]').type("Fix navbar");

      cy.get('input[name="description"]').type(
         "Responsive navigation",
      );

      cy.get('button[type="submit"]').click();

      cy.contains("Fix navbar").should("exist");
   });
});