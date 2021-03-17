describe('Assignment 2: Diving deep',()=>{
    beforeEach(()=>{
        cy.visit('https://www.forbes.com/wheels/best/sedans/');
    });
    //Attempt Any three
    it('check if visited page has title "Best Sedans For 2021 - Forbes Wheels", url includes "best/sedans/" & protocol "https"',()=>{
        cy.title().should('eq', 'Best Sedans For 2021 - Forbes Wheels')
        cy.url().should('include', "best/sedans/")
        cy.url().should('include', "https")
    });

    it('click on Read more of intro section and check if it is expanding correctlty or not',()=>{
        // cy.scrollTo(0, 200)
        // cy.contains("Read More").click()
        cy.get('.hidden').contains('While Detroit may be throttling back on four-doors, automakers from Asia and Europe are hedging their bets')
        cy.get('.rounded-t-sm').click()
        cy.get('.hidden').contains('While Detroit may be throttling back on four-doors, automakers from Asia and Europe are hedging their bets')
        
    });

    it('Scroll down to summary and click on show summary. Check if it is expanding or not. Click again and check if it is closing or not',()=>{     
        cy.scrollTo(0, 150) 
        cy.get('.cursor-pointer.inline-block > .font-semibold').click()
        cy.get('.h-0.overflow-hidden.transition-height.duration-500.ease-in-out').invoke('outerHeight').should('be.greaterThan', 10)
        cy.get('.cursor-pointer.inline-block > .font-semibold').click()
        cy.get('.h-0.overflow-hidden.transition-height.duration-500.ease-in-out').invoke('outerHeight').should('be.eq', 0)
    });


    // it('click on Show summary and again click on any one of the expanded link and check if it is scrolling to the correct view or not',()=>{

    // });

    // it('scroll to any of the car widget and check the tabs - why we picked it , pros & cons , specs are getting displayed or not on clicking',()=>{

    // });

    // it('click on any three add to compare button and check if bottom drawer is opening or not' , ()=>{

    // });

    // //Similarly you can check for the At a Glance table Add to compare - has similiar functionality

    // //Visual Testing for the following Scenario

    // // 1. visit the same page
    // // 2. Expand Read more and Show Summary
    // // 3. Add any three cars in compare by clicking Add to compare
    // // 4. Test the same page for visual testing in Desktop ,  Mobile and Tablet after doing all the above steps.

    // //This one is compulsory
    // it('Test-Desktop',()=>{

    // })

    // it('Test-Mobile',()=>{
        
    // })

    // it('Test-Tablet',()=>{
        
    // })

})