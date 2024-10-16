import './style.css'

import { initializeApp } from "firebase/app"

let firebaseConfig
if (process.env.NODE_ENV !== 'production') {
  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  }

  console.log('Looks like we are in development mode!')
} else {
  firebaseConfig = {
    apiKey: "AIzaSyCMTcG_LF1bYI2DxJ8FsC7rHzcB8GQXPJM",
    authDomain: "color-scheme-generator-f60ff.firebaseapp.com",
    databaseURL: "https://color-scheme-generator-f60ff-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "color-scheme-generator-f60ff",
    storageBucket: "color-scheme-generator-f60ff.appspot.com",
    messagingSenderId: "296680716316",
    appId: "1:296680716316:web:bc35376ef85370755e47d9"
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
console.log(app)