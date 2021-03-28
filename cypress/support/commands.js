// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require('cypress-xpath')
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();


Cypress.Commands.add("imageImageSnapshot", () => {
    cy.xpath('//*[@id="best-page-vue-root"]/div[5]/div[1]/div/div[3]/button')
      .contains("Read More")
      .scrollIntoView({ duration: 500 })
      .click()
      .wait(250);
  });

  Cypress.Commands.add("clickReadMoreToggleOnBestPage", () => {
    cy.xpath('//*[@id="best-page-vue-root"]/div[5]/div[1]/div/div[3]/button')
      .contains("Read More")
      .scrollIntoView({ duration: 500 })
      .click()
      .wait(250);
  });
  
  Cypress.Commands.add("clickSummaryToggleOnBestPage", () => {
    cy.xpath(
      '//*[@id="best-page-vue-root"]/div[5]/div[1]/div/div[4]/div[1]/span[2]'
    )
      .contains("Show Summary")
      .scrollIntoView({ duration: 500 })
      .click()
      .wait(250);
  });
  
  Cypress.Commands.add("addThreeCarsToCompare", () => {
    cy.get(".car-widget").each(($el) => {
      let count = 0;
      if (count < 3) {
        $el.find(".custom-checkbox").eq(0).click();
        count++;
      }
    });
  });
  
  Cypress.Commands.add("removeStickyHeader", () => {
    cy.get(".header-wrap").then(($element) => {
      $element[0].setAttribute("style", "position: relative;");
    });
    cy.get("#root-app").then(($element) => {
      $element[0].setAttribute("style", "margin-top: 0;");
    });
  });
  
  Cypress.Commands.add("performPageScreenshot", (imageName) => {
    
    cy.scrollTo("bottom", { easing: "linear", duration: 3000 });
    cy.matchImageSnapshot(imageName);
  });
  
  Cypress.Commands.add("height", (xpath, callback) => {
    cy.xpath(xpath).within(($el) => {
      const height = parseInt($el[0].style.height);
      callback(height);
    });
  });
  

/**
 * pageNameOrPath - Page Type name or pathname
 */
 Cypress.Commands.add('openPage', (pageNameOrPath, deviceType = 'desktop') => {
	const env = Cypress.env('app_env') || 'prod';
	const baseUrl = env === 'local' ? Cypress.env('base_url') : Cypress.config('base_url')[env];
	const pages = Cypress.config('pages');

	const cypressOption = {};

	/**
	 * Set auth
	 */
	const authDetails = Cypress.config('auth');
	if (authDetails && authDetails[env]) {
		cypressOption.auth = {
			username: authDetails[env][0],
			password: authDetails[env][1]
		};
	}
  
	const pagePath = pages[pageNameOrPath] ? pages[pageNameOrPath] : pageNameOrPath;
	cy.visit(`${baseUrl}${pagePath}`, cypressOption);
});