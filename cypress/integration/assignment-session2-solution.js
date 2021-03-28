describe("Assignment 2", () => {
    beforeEach(() => {
      cy.visit("https://www.forbes.com/wheels/best/sedans/");
    });
    //Attempt Any three
    it('check if visited page has title "Best Sedans For 2021 - Forbes Wheels", url includes "best/sedans/" & protocol "https"', () => {
      cy.get("title").contains("Best Sedans For 2021 - Forbes Wheels");
      cy.url().should("include", "best/sedans/");
      cy.location("protocol").should("eq", "https:");
    });
  
    it("click on Read more of intro section and check if it is expanding correctlty or not", () => {
      cy.clickReadMoreToggleOnBestPage();
      cy.wait(2000);
      cy.get(".intro-text p").its("length").should("gt", 3);
    });
  
    it("Scroll down to summary and click on show summary. Check if it is expanding or not. Click again and check if it is closing or not", () => {
      const drawerXPath =
        '//*[@id="best-page-vue-root"]/div[5]/div[1]/div/div[4]/div[2]';
      cy.clickSummaryToggleOnBestPage();
      cy.height(drawerXPath, (height) => {
        expect(height).to.be.gt(100);
      });
      cy.clickSummaryToggleOnBestPage();
      cy.height(drawerXPath, (height) => {
        expect(height).to.be.eq(0);
      });
    });
  
    it("click on Show summary and again click on any one of the expanded link and check if it is scrolling to the correct view or not", () => {
      cy.clickSummaryToggleOnBestPage();
      cy.xpath(
        '//*[@id="best-page-vue-root"]/div[5]/div[1]/div/div[4]/div[2]/ul/li[1]/span[1]'
      ).click();
    });
  
    it("scroll to any of the car widget and check the tabs - why we picked it , pros & cons , specs are getting displayed or not on clicking", () => {
      cy.get(".car-widget").first().scrollIntoView({ duration: 1000 });
      cy.xpath('//*[@id="best-car-123750"]/div[2]/div[1]/div[1]')
        .contains("Why We Picked It")
        .click();
      cy.height('//*[@id="best-car-123750"]/div[2]/div[1]/div[2]', (height) => {
        expect(height).to.be.gt(10);
      });
      cy.xpath('//*[@id="best-car-123750"]/div[2]/div[2]')
        .contains("Pros & Cons")
        .click();
      cy.height('//*[@id="best-car-123750"]/div[2]/div[2]/div[2]', (height) => {
        expect(height).to.be.gt(10);
      });
      cy.xpath('//*[@id="best-car-123750"]/div[2]/div[3]/div[1]')
        .contains("Specs")
        .click();
      cy.height('//*[@id="best-car-123750"]/div[2]/div[3]/div[2]', (height) => {
        expect(height).to.be.gt(10);
      });
    });
  
    it("click on any three add to compare button and check if bottom drawer is opening or not", () => {
      cy.addThreeCarsToCompare();
      cy.get(".cars-toggle").click();
      cy.wait(250);
      cy.get(".car-wrapper > div").first().should("have.class", "flex");
    });
  
    //Similarly you can check for the At a Glance table Add to compare - has similiar functionality
  
    //Visual Testing for the following Scenario
  
    // 1. visit the same page
    // 2. Expand Read more and Show Summary
    // 3. Add any three cars in compare by clicking Add to compare
    // 4. Test the same page for visual testing in Desktop ,  Mobile and Tablet after doing all the above steps.
  
    //This one is compulsory
    it("Test-Desktop", () => {
      cy.clickReadMoreToggleOnBestPage();
      cy.clickSummaryToggleOnBestPage();
      cy.addThreeCarsToCompare();
      cy.performPageScreenshot("desktop-best");
    });
  
    it("Test-Mobile", () => {
      cy.viewport("iphone-6+");
      cy.clickReadMoreToggleOnBestPage();
      cy.clickSummaryToggleOnBestPage();
      cy.addThreeCarsToCompare();
      cy.performPageScreenshot("mobile-best");
    });
  
    it("Test-Tablet", () => {
      cy.viewport("ipad-2");
      cy.clickReadMoreToggleOnBestPage();
      cy.clickSummaryToggleOnBestPage();
      cy.addThreeCarsToCompare();
      cy.performPageScreenshot("tablet-best");
    });
  });
  