describe("Testing the cypress doc itself!", () => {
    beforeEach(() => {
      cy.visit("https://docs.cypress.io/api/commands/get")
        });
    });
    
    it('Click on a button and wait for the evoked api to respond', ()=>{

        cy.intercept('GET', '/wp-json/wheels/v1/cars/audi/2020/all?page=2').as('getCars')

        cy.xpath('//*[@id="brand-page-vue-root"]/div[2]/div/div[2]/section/section[1]/div[2]/div/button/span')
        .scrollIntoView({ duration: 500 }).click()
        
        cy.wait('@getCars',{ responseTimeout: 15000 });

    });

  });
  