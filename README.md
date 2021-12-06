# Global College/Easy Access Counselor Portal

This is a caseload management tool for high school counselors developed by UNC-Chapel Hill CS+Social Good and COMP 523 in partnership with Vitaly Radsky and Rocky Moon.

## Set-up

1. Install [Node.js](https://www.npmjs.com/get-npm) and [git](https://git-scm.com/downloads).
2. Clone this repository and `cd` into the cloned directory on your machine.
3. Install all of the dependencies by running `npm install`. It will tell you it has a lot of vulnerabilities but it should still work even if you don't run npm audit fix.
4. In the firebase folder under src, create a file called `config.js`. So its: ./src/firebase/config.js
5. Once you reach this step, message one of the team leads for the config file.
6. To start your local testing server, run `npm start` and the local server should be accessible at localhost:3000.
7. (optinal) To make Stripe function, message the team leads for the secret token and run this command: `firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"`

Last updated November 14, 2021.

### Troubleshooting Common Installation Problems:

- If you get any "unable to resolve **\_** module" errors, try deleting the node_modules folder and running `npm install` again.
- If your server still cannot start, it might be a dependency being too old and no longer supported. Try running `npm audit fix` and see if this works.

## Testing

- Testing still needs a lot of work. Currently there are some boiler plate tests implemented that mostly focus on comparing snapshots of the code. However, as the file structure and everything changes, these tests might be no longer valid. So we strongly recomend that the future teams put some more time into testing. You can use the existing code to help you add more test cases and create more snapshots of the project to compare with.
- Tests are simply run using the command `npm test` while in the project directory in terminal, for coverage reports use `npm test --coverage`

Note: As of May 2021, several of the tests written in 2020 fail due to snapshots not matching after our edits to several files

## Deployment

- Install the Firebase CLI tools
  - The easiest way is to run the command `npm install -g firebase-tools`
  - Other options https://firebase.google.com/docs/cli
- From the terminal run `firebase login` and login to the rockymoon firebase Gmail account.
- From the terminal navigate to the project's root directory (not your laptop's root directory.)
- If you have not already, run the command `npm run build` in the GlobalCollege directory. \* \* This will build a deployable project into the folder /build.
- Now run the command `firebase init` , This will present you with the following:

  - ![](https://lh3.googleusercontent.com/2oogcRZ7V-qSwjC-Mxo4-RrRgrXT8oTvOCatul-uymQlniN1_nU2S5iSCAPadjBNNj-z6tFXkYBs2xZXnZalnNRFmZlrbODFrUVN9UBok6vL3gaY6Op5zaGBVMyyP4XROnJpHjJm)
  - Use the arrow keys to move to “Hosting: ”, press space to select and enter to confirm.

- When asked what directory to use as your public directory, type `build` and hit enter. This will choose the build folder that was generated earlier.
- You will then be prompted to configure it as a single page app. Type `y` for this option and press `enter`.
- If asked to set up automatic builds and deploys with GiHub? Type `n'
- If asked to overwrite index.html, type `n` and press `enter`.
- Before deploying to the main app URL, you can deploy it to a preview channel. You can find details about it in the next section.
- After confirming the website runs normally, run the command `firebase deploy` to deploy the site to firebase.
- If asked to delete any functions just type `n` and hit `enter`.
- After the deploy process finishes, the website should now be available at https://easyaccess-9ffaa.web.app/ or https://easyaccess-9ffaa.web.app/index if there is a routing issue

### Deplying a staging server

- Firebase now supports what they call preview channels, so you can use this to deploy a temporarily URL and firebase will delete it after a few weeks.
- To do so, after setting up the firebase set up in the previous section, run the following command: `firebase hosting:channel:deploy preview_name`
- You should see the preview URL in your terminal after it is done. These channels will self delete after a certain amount of time. You still have to deploy to the main channel afterwards.

## Technologies Used

- Create React App: https://create-react-app.dev/
- AG-grid: https://www.ag-grid.com/
  - Mostly used in the caseload management view for the ‘excel’ style grid
  - Note: the counselor portal uses the community version of AG-grid and is restricted from features of the enterprise edition of AG-grid
- Stripe: https://stripe.com/
  - Used for payment processing, still barebones for now but it has been fully integrated into Firebase
- Firebase: Hosting the current backend database and the webapp frontend. The future backend should move out of Firebase. See below to get access to the Firebase.
- MongoDB: The database to host the new backend.
- Sails.js: Recommend using this framework's backend to create the new backend database.
- See ADR’s here: https://github.com/viradsky/EasyAccessCounselor/blob/master/ADR.md

## Project Structure

### Frontend structure

- `assets`: This folder contains images, audio, and other media for the project.
- `components`: Components are the building blocks of a React app. This folder should contain components that make up parts of a page, such as navbars, headers, buttons, etc. Each individual component should be in their own file. So each file should on average be around a hundred to three hundred lines of code. No components should be more than a thousand lines. If it is the case, then it is very likely that one component is doing way too much and should be broken down further.
- `css`: This folder contains stylesheets for views and components (Although I recomend using styled components for each components which can avoid css polution. For more information on what it is check [here](https://styled-components.com/)).
- `views`: Views are components that are also used in routing. You can think of these as pages.

### Backend Redesign and Documentation

- Currently, the backend database is hosted on Firebase still. It has no schema to keep or organized and efficent.
- In the documentation bellow is a redesign of the databse.
- https://docs.google.com/document/d/1w08dYKOnbREglLhP7xEJ8Huyv5diENpxM1cdyH1SDyI/edit?usp=sharing
- We recomend implementing this using MongoDB and Sails.js.

## Contributing

For an unrestricted development process, be sure to get access to the associated service accounts used with the counselor portal React app:

- `Firebase`:
  - Sign into the rockymoon firebase Gmail account. (for login info contact Rocky Moon)
  - As mentioned in 'Installation & Setup' be sure to acquire the **config.js** for use in the ./firebase/src folder
- `Github`:
  - https://github.com/viradsky/EasyAccessCounselor
  - Request contributor access to the GitHub from Vitaly Radsky or Rocky Moon
- `Stripe`:  
   \* Message team leads, Rocky Moon, or Vitaly Radsky for login information
  Previous contributions and work logs:
- `COMP 523 Fall 2020 Team Website`: https://tarheels.live/unceasyaccessteam/
  - For details on weekly accomplishments, see the Journals page.
  - For details on course work associated with the Easy Access project, see the Deliverables page.
- `COMP 523 Spring 2021 Team Website`: https://tarheels.live/comp523teamm/
- `COMP 523 Fall 2021 Team Website`: https://comp523-fall21-h.herokuapp.com/ (You can publish static websites to heroku by wrapping a php wrapper around the HTML index file.)

### Contributing Resources

- [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- A [guide](https://reactjs.org/docs/hello-world.html) to React concepts
- Many of the components were made using [Material UI](https://material-ui.com/).

## Authors

- Easy Access: Vitaly Radsky and Rocky Moon
- CS + Social Good
- COMP 523 Fall 2020: Tanner Bluhm, Ian Dershem, Kipp Williams
- COMP 523 Spring 2021: Hannah Bodnar, Gaurachandra Das, Nada Rahmouni, Emily Stahle
- Innovate Carolina Summer 2021: Owen Stegall, Jackson Lei, Emily Menay, Kenny Moore
- COMP 523 Fall 2021: Peter Liu, Leo Huang, Mike Zhang (Redesigned the backend, cleaned up the code for the frontend so no more 2000+ lines of code per components, & college list functionality)

## License

Copyright 2020 Vitaly Radsky

## Acknowledgements

Thank you to Adam Franzen, Mike Lake, and Benjamin Pollack for being excellent mentors to the COMP 523 teams while working on this project!
