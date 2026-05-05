describe('Counter E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    })

    it('increments the counter', () => {
        cy.contains('Hækka').click();

        cy.contains('Gildi: 1')
    });

    it("increments the counter multiple times correctly", () => {
        cy.contains('Hækka').click();
        cy.contains('Hækka').click();
        cy.contains('Hækka').click();

        cy.contains('Gildi: 3')
    })

    it('resets the counter after multiple increments (pressing "Endurstilla")', () => {
        cy.contains('Hækka').click();
        cy.contains('Hækka').click();

        cy.contains('Gildi: 2')

        cy.contains('Endurstilla').click();

        cy.contains('Gildi: 0')
    });

    it("decrements the counter when clicking Minnka" , () => {
        cy.contains('Hækka').click();
        cy.contains('Hækka').click();

        cy.contains('Gildi: 2')
        
        cy.contains('Minnka').click();

        cy.contains('Gildi: 1')
    }); 

    it("increments and then decrements back to zero", () => {
        cy.contains('Hækka').click();

        cy.contains('Gildi: 1')
        
        cy.contains('Minnka').click();

        cy.contains('Gildi: 0')
    })

    it("allows the counter to go below zero", () => {
        cy.contains('Minnka').click();

        cy.contains('Gildi: -1')
    })

    it("resets the counter even if it is already zero", () => {
        cy.contains('Gildi: 0')

        cy.contains('Endurstilla').click();

        cy.contains('Gildi: 0')
    })

    it("always shows the correct value after each action", () => {
        cy.contains('Hækka').click();

        cy.contains('Gildi: 1')

        cy.contains('Hækka').click();

        cy.contains('Gildi: 2')

        cy.contains('Hækka').click();

        cy.contains('Gildi: 3')

        cy.contains('Hækka').click();

        cy.contains('Gildi: 4')
    })

    it("handles rapid clicking of the increment button", () => {
        cy.contains('Hækka').click().click();

        cy.contains('Gildi: 2')
    })
})