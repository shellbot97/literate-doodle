describe('Learning Asynchronous nature of cypress commands', () => {
    it('Does not work as we expect', () => {
        cy.visit('http://localhost/test.html').then(() => {
            console.log('Visit Complete');
        }); // Nothing happens yet

        cy.get('h1')   // Still nothing happening
            .should('not.be.empty');                 // Nope, nothing

        // Cypress.$ is synchronous, so evaluates immediately
        // there is no element to find yet because
        // the cy.visit() was only queued to visit
        // and did not actually visit the application
        let el = Cypress.$('#editorial-stream'); // evaluates immediately as []

        console.log('Regular Javascript');
        if (el.length) {              // evaluates immediately as 0
            console.log('Evaluates Immediately. Element present');
        } else {
            // this will always run
            // because the 'el.length' is 0
            // when the code executes
            console.log('Optional Selector. This will always run');
        }
    });


    it('Does work as we expect', () => {
        cy.visit('http://localhost/test.html');   // Nothing happens yet

        cy.get('h1')      // Still nothing happening
            .should('not.be.empty')                       // Nope, nothing
            .then(() => {
                // placing this code inside the .then() ensures
                // it runs after the cypress commands 'execute'
                let el = Cypress.$('#editorial-stream'); // evaluates after .then()

                if (el.length) {
                    console.log('Command executed. Will only run if the element is present');
                } else {
                    console.log('Command executed. Will only run if the element is not present');
                }
            })
    });

// Ok, the test function has finished executing...
// We've queued all of these commands and now
// Cypress will begin running them in order!
});


describe('Test Random number example', () => {
    it('Check for Lucky No 7 - Incorrect Test', () => {
        let found7 = false;
        let counter = 1;

        while (!found7) {
            // this schedules an infinite number
            // of "cy.get..." commands, eventually crashing
            // before any of them have a chance to run
            // and set found7 to true
            counter += 1;
            console.log(counter);
            if (counter >= 100) {
                break;
            }

            cy.visit('http://localhost/test.html');
            cy.get('h1').should('not.be.empty').invoke('text').then(parseInt)
                .then((number) => {
                    if (number === 7) {
                        found7 = true;
                        cy.log('lucky **7**')
                    } else {
                        cy.reload()
                    }
                });

            // The above test keeps adding more cy.get('h1') commands to the test chain without executing any!
            // The chain of commands keeps growing, but never executes - since the test function never finishes running.
            // The while loop never allows Cypress to start executing even the very first cy.get(...) command
        }
    });


    it.only('Check for Lucky No 7 - Correct Test', () => {
        const checkAndReload = () => {
            // get the element's text, convert into a number
            cy.get('h1').should('not.be.empty').invoke('text').then(parseInt)
                .then((number) => {
                    // if the expected number is found
                    // stop adding any more commands
                    if (number === 7) {
                        cy.log('lucky **7**');

                        return
                    }

                    // otherwise insert more Cypress commands
                    // by calling the function after reload
                    cy.wait(500);
                    cy.reload();
                    checkAndReload()
                });
        };

        cy.visit('http://localhost/test.html');
        checkAndReload()
    });
});






