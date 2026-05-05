describe('Counter E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    })

    it("goes to login page", () => {
        cy.contains('Skrá inn').click();

        cy.url().should('include', '/login');
        cy.contains('Innskráning')
    })

    it("logs in successfully with valid credentials", () => {
        cy.visit('/login');

        cy.get('input[name=user]').type('asdf')
        cy.get('input[name=password]').type('asdfasdf')

        cy.get('[data-testid="login-button"]').click();

        cy.url().should('include', '/velkominn')
        cy.contains('Velkomin(n) inn')
    })

    it("keeps user logged in after refresh", () => {
        cy.visit('/login');

        cy.get('form').within(() => {
            cy.get('input[name=user]').type('asdf')
            cy.get('input[name=password]').type('asdfasdf')
            cy.contains('Skrá inn').click();
        });

        cy.url().should('include', '/velkominn')
        cy.contains('Velkomin(n) inn')

        cy.reload();

        cy.url().should('include', '/velkominn')
        cy.contains('Velkomin(n) inn')
    })

    it("logs the user out and redirects to login page")
});