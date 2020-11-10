# Global College/Easy Access Counselor Portal
This is a caseload management tool for high school counselors developed by UNC-Chapel Hill CS+Social Good and COMP 523 in partnership with Vitaly Radsky and Rocky Moon.

## Installation & Set-Up
1. Install [Node.js and npm](https://www.npmjs.com/get-npm).
2. Clone this repository and `cd` into the cloned directory on your machine.
3. Run `npm install`.
4. In the firebase folder under src, create a file called `config.js`.
a. Once you reach this step, message one of the team leads for the config file.
5. Run `npm start`.
6. To make Stripe function, message the team leads for the secret token and run this command: `firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"`


Last updated November 8, 2020.

## Troubleshooting Common Installation Problems
If you get any "unable to resolve _____ module" errors, try deleting the node_modules folder and running `npm install` again.

## Testing
Testing is in need of a lot of work, there were no tests implemented prior to November 2020. Currently there are some boiler plate tests implemented that mostly focus on comparing snapshots of the code the previous dev team worked on but these tests are far from robust and it is strongly recommended that the next dev team devotes a considerable amount of time to implementing proper testing. Tests are simply run using the command `npm test` while in the project directory in terminal, for coverage reports use `npm test -- --coverage`

## Deployment
### By: Jeremy Venerella
Install the Firebase CLI tools
The easiest way is to run the command `npm install -g firebase-tools`
Other options https://firebase.google.com/docs/cli
From the terminal run `firebase login` and login to the rockymoon firebase Gmail account.
From the terminal navigate to the GlobalCollege directory
If you have not already, run the command `npm run build` in the GlobalCollege directory. This will build a deployable project into the folder /build.
 Now run the command `firebase init` , This will present you with the following: 

![](https://lh3.googleusercontent.com/2oogcRZ7V-qSwjC-Mxo4-RrRgrXT8oTvOCatul-uymQlniN1_nU2S5iSCAPadjBNNj-z6tFXkYBs2xZXnZalnNRFmZlrbODFrUVN9UBok6vL3gaY6Op5zaGBVMyyP4XROnJpHjJm)
Use the arrow keys to move to “Hosting: ”, press space to select and enter to confirm.
When asked what directory to use as your public directory, type `build` and hit enter. This will choose the build folder that was generated earlier.
You will then be prompted to configure it as a single page app. Type `y` for this option and press `enter`.
If asked to overwrite index.html, type `n` and press `enter`.
The command `firebase serve` can be run to test the website before deployment. This will start a local server similar to running npm start. You can press `ctrl+c` in the terminal to stop the server.
After confirming the website runs normally, run the command `firebase deploy` to deploy the site to firebase. 
If asked to delete any functions just type `n` and hit `enter`. 
After the deploy process finishes, the website should now be available at https://easyaccess-9ffaa.web.app/  or https://easyaccess-9ffaa.web.app/index if there is a routing issue

## Technologies Used
* Create React App:  https://create-react-app.dev/
* AG-grid: https://www.ag-grid.com/
* Mostly used in the caseload management view for the ‘excel’ style grid
* Note: the counselor portal uses the community version of AG-grid and is restricted from features of the enterprise edition of AG-grid
* Stripe: https://stripe.com/
* Used for payment processing, still barebones for now but it has been fully integrated into Firebase
* Firebase: see below to get access to the Firebase
* See ADR’s here: https://github.com/viradsky/EasyAccessCounselor/blob/master/ADR.md

## Project Structure
This section outlines some of the major sections of the project:
* `assets`: This folder contains images, audio, and other media for the project.
* `components`: Components are the building blocks of a React app. This folder should contain components that make up parts of a page, such as navbars, headers, buttons, etc.
* `css`: This folder contains stylesheets for views and components.
* `views`: Views are components that are also used in routing. You can think of these as pages.

## Contributors
For an unrestricted development process, be sure to get access to the associated service accounts used with the counselor portal React app:
* `Firebase`:
    * Sign into the rockymoon firebase Gmail account. (for login info contact Rocky Moon)
    * As mentioned in 'Installation &  Setup' be sure to acquire the **config.js** for use in the ./firebase/src folder
* `Github`: 
    * https://github.com/viradsky/EasyAccessCounselor
    * Request contributor access to the GitHub from Vitaly Radsky or Rocky Moon 
* `Stripe`:  
    * Message team leads, Rocky Moon, or Vitaly Radsky for login information
Previous contributions and work logs: 
* `COMP 523 Team Website`: https://tarheels.live/unceasyaccessteam/
    * For details on weekly accomplishments, see the Journals page.
    * For details on course work associated with the Easy Access project, see the Deliverables page.


## Contributing Resources
* [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html)
* A [guide](https://reactjs.org/docs/hello-world.html) to React concepts
* Many of the components were made using [Material UI](https://material-ui.com/).

## Authors
* Easy Access: Vitaly Radsky and Rocky Moon
* CS + Social Good
* COMP 523: Tanner Bluhm, Ian Dershem, Kipp Williams
## License
Copyright 2020 Vitaly Radsky
## Acknowledgements
Thank you to Adam Franzen for being an excellent mentor to the COMP 523 team while working on this project!
