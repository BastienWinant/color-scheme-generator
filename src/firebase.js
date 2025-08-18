// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnKEY8-fHUZM0XGtxmJ1tNFdnmIbfa2h4",
  authDomain: "color-scheme-generator-86e43.firebaseapp.com",
  databaseURL: "https://color-scheme-generator-86e43-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "color-scheme-generator-86e43",
  storageBucket: "color-scheme-generator-86e43.firebasestorage.app",
  messagingSenderId: "562131969387",
  appId: "1:562131969387:web:1e8c8f685535a8ad43182e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
}