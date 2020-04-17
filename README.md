## Desert Run

## What is it?
A coin-collecting game built on HTML Canvas. Move forward (to the right) over the hills and collect as many coins as you can. The more you collect and the further you travel, the higher your score! Be careful of flipping over, though--if you crash you'll have to start over.

Your score is calculated after you've lost all your lives and then saved to the leaderboard if you have a high score. If you'd like to change anything about your account, click your user avatar icon in the upper-left portion of the screen and select "edit" on the profile page.

## Installation instructions:
This project was built using React to handle components and state and Ruby on Rails to handle user and score data. To run the server locally, you may need to create a database (rails db:create in your command line), format it (rails db:migrate) and seed (rails db:seed). Once the database has been built and populated, run rails s (or rails server) in the command line to allow for interaction between the app and the database.

On the React side, run npm install and then npm start to start the app. You will be brought automatically to the login screen but can navigate to "signup" if it's your first time playing.

## Credits:
This project was a collaboration between Luis Alejo and Mike Diaz. Credit for the game's template can be found here: https://youtu.be/MW8HcwHK1S0

## Dependencies:
"@testing-library/jest-dom": "^4.2.4",
"@testing-library/react": "^9.3.2", 
"@testing-library/user-event": "^7.1.2", 
"bootstrap": "^4.4.1", 
"node-sass": "^4.13.1", 
"react": "^16.13.1", 
"react-bootstrap": "^1.0.0", 
"react-dom": "^16.13.1", 
"react-router-dom": "^5.1.2", 
"react-scripts": "3.4.1"

Below are the README details automatically populated by react:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
