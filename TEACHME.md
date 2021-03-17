# Diving deep into the Cypress-ocean 🌊

After doing assignment 1, you might've come across some functions/keywords whose purpose in detail might be unknown to you. Refer to below table to dive deep,

| Keyword/function | Syntax | One-liner explanation | Reference |
| ------ | ------ | ------ |  ------ |
| describe |  | group & label tests |  |
| it |  |  |  |
| cy.visit |  |  |  |
| cy.get |  |  |  |
| cy.get().find |  |  |  |
| cy.get().should |  |  |  |

**These can be also looked up in the [cheatsheet].**

## Assignment 2
[solution-assignment2]

```

  //visit https://www.forbes.com/wheels/best/sedans/

  //Attempt Any three

  check if visited page has title "Best Sedans For 2021 - Forbes Wheels", url includes "best/sedans/" & protocol "https"'

  click on Read more of intro section and check if it is expanding correctlty or not
  
  Scroll down to summary and click on show summary. Check if it is expanding or not. Click again and check if it is closing or not
  
  click on Show summary and again click on any one of the expanded link and check if it is scrolling to the correct view or not
  
  scroll to any of the car widget and check the tabs - why we picked it , pros & cons , specs are getting displayed or not on clicking
  
  click on any three add to compare button and check if bottom drawer is opening or not


  //Similarly you can check for the At a Glance table Add to compare - has similiar functionality

  //Visual Testing for the following Scenario

  1. visit the same page
  2. Expand Read more and Show Summary
  3. Add any three cars in compare by clicking Add to compare
  4. Test the same page for visual testing in Desktop ,  Mobile and Tablet after doing all the above steps.

```

### Debugging:

## core concept
- How Cypress queries the DOM
- How Cypress manages subjects and chains of commands
- What assertions look like and how they work
- How timeouts are applied to commands

## Dashboard


## Guides


## Testing strategies


## Continious integration

## Component Testing

## Tooling

## References


[solution-assignment2]:  https://github.com/shellbot97/literate-doodle/blob/main/cypress/integration/assignment-session2.js
[cheatsheet]: https://cheatography.com/aiqbal/cheat-sheets/cypress-io/