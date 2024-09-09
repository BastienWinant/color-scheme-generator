import './style.css'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import { auth } from '../../app'

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')

export function openLoginModal() {
  loginModal.showModal()
}

export function closeLoginModal() {
  loginModal.close()
}
loginModal.addEventListener('click', e => {
  if (!e.target.closest('#login-form')) {
    closeLoginModal()
  }
})

export function openSignupModal() {
  signupModal.showModal()
}

export function closeSignupModal() {
  signupModal.close()
}
signupModal.addEventListener('click', e => {
  if (!e.target.closest('#signup-form')) {
    closeSignupModal()
  }
})

// login functionality
function loginEmailPassword(e) {
  e.preventDefault()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => console.log(userCredential))
    .catch(error => console.log(error.code))
}
loginBtn.addEventListener('click', loginEmailPassword)

// signup functionality
function signupEmailPassword(e) {
  e.preventDefault()

  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then(userCredential => console.log(userCredential))
    .catch(error => console.log(error.code))
}
signupBtn.addEventListener('click', signupEmailPassword)

// signout functionality
export function logOut() {
  signOut(auth)
}

async function monitorAuthState() {
  onAuthStateChanged(auth, () => {
    closeLoginModal()
    closeSignupModal()
  })
}
monitorAuthState()