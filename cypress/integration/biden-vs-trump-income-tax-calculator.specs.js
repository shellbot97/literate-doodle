export const bvtSelectors = {
    baseSelector: '#biden-vs-trump',
    annualIncome: '#annual_income',
    taxContribution: '#tax_contribution',
    taxDeduction: '#tax_deduction',
    age: '#age',
    spouseAge: '#spouse_age',
    childDependentCareExpense: '#child_dependent_care_expense',
    dependentAge: '.dependentAge',
};

describe('Test Biden vs Trump Income Tax Calculator', () => {

    beforeEach(() => {
        cy.visit('https://www.forbes.com/advisor/taxes/president-biden-tax-calculator/');
    });

    it('Case 1 - S/DTC', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().type('40,000');
            cy.get('.bvt-more_options').click();
            cy.wait(1100);
            cy.get("#ira").click({force: true});
            cy.get(bvtSelectors.taxContribution).clear().type('6,000');
            cy.get(bvtSelectors.age).clear().type('35');
            cy.get(".dependent-ages:nth-of-type(1)").find('.dependentAge').clear().type('4');
            cy.get(".dependent-ages:nth-of-type(2)").find('#child_dependent_care_expense').clear({force: true}).type('10,000', {force: true});
            cy.get(".dependent-ages:nth-of-type(2)").find('.dependentAge').clear().type('10');

            cy.get('.bvt-dependent__add').click();

            cy.get(".dependent-ages:nth-of-type(3)").find('#child_dependent_care_expense').clear({force: true}).type('10,000', {force: true});
            cy.get(".dependent-ages:nth-of-type(3)").find('.dependentAge').clear().type('20');

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$2,800');
            cy.get("#trumpOutput").find('.bvt-refund').should('have.text', 'Refund');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$8,705.5');
            cy.get("#bidenOutput").find('.bvt-refund').should('have.text', 'Refund');

            cy.get('.bvt-see-more').click();
            cy.get(".bvt-output__graph-stats-points .marginal-rate").should('have.html', `Your marginal federal income tax rate remained at <b>12</b>%`);
        });
    });

    it('Case 1 - S/DTC - Custom', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().type('25,000');
            cy.get('.bvt-more_options').click();
            cy.get("#ira").click({force: true});
            cy.get(bvtSelectors.taxContribution).clear().type('6,000');
            cy.get(bvtSelectors.age).clear().type('35');
            cy.get(".dependent-ages:nth-of-type(1)").find('.dependentAge').clear().type('4');
            cy.get(".dependent-ages:nth-of-type(2)").find('#child_dependent_care_expense').clear({force: true}).type('10,000', {force: true});
            cy.get(".dependent-ages:nth-of-type(2)").find('.dependentAge').clear().type('10');

            cy.get('.bvt-dependent__add').click();

            cy.get(".dependent-ages:nth-of-type(3)").find('#child_dependent_care_expense').clear({force: true}).type('10,000', {force: true});
            cy.get(".dependent-ages:nth-of-type(3)").find('.dependentAge').clear().type('20');

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$2,800');
            cy.get("#trumpOutput").find('.bvt-refund').should('have.text', 'Refund');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$11,720');
            cy.get("#bidenOutput").find('.bvt-refund').should('have.text', 'Refund');

            cy.get('.bvt-see-more').click();
            cy.get(".bvt-output__graph-stats-points .marginal-rate").should('have.html', `Your marginal federal income tax rate remained at <b>10</b>%`);
        });
    });

    it('Case 2 - M/401k', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().clear().type('150,000');
            cy.get('input[type="radio"][value="married"]').click({force: true});
            cy.get('.bvt-more_options').click();

            cy.get(bvtSelectors.age).clear().type('35');
            cy.get(bvtSelectors.spouseAge).clear().type('35');
            cy.get(bvtSelectors.taxContribution).clear().type('39,000');
            cy.get(".dependent-ages:nth-of-type(1)").find('.dependentAge').clear().type('4');

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$8,544');
            cy.get("#trumpOutput").find('.bvt-taxes').should('have.text', 'Taxes');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$5,384');
            cy.get("#bidenOutput").find('.bvt-taxes').should('have.text', 'Taxes');
        });

        cy.get('.bvt-see-more').click();
        cy.get(".bvt-output__graph-stats-points .marginal-rate").should('have.html', `Your marginal federal income tax rate remained at <b>22</b>%`);
    });

    it('Case 3 - HOH/itemized', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().clear().type('450,000');
            cy.get('input[type="radio"][value="head_of_household"]').click({force: true});
            cy.get('.bvt-more_options').click();

            cy.get(bvtSelectors.age).clear().type('35');
            cy.get("#ira").click({force: true});
            cy.get(bvtSelectors.taxContribution).clear().type('6,000');
            cy.get(".dependent-ages:nth-of-type(1)").find('.dependentAge').clear().type('20');

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$122,226');
            cy.get("#trumpOutput").find('.bvt-taxes').should('have.text', 'Taxes');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$122,892.1');
            cy.get("#bidenOutput").find('.bvt-taxes').should('have.text', 'Taxes');

            cy.get('.bvt-see-more').click();
            cy.get(".bvt-output__graph-stats-points .marginal-rate").should('have.html', `Your marginal federal income tax rate would be at <b>39.6</b>% (previously <b>35</b>%)`);
        });
    });

    it('Case 4 - M/CTC', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().clear().type('80,000');
            cy.get('input[type="radio"][value="married"]').click({force: true});
            cy.get('.bvt-more_options').click();

            cy.get(bvtSelectors.age).clear().type('35');
            cy.get(bvtSelectors.spouseAge).clear().type('35');
            cy.get("#ira").click({force: true});
            cy.get(bvtSelectors.taxContribution).clear().type('12,000');

            cy.get(".dependent-ages:nth-of-type(1)").find('.dependentAge').clear().type('20');
            cy.get(".dependent-ages:nth-of-type(2)").find('.dependentAge').clear().type('4');
            cy.get('.bvt-dependent__add').click();
            cy.get(".dependent-ages:nth-of-type(3)").find('.dependentAge').clear().type('10');
            cy.get('.bvt-dependent__add').click();
            cy.get(".dependent-ages:nth-of-type(4)").find('.dependentAge').clear().type('8');
            cy.get(".dependent-ages:nth-of-type(1)").find('#child_dependent_care_expense').clear({force: true}).type('5,000', {force: true});
            cy.get(".dependent-ages:nth-of-type(2)").find('#child_dependent_care_expense').clear({force: true}).type('5,000', {force: true});

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$2,911');
            cy.get("#trumpOutput").find('.bvt-refund').should('have.text', 'Refund');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$7,311');
            cy.get("#bidenOutput").find('.bvt-refund').should('have.text', 'Refund');
        });
    });

    it('Case 5 - S/Itemized', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().clear().type('451,000');
            cy.get('.bvt-more_options').click();

            cy.get(bvtSelectors.age).clear().type('35');
            cy.get("#itemized-deductions").click({force: true});
            cy.get(bvtSelectors.taxDeduction).clear().type('50,000');

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$115,145');
            cy.get("#trumpOutput").find('.bvt-taxes').should('have.text', 'Taxes');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$120,991');
            cy.get("#bidenOutput").find('.bvt-taxes').should('have.text', 'Taxes');
        });
    });

    it('Case 6 - M/Senior Citizen', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().clear().type('150,000');
            cy.get('input[type="radio"][value="married"]').click({force: true});
            cy.get('.bvt-more_options').click();

            cy.get(bvtSelectors.age).clear().type('70');
            cy.get(bvtSelectors.spouseAge).clear().type('70');
            cy.get(bvtSelectors.taxContribution).clear().type('50,000');
            cy.get(".dependent-ages:nth-of-type(1)").find('.dependentAge').clear().type('20');
            cy.get(".dependent-ages:nth-of-type(2)").find('.dependentAge').clear().type('30');

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$7,317');
            cy.get("#trumpOutput").find('.bvt-taxes').should('have.text', 'Taxes');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$4,552');
            cy.get("#bidenOutput").find('.bvt-taxes').should('have.text', 'Taxes');
        });
    });

    it('Case 7 - S/Itemized', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().clear().type('431,000');
            cy.get('input[type="radio"][value="married"]').click({force: true});
            cy.get('.bvt-more_options').click();

            cy.get(bvtSelectors.age).clear().type('35');
            cy.get(bvtSelectors.spouseAge).clear().type('35');
            cy.get("#itemized-deductions").click({force: true});
            cy.get(bvtSelectors.taxDeduction).clear().type('50,000');

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$83,951');
            cy.get("#trumpOutput").find('.bvt-taxes').should('have.text', 'Taxes');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$88,307');
            cy.get("#bidenOutput").find('.bvt-taxes').should('have.text', 'Taxes');
        });
    });

    it('Case 8 - M/Contribution', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().clear().type('431,000');
            cy.get('input[type="radio"][value="married"]').click({force: true});
            cy.get('.bvt-more_options').click();

            cy.get(bvtSelectors.age).clear().type('70');
            cy.get(bvtSelectors.spouseAge).clear().type('40');
            cy.get(bvtSelectors.taxContribution).clear().type('30,000');
            cy.get("#itemized-deductions").click({force: true});
            cy.get(bvtSelectors.taxDeduction).clear().type('40,000');

            cy.get(".dependent-ages:nth-of-type(1)").find('.dependentAge').clear().type('20');
            cy.get(".dependent-ages:nth-of-type(2)").find('.dependentAge').clear().type('4');
            cy.get('.bvt-dependent__add').click();
            cy.get(".dependent-ages:nth-of-type(3)").find('.dependentAge').clear().type('10');
            cy.get('.bvt-dependent__add').click();
            cy.get(".dependent-ages:nth-of-type(4)").find('.dependentAge').clear().type('10');
            cy.get(".dependent-ages:nth-of-type(1)").find('#child_dependent_care_expense').clear({force: true}).type('7,000', {force: true});
            cy.get(".dependent-ages:nth-of-type(2)").find('#child_dependent_care_expense').clear({force: true}).type('5,000', {force: true});
            cy.get(".dependent-ages:nth-of-type(3)").find('#child_dependent_care_expense').clear({force: true}).type('5,000', {force: true});

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$76,351');
            cy.get("#trumpOutput").find('.bvt-taxes').should('have.text', 'Taxes');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$70,007');
            cy.get("#bidenOutput").find('.bvt-taxes').should('have.text', 'Taxes');
        });
    });

    it('Case 9 - M/39.6%', () => {
        cy.viewport(1400, 900);
        cy.get('#biden-vs-trump').within(() => {
            localStorage.setItem('emailCaptured', '1');
            cy.get(bvtSelectors.annualIncome).clear().clear().type('450,000');
            cy.get('input[type="radio"][value="married"]').click({force: true});
            cy.get('.bvt-more_options').click();

            cy.get(bvtSelectors.age).clear().type('35');
            cy.get("#ira").click({force: true});
            cy.get(bvtSelectors.taxContribution).clear().type('12,000');

            cy.get('.bvt-submit-container__button').click();

            cy.get("#trumpOutput .bvt-output-value").should('have.text', '$94,255');
            cy.get("#trumpOutput").find('.bvt-taxes').should('have.text', 'Taxes');
            cy.get("#bidenOutput .bvt-output-value").should('have.text', '$95,258.2');
            cy.get("#bidenOutput").find('.bvt-taxes').should('have.text', 'Taxes');
        });
    });
});
