## BookingGo Technical Test ([]())
##### A React Application bootstrapped with Create React App for the BookingGo technical test.
##### Created by Sam Fullen.
##### I did some snapshot testing using Jest and Enzyme.
##### The styling is done with Bootstrap 4 and Sass.
##### The package manager used was yarn.
##### I used Eslint to the AirBnb standard
---
## Running the project locally
### Prerequisites
- You must have a recent version of Node JS installed on your machine [https://nodejs.org/en/download/]()
- You must also have yarn installed on your machine [https://yarnpkg.com/lang/en/]()

### Clone the repository using GIT
```
https://github.com/Sfullen96/bookingGo.git
```

### Navigate into the folder
```
cd bookingGo
```
### Install the node modules
```
yarn install
```
### Run the start script
```
yarn start
```
---
## Built With
- [React JS](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Webpack](https://webpack.js.org/)
- HTML
- CSS
- [SASS](https://sass-lang.com/)
- [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [Jest](https://jestjs.io/)
- [Enzyme](https://github.com/airbnb/enzyme)
- [Yarn](https://yarnpkg.com/lang/en/)
- Eslint
---
## Directory Structure
- All of my own code can be found in the /src directory
- The /src/components directory holds the stateless components whereas the /src/containers directory contains the stateful components
- /src/css hold some of my common css/sass including the mixins for the mobile first approach
- /src/__tests__/* holds my snapshot tests
- /src/hoc holds my higher order component(s)
---
## Good to know
### To run the test suite
```
yarn test
```
### If you have an error in the code with Eslint to do with linebreaks, see the .eslintrc.js file line 9 and change the line-break-style to `"linebreak-style": ["error", "windows"]` for windows or `"linebreak-style": ["error", "unix"]` for unix based systems