import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAAHBpxG_hpPn8gCvkvsMbIZ5n2Sk81x4w",
  authDomain: "color-scheme-generator-8ec07.firebaseapp.com",
  databaseURL: "https://color-scheme-generator-8ec07-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "color-scheme-generator-8ec07",
  storageBucket: "color-scheme-generator-8ec07.firebasestorage.app",
  messagingSenderId: "840175974043",
  appId: "1:840175974043:web:a115af036b8ff2b9c1783e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)