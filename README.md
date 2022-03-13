
This project was bootstrapped with CRA.

## Live Hosted Demo on Guthub Pages

https://natarajchakraborty.github.io/rc-deeplinkable-pagination
## Available Scripts

In the project directory, you can run:
### `yarn start`


## Steps to run:
In the project directory, you can run:
### `yarn`

followed by

### `yarn start`

Open localhost:3000 if not already opened.

### Design, Structure and Components of the Solution:

Code Structure:

      src/

         components/ - Contains the basic presentational components

              User - User Presentational Component, Renders user in compact form.

              Address - Renders address from location attribute of the api result

              Phone - Renders the phone number, strips '-'

              UserDetails - Renders the user in detailed form, used to show the user in LightBox


          hooks/ - Contains custom Hooks

              useFetch - Custom Hook to fetch data and cache it.

              usePageData - Custom Hook which loads the page specific data, and also exposes ways to increment and decrement page no.

              useSarch - Custom Hook which exposes search results

         styles/
              styles.css - Style for whole app writen in SCSS.

                  General Breakpoints Considered for Responsiveness:

                      375px,
                      425px,
                      768px,
                      1024px

        userContext.js

              creates Context and ContextProvider to pass around the user data to be shown in exapanded view.


Maintaining the State when reloaded:

This is achieved by using react-route history to encode the required state in the URL. When the page reloads, the URL parameters are used to set the component state to proper state, so that the same app states gets restored.

Reload restoration function works for 'Page', 'Search'.


