import './style.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getDatabase, connectDatabaseEmulator } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0nsNOxsYWPyiUvl9MegEc5dXBDhoRnLg",
  authDomain: "color-scheme-generator-d19c2.firebaseapp.com",
  databaseURL: "https://color-scheme-generator-d19c2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "color-scheme-generator-d19c2",
  storageBucket: "color-scheme-generator-d19c2.appspot.com",
  messagingSenderId: "467990624550",
  appId: "1:467990624550:web:4c8849019c2d8514c729e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectDatabaseEmulator(db, "localhost", 9000)
}