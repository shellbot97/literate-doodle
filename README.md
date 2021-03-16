# Cypress 

## [Overview]
- What Cypress is and why you should use it
    - next generation front end testing tool built for the modern web
    - easy to use,
        1. Set-up tests
        2. Write tests
        3. Run tests
        4. Debub tests
    - types of tests which can be written,
        1. End-to-end testing (testing method that involves testing an application's workflow from beginning to end)
        2. Integration tests
        3. Unit tests
    - Cypress can test anything that runs in a browser! 🤩
    - eco-system:
        1. start writing tests every day while you build your application locally. TDD at its best!
        2. After building up a suite of tests and integrating Cypress with your CI Provider, our Dashboard Service can record your test runs.
- Key Cypress features
    - Cross browser Testing
    - Screenshots and Videos
    - Easily control, stub, and test edge cases without involving your server. You can stub network traffic however you like.
    - Never add waits or sleeps to your tests. Cypress automatically waits for commands and assertions before moving on. No more async hell.
    

## [Getting started]

### Setup:

(Considering that you are using ubuntu, because **Free Software, Hell Yeah!**😈  )
Cypress requires following dependancies to run smoothly,
| Dependancy | Doc | Version |
| ------ | ------ | ------ |
| Linux Ubuntu | https://ubuntu.com/download/desktop/thank-you?version=20.04.2.0&architecture=amd64 | 12+ |
| Node.js | https://nodejs.org/en/download/ | 12+ |

Dependancies on linux:
```sh
sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```
| Option in command | Meaning
| ------ | ------ |
| ```libgtk2.0-0``` | GTK is a multi-platform toolkit for creating graphical user interfaces. |
| ```libgtk-3-0``` | GTK is a multi-platform toolkit for creating graphical user interfaces. |
| ```libgbm-dev``` | It provides a mechanism for allocating buffers for graphics rendering tied to Mesa. |
| ```libnotify-dev``` | A library that sends desktop notifications to a notification daemon, as defined in the Desktop Notifications spec. These notifications can be used to inform the user about an event or display some form of information without getting in the user's way. |
| ```libgconf-2-4``` | GConf is a configuration database system for storing application preferences. |
| ```libnss3``` | designed to support cross-platform development of security-enabled client and server applications. |
| [libxss1] | X Window System client interface to the MIT-SCREEN-SAVER extension to the X protocol. |
| ```libxtst6``` | https://packages.debian.org/sid/libxtst6 |
| ```xauth``` | xauth program is used to edit and display the authorization information used in connecting to the X server |
| ```xvfb``` | in-memory display server for UNIX-like operating system (e.g., Linux) |


### Installing:
```sh
$ your/directory: cd /your/project/path
$ your/directory: sudo npm init
$ your/directory: npm install cypress --save-dev
```
| Option in command | Meaning
| ------ | ------ |
| ```--save-dev``` | Start cypress in dev dependancy (Development dependencies are intended as development-only packages, that are unneeded in production) |

*This might take some time(~ 30 mins), go have a tea-break till then 🍵!

### Opening Cypress:
```sh
$ your/directory: node_modules/.bin/cypress open
```

### Hello World of Automation!🤩 Writing the first test case:

#### Add a test file:
```sh
$ your/directory: touch sample_spec.js
```
Once done, it should be visible in our cypress, which was launched in the step before.
If you click on it, cypress will automatically execute it and show the dafault page(since out ```sample_spec.js``` file is empty.)

#### Write your first test:
To get ourself familier with the UI, we can write one passing and one failing test as below,

```js
// passing test, which asserts true with true
describe('My First Test', () => {
  it('asserts true with true', () => {
    expect(true).to.equal(true)
  })
})

// failing test, which asserts true with false
describe('My second Test', () => {
  it('asserts true with false', () => {
    expect(true).to.equal(false)
  })
})
```
You must've realized it by now, Cypress' got hot reloading 🔥!


#### Write a real test:

Testing an application mainly contains 3 steps,
1. First you put the application into a specific state
2. then you take some action in the application that causes it to change
3. and finally you check the resulting application state.

We can map it up with cypress commands,
1. Visit a web page.
2. Query for an element.
3. Interact with that element.
4. Assert about the content on the page.

##### 1. Visit a page:
Lets visit a demo page!
```js
describe('My Third Test', () => {
  it('Visits a demo webiste', () => {
    cy.visit('https://www.google.com')
  })
})
```

##### 2. Query for an element:
Now that we’ve got a page loaded, Why don’t we click a link on the page? let’s go look for one we like… how about type?
```js
describe('My Forth Test', () => {
  it('finds the content "type"', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type')
  })
})
```

##### 3. Click an element:
We can click the element under control using ```.click()``` function which cypress gives us,
```js
describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()
  })
})
```
##### 4. Make an assertion:
Lets make an assertion regarding the element in control to get a standard true/false output,
```js
describe('My First Test', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')
  })
})
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


## License

MIT

**Free Software, Hell Yeah!**

[overview]: https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell
[getting started]: https://docs.cypress.io/guides/getting-started/installing-cypress.html
[libxss1]: https://packages.debian.org/sid/libxss1