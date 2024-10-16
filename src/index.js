import './style.css'

import { initializeApp } from "firebase/app";

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
  console.log('Looks like we are in development mode!');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)