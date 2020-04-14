# Global College/Easy Access
This is a caseload management tool for high school counselors developed by UNC-Chapel Hill CS+Social Good in partnership with Vitaly Radsky.

## Installation & Set-Up
1. Install [Node.js and npm](https://www.npmjs.com/get-npm).
2. Clone this repository and `cd` into the cloned directory on your machine.
3. `cd globalcollege`. (This is a temporary step and will eventually be removed.)
4. Run `npm install`.
5. In the firebase folder under src, create a file called `config.js`.
  a. Once you reach this step, message one of the team leads for the config file.
6. Run `npm start`.

### Troubleshooting Common Installation Problems
If you get any "unable to resolve _____ module" errors, try deleting the node_modules folder and running `npm install` again.

## Project Structure
This section outlines some of the major sections of the project:
* `assets`: This folder contains images, audio, and other media for the project.
* `components`: Components are the building blocks of a React app. This folder should contain components that make up parts of a page, such as navbars, headers, buttons, etc.
* `css`: This folder contains stylesheets for views and components.
* `views`: Views are components that are also used in routing. You can think of these as pages.

## Resources
* [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html)
* A [guide](https://reactjs.org/docs/hello-world.html) to React concepts
* Many of the components were made using [Material UI](https://material-ui.com/).