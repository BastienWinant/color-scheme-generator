# ShadeMaker

[PLACE_FOR_YOUR_IMAGE]

[Demo link](https://firebase.google.com)

ShadeMaker is a web application that lets you generate infinite color schemes!
- Pick a seed color and a scheme mode as the basis for a palette
- Create an account to save your favorite colors and schemes
- Easily copy Hex/RGB/HSL color codes to the clipboard

# Technologies in use / Tech Stack / Built with

  - The Color API
  - Node.js
  - Webpack
  - Firebase Realtime Database
  - Firebase Authentication

# Installation
To install ShadeMaker locally, please follow the steps below:
  1. Clone the repo to your machine: `git clone ...`
  2. Navigate to the root of the project and install all dependencies with `npm i` / `yarn`
  3. Start the emulators: `firebase emulators:start --only auth,database`
  4. Start the test server: `npm run test`

# What I have learned
## Project Structure & Dependency Management
ShadeMaker was my most complete project to date, and I spent a significant amount of time on project structure and dependency managemnt. The codebase went through several rounds of refactoring throughout development, as I revised my overall implementation approach. There is still room for improvement, but it was a great opportunity for learning from mistakes that significantly extended development time.

## JavaScript Basics
I deliberately chose to stick with Vanilla JS throughout this project. The aim was to reinforce my command of JavaScript syntax, DOM updating, and object data manipulations. In implementing the application's functionalities, I made use of further Javascript features such as async/await for API data retrieval, and localStorage for tracking user modifications.

# What issues have I faced and how I resolved them

As previously noted, the whole app suffers from mild latency issues that affect the user experience. Despite carefully reading through the Webpack documentation on preloading/prefetching/lazy-loading, I was unable to gain a complete understanding of the different content loading options and their impact on latency. Through Googling and experimentation, I was able to get to a functional but (probably) suboptimal given the specifities of my project.

# Extensions/improvements
Below is a list of feasible extensions/improvements I have identified:
1. Ability to 'pin' individual colors between scheme generations
2. Ability to rearrange scheme colors with drag & drop
3. Use a random name generator API to assign names to saved scheme
4. Check got duplicates when the user saves a new color scheme
5. Complete responsivess: the design does not render well on short screens.

I renounced on implementing any of the above to allow myself to continue my learning journey and focus on React.

# Source

This project is an extension of the Color Scheme Generator Project from Scrimba's Front-End Developer Career Path curriculum.