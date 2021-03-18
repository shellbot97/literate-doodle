describe('Test Wheels Homepage' , ()=>{
    beforeEach(()=>{
        cy.visit('http://fbwheels-staging.testingpe.com/' , {
            auth:{
                username: 'wheels',
                password: 'WP!@Wheels'
            }
        })
    })
    it('Test Desktop' , ()=>{

        cy.get('.header-wrap').then(($element) => {
            $element[0].setAttribute('style', 'position: relative;');
        });
        cy.get('#root-app').then(($element) => {
            $element[0].setAttribute('style', 'margin-top: 0;');
        });

        cy.scrollTo('bottom', { easing: 'linear', duration: 3000 });
        
        cy.matchImageSnapshot('desktop-homepage');
    });

    it('Test Mobile' , ()=>{
        cy.viewport('iphone-6+');

        cy.get('.header-wrap').then(($element) => {
            $element[0].setAttribute('style', 'position: relative;');
        });
        cy.get('#root-app').then(($element) => {
            $element[0].setAttribute('style', 'margin-top: 0;');
        });

        cy.scrollTo('bottom', { easing: 'linear', duration: 3000 });
        
        cy.matchImageSnapshot('mobile-homepage');
    });

    it('Test Tablet' , ()=>{
        cy.viewport('ipad-2')

        cy.get('.header-wrap').then(($element) => {
            $element[0].setAttribute('style', 'position: relative;');
        });
        cy.get('#root-app').then(($element) => {
            $element[0].setAttribute('style', 'margin-top: 0;');
        });

        cy.scrollTo('bottom', { easing: 'linear', duration: 3000 });
        
        cy.matchImageSnapshot('tablet-homepage');
    });
})
