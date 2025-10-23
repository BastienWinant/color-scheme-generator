# Color Scheme Generator

![Screenshot 1](/img/screenshot_1.png)
![Screenshot 2](/img/screenshot_2.png)

  Color Scheme Generator is a web application to create endless color palettes! 
  - Specify a seed color, color count, and mode.
  - Adjust a given color scheme by removing unwanted colors.
  - Save entire schemes or individual colors.

Check out the [live web app](https://color-scheme-generator-6a956.web.app/).

# Technologies in use / Tech Stack / Built with

  - React
  - Chakra UI
  - Firebase Realtime Database
  - Firebase Authentication
  - The Color API

# What I have learned

The focus of this project was the use of hooks and context providers in React. I learned how to use the Context API
for managing user authentication and minimizing prop drilling.

# What issues have I faced and how I resolved them

When I first tried to implement authentication in my application, I had trouble dealing with asynchronous calls to
the authentication service and how to properly redirect users. By following [this tutorial](https://www.youtube.com/watch?v=q2RZOiUD5E0),
I learned how to combine useEffect and useState hooks to get a working authentication flow.