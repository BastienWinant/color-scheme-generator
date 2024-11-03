import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

// Firebase configuration
let firebaseConfig
if (process.env.NODE_ENV !== 'production') {
  firebaseConfig = {
    apiKey: "AIzaSyAAHBpxG_hpPn8gCvkvsMbIZ5n2Sk81x4w",
    authDomain: "color-scheme-generator-8ec07.firebaseapp.com",
    databaseURL: "https://color-scheme-generator-8ec07-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "color-scheme-generator-8ec07",
    storageBucket: "color-scheme-generator-8ec07.firebasestorage.app",
    messagingSenderId: "840175974043",
    appId: "1:840175974043:web:a115af036b8ff2b9c1783e"
  }
} else {
  firebaseConfig = {
    apiKey: "AIzaSyCYqeYDhki1VaWzKtrkHoNOHh3tf9Es3Ao",
    authDomain: "color-scheme-generator-aadfc.firebaseapp.com",
    databaseURL: "https://color-scheme-generator-aadfc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "color-scheme-generator-aadfc",
    storageBucket: "color-scheme-generator-aadfc.firebasestorage.app",
    messagingSenderId: "474333322342",
    appId: "1:474333322342:web:d3e2710c46eceec37ce1a7"
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)