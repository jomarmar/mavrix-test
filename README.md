# Jorge's Mavrix Agenda

It's been a hard week. One of my kids ill and a work peak at my current job. Anyway, I must say
I have enjoyed making this small application hope you like it!.

## Libraries used

- "angular": Obviously.
- "angular-route": for creating the main structure of navigation.
- "angular-loader":
- "angular-resource": to access countries data.
- "angular-mocks": testing.
- "angular-sanitize":
- "angular-messages": for validation
- "angular-ui-select": for weird select components.
- "ng-storage": for local storage
- "jquery":
- "jquery-validate": for validation
- "bootstrap":
- "angular-bootstrap":
- "string.startsWith":

## Code Structure

```
app/                    --> all of the source files for the application
  components/           --> all app specific modules: services and others
  views/                --> the views of the application
  mavrix-agenda.js      --> main application module
  index.html            --> app layout file (the main html template file of the app)
  karma.conf.js           --> config file for running unit tests with Karma
  e2e-tests/              --> end-to-end tests
    protractor-conf.js    --> Protractor config file
    scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Tests

Unit tests are at the same level of the library being tested. Because of time I haven't provided
very exhaustive tests. Just small samples.

E2E tests under e2e-tests. Same as before. Only positive result testing just to make sure normal
usage (as specified) works fine.

### Run tests
Unit Tests (Karma)

```
$ npm test

```
E2E Tests (Protractor)

```
$ npm start

Then on other terminal:

$ npm run protractor

```

## Specials

I have added a multi-user feature. You can use different agendas based on the name you use to login.
That's why the login!.

Pagination works fine!...

~~Filtering contacts not working. Not sure if I have found a bug or I have messed it up with pagination stuff.
(NOTE: filtering should happen on all contact list, not just in the contacts per page).~~
Filtering now works. Forgot controller (vm).

## Improvements

Added on new commit: After deleting the agenda redirects to main page.


## TODO's

- Fix 'weird' select box (clicking not working properly, you need to use arrow keys). Maybe it is
just better to use an input with autocompletion.
- ~~Add confirmation dialogs when deleting, modifying a contact~~
- Improve interface :). Not very good at designing
- I would've liked to provide one view to show the agenda in a table and another with divs... No
time.
- Improve validation
- ~~Fix filter on contacts.~~
