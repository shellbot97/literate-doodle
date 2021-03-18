function urlSlug(str) {
    if (!str) {
        return '';
    }

    return str
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .join("-");
}

describe('Test Wheels home page', () => {

    before(() => {
        cy.visit('https://www.forbes.com/wheels/');
        cy.viewport(1440, 900);
        // Presets
        // cy.viewport('macbook-15');
    });

    it('Check Load More Btn functionality of Wheels Now Section', () => {
        cy.get('#editorial-stream').within(() => {
            // There should be 4 articles
            cy.get('li.stream-article').should('have.length', 4);
            // Click More articles btn
            cy.get('.more-articles').click();
            // There should be more than 4 articles
            cy.get('li.stream-article').should('have.length.greaterThan', 4);
        });
    });

    it('Check Slider functionality', () => {
        // Window should have homeSliderInstance property
        cy.window().should('have.property', 'homeSliderInstance');

        // tns-slider and tns-item classes should be present
        cy.get('.sliderDiv').should('have.class', 'tns-slider');
        cy.get('.image-wrapper').should('have.class', 'tns-item');
    });


    it.only('Check Research Car components', () => {
        const baseUrl = 'https://www.forbes.com/wheels/cars/';
        const defaultYear = 2020;

        cy.get('.widget-wrapper').within(() => {
            // Create aliases for make, model, year and link
            cy.get('.dropdown-section-wrapper .custom-select').as('customSelects');
            cy.get('@customSelects').eq(0).as('make');
            cy.get('@customSelects').eq(1).as('model');
            cy.get('@customSelects').eq(2).as('year');
            cy.get('.button-wrap').as('goLink');

            // Check default state
            cy.get('@goLink').should('have.attr', 'href', 'javascript:;');
            cy.get('@goLink').should('have.class', 'cursor-not-allowed');

            // Select a Make and check the updated link
            cy.get('@make').click();
            cy.wait(2000);
            cy.get('@make').get('.item').eq(0).click();
            cy.get('@make').get('.selected').then($selectedItem => {
                const text = urlSlug($selectedItem.text());
                cy.get('@goLink').should('have.attr', 'href', `${baseUrl}${text}/`);
            });

            // Select a Model and check the update link
            cy.get('@model').click();
            cy.wait(2000);
            cy.get('@model').get('.item').eq(0).click();
            cy.get('@model').get('.selected').then($selectedItems => {
                let subLink = '';

                $selectedItems.each(($index, $item) => {
                    const text = urlSlug(Cypress.$($item).text());
                    subLink = `${subLink}${text}/`;
                });

                cy.get('@goLink').should('have.attr', 'href', `${baseUrl}${subLink}`);
            });

            // Select a Year and check the update link
            cy.get('@year').click();
            cy.wait(2000);
            cy.get('@year').get('.item').eq(1).click();
            cy.get('@year').get('.selected').then($selectedItems => {
                let subLink = '';

                $selectedItems.each(($index, $item) => {
                    const text = urlSlug(Cypress.$($item).text());
                    if (parseInt(text, 10) !== defaultYear) {
                        subLink = `${subLink}${text}/`;
                    }
                });

                cy.get('@goLink').should('have.attr', 'href', `${baseUrl}${subLink}`);
            });
        });
    });
});
