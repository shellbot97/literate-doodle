
var test_url = 'https://www.forbes.com/wheels/';
var search_key = "2022 Kia Carnival MPV: Don’t Call It A Minivan";
var match_key = "news/"

// passing test, which asserts true with true
describe('My First Test', () => {
    it('asserts true with true', () => {
        expect(true).to.equal(true)
    })
})

// failing test, which asserts true with false
describe('My second Test', () => {
    it('asserts true with false', () => {
        expect(true).to.equal(false)
    })
})

// visiting a webpage
describe('My Third Test', () => {
    it('Visits a demo webiste', () => {
        cy.visit(test_url)
    })
})

// Querying an element
describe('My Forth Test', () => {
    it('finds the content "type"', () => {
        cy.visit(test_url)

        cy.contains(search_key)
    })
})

// Clicking an element
describe('My Fifth Test', () => {
    it('finds the content search_key', () => {
        cy.visit(test_url)

        cy.contains(search_key).click()
    })
})

// making an assertion about selected element
describe('My Sixth Test', () => {
    it('clicking search_key navigates to a new url', () => {
        cy.visit(test_url)

        cy.contains(search_key).click()

        // Should be on a new URL which includes
        cy.url().should('include', match_key)
    })
})
