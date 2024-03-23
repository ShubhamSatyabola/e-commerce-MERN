# Introduction

This repository contains source code for an E - commerce web app . The web app is created using React and Redux and Tailwind Css . Other dependecies / libraries used in app are react-router-dom for handling page routing and react-form library for handling form data and validation the backend of app is on Node js and the database used is mongo db with mongoose ORM . to connect frontend and backend fetch Api is used . 

The App comprises of pages like .\
signup : for user registration.\
login : for logging in user.\
product page : for listing all product .\
order detail : for getting order details.\
profile : to see user details .\
chekout : for checking out .\
cart : for seeing the items added for shopping.

# Project folder Structure
locate `src` folder .\
`/src/app/constant` : folder consist of constant function used in project.\
`/src/app/store` : folder consist of redux store for reducers and state management.\
`/src/features` : Different feature are created and have their functionalities in their respective folders . Each feature has three js file in it , Component file which has the component logic , and Api.js which has all the Api logic and an slice.js file for handling the reducer logic and managing the state .\
`/src/pages`:  Each file in this folder consist of various pages which combine component  from feature folder .\
`/src/App` : The file in /src folder handles all the render logic used . 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
