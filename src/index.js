import './style.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
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

  connectAuthEmulator(auth, 'http://localhost:9099')
  connectDatabaseEmulator(db, 'http://localhost', 9000)
}

// AUTH MODALS
const loginModal = document.querySelector('#login-modal')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')
const switchSignupBtn = document.querySelector('#switch-signup-btn')

const signupModal = document.querySelector('#signup-modal')
const signupUsernameInput = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')
const switchLoginBtn = document.querySelector('#switch-login-btn')

const openLoginModal = () => {
  loginModal.showModal()
}

const closeLoginModal = () => {
  loginModal.close()
}

const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  signupModal.close()
}

loginModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) closeLoginModal()
})

signupModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) closeSignupModal()
})

loginBtn.addEventListener('click', closeLoginModal)
signupBtn.addEventListener('click', closeSignupModal)

switchSignupBtn.addEventListener('click', () => {
  closeLoginModal()
  openSignupModal()
})
switchLoginBtn.addEventListener('click', () => {
  openLoginModal()
  closeSignupModal()
})

// HEADER
const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)