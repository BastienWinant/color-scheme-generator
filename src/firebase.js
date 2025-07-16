import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Firebase configuration
const firebase = {
	apiKey: "AIzaSyA_XK8Y4lVPUtWoNHi4nN44tKDhKfmDRwY",
	authDomain: "shademaker-df234.firebaseapp.com",
	databaseURL: "https://shademaker-df234-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "shademaker-df234",
	storageBucket: "shademaker-df234.firebasestorage.app",
	messagingSenderId: "312822357019",
	appId: "1:312822357019:web:bc4d9038e151c74ee4acbe"
};

// Initialize Firebase
export const app = initializeApp(firebase);
export const db = getDatabase(app);
export const auth = getAuth(app);

if (location.hostname === "localhost") {
	connectDatabaseEmulator(db, "localhost", 9000);
	connectAuthEmulator(auth, "http://localhost:9099");
	console.log('Looks like we are in development mode!');
}