describe("Assignment 3", () => {
    beforeEach(() => {
        cy.openPage('make');
    });
    
    it('Create a custom command to include your image snapshots commands in one command', ()=>{

        cy.performPageScreenshot('snapshot-by-custom-command');

    });

    it.only('Request API', ()=>{

        cy.intercept('GET', 'http://fbwheels-staging.testingpe.com/wp-json/wheels/v1/cars/audi/2020/all?page=2').as('getCars')

        cy.xpath('//*[@id="brand-page-vue-root"]/div[2]/div/div[2]/section/section[1]/div[2]/div[1]').children().its('length').then(initialLength => {
            cy.log(initialLength)
            cy.xpath('//*[@id="brand-page-vue-root"]/div[2]/div/div[2]/section/section[1]/div[2]/div/button/span').click()
            cy.wait(['@getCars'])
            cy.xpath('//*[@id="brand-page-vue-root"]/div[2]/div/div[2]/section/section[1]/div[2]/div[1]').children().should('have.length.greaterThan', initialLength)

        });

    });

  });

  