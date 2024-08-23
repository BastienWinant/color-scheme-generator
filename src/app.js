import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getDatabase, connectDatabaseEmulator} from "firebase/database"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDB = getDatabase(firebaseApp)

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
  connectAuthEmulator(firebaseAuth, "http://localhost:9099")
  connectDatabaseEmulator(firebaseDB, "http://localhost:9000")
}