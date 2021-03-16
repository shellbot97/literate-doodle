var test_url = 'https://www.forbes.com/wheels/';
var search_key = "2022 Kia Carnival MPV: Don’t Call It A Minivan";
var match_key = "news/"


describe('Basic tag testing', () => {
    // visit any website

    // Test Case 1
    it('Check if h1 tag is present or not, if present then assert true', () => {
        cy.visit(test_url)
        cy.get('body').find("h1") 
    })

    // // Test Case 2
    it('Check if all <a></a> have href property', () => {
        cy.visit(test_url)
        cy.get('a').should('have.attr', 'href')
    })

    // // Test Case 3
    it('Check all image have alt property', () => {
        cy.visit(test_url)
        cy.get('img').should('have.attr', 'alt')
    })
});
