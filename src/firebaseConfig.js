import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA_XK8Y4lVPUtWoNHi4nN44tKDhKfmDRwY",
	authDomain: "shademaker-df234.firebaseapp.com",
	databaseURL: "https://shademaker-df234-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "shademaker-df234",
	storageBucket: "shademaker-df234.firebasestorage.app",
	messagingSenderId: "312822357019",
	appId: "1:312822357019:web:bc4d9038e151c74ee4acbe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);