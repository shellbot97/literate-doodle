describe('Basic tag testing', () => {
    // visit any website example: https://www.forbes.com/wheels/
    before(() => {
        cy.visit('https://www.forbes.com/wheels/');
    });

    // Test Case 1
    // Check if h1 tag is present or not
    // if present then assert true
    it('h1 tag is present or not', () => {
        // This is enough to test if h1 is present or not
        // Cypress has default assertion.
        cy.get('h1');

        // Suppose your trying to get a element that is not present in the page
        // Cypress will assert false
        // Example: Check if aside tag is present or not
        // cy.get('aside');
        // This is would fail since no aside tag is present on the page

        // We can also test visibility of the Element and most of the assignments have tested the visibility too.
        cy.get('h1').should('be.visible');
    });

    // Test Case 2
    // Check all <a></a> should have href property
    it('All a tag must have href property', () => {
        cy.get('a').should('have.attr', 'href')
            .and('not.be.empty');
    });

    // Test Case 3
    // Check all image have alt property
    it('All image must have alt property', () => {
        // Not asserting 'not.be.empty'
        // Because presentational images have empty alt attribute
        cy.get('img').should('have.attr', 'alt');
    });
});