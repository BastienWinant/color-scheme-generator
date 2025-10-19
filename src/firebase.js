// Import the functions from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCp95FFuAjWJfRtTBn5FlqmClUFrnGS2nw",
	authDomain: "color-scheme-generator-6a956.firebaseapp.com",
	databaseURL: "https://color-scheme-generator-6a956-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "color-scheme-generator-6a956",
	storageBucket: "color-scheme-generator-6a956.firebasestorage.app",
	messagingSenderId: "122260961769",
	appId: "1:122260961769:web:8bafd02b83660142d27378"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

if (location.hostname === "localhost") {
	// Point to the emulators running on localhost.
	connectAuthEmulator(auth, "http://127.0.0.1:9099");
	connectDatabaseEmulator(database, "127.0.0.1", 9000);

}