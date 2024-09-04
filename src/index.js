import './style.css'

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getDatabase, connectDatabaseEmulator } from "firebase/database"

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

// HEADER
const navExpandBtn = document.querySelector('#nav-expand-btn')
const navContainer = document.querySelector('#nav-container')
const navAuthExpandBtn = document.querySelector('#nav-auth-expand-btn')
const navAuthContainer = document.querySelector('#nav-auth-btns-container')
const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')

const cancelLoginBtn = document.querySelector('#cancel-login-btn')
const cancelSignupBtn = document.querySelector('#cancel-signup-btn')

// EXPAND/COLLAPSE NAV
function expandNav() {
  navContainer.classList.add('nav-expanded')
}
navExpandBtn.addEventListener('click', expandNav)

function collapseNav() {
  navContainer.classList.remove('nav-expanded')
}
navContainer.addEventListener('click', e => {
  if (!e.target.closest('.nav')) {
    collapseNav()
  }
})

// EXPAND/COLLAPSE NAV AUTH
function expandNavAuth() {
  navAuthContainer.classList.add('nav-auth-expanded')
}
navAuthExpandBtn.addEventListener('click', expandNavAuth)

function collapseNavAuth() {
  navAuthContainer.classList.remove('nav-auth-expanded')
}
navAuthContainer.addEventListener('click', e => {
  if (!e.target.closest('.nav-auth-btns')) {
    collapseNavAuth()
  }
})

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})

// AUTHENTICATION BUTTONS
function openLoginModal() {
  document.querySelector('#login-modal').showModal()
}
navLoginBtn.addEventListener('click', openLoginModal)

function closeLoginModal() {
  document.querySelector('#login-modal').close()
}
cancelLoginBtn.addEventListener('click', closeLoginModal)

function openSignupModal() {
  document.querySelector('#signup-modal').showModal()
}
navSignupBtn.addEventListener('click', openSignupModal)

function closeSignupModal() {
  document.querySelector('#signup-modal').close()
}
cancelSignupBtn.addEventListener('click', closeSignupModal)