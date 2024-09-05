import './style.css'

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getDatabase, connectDatabaseEmulator } from "firebase/database"

import { openLoginModal } from './components/auth-forms/login'
import { openSignupModal } from './components/auth-forms/signup'

import {
  header,
  expandNav, collapseNav,
  expandNavAuth, collapseNavAuth,
  navLoginBtn, navSignupBtn
 } from './components/header';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')

  connectAuthEmulator(auth, "http://127.0.0.1:9099")
  connectDatabaseEmulator(db, "127.0.0.1", 9000)
}

header.addEventListener('click', e => {
  console.log(e.target)
  if (e.target.closest("#nav-expand-btn")) {
    expandNav()
  } else if (e.target.closest("#nav-auth-expand-btn")) {
    expandNavAuth()
  } else if (e.target === navLoginBtn) {
    collapseNav()
    collapseNavAuth()
    openLoginModal()
  } else if (e.target === navSignupBtn) {
    collapseNav()
    collapseNavAuth()
    openSignupModal()
  } else if (e.target.id === "nav-logout-btn") {
  } else if (!e.target.closest('.nav')) {
    collapseNav()
  } else if (!e.target.closest('.nav-auth-btns')) {
    collapseNavAuth()
  }
})

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})