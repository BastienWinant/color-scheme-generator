import './style.css'

import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { ref, set } from "firebase/database"

import { auth, db } from '../../app'

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginFieldset = document.querySelector('#login-form fieldset')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')
const cancelLoginBtn = document.querySelector('#cancel-login-btn')

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupFieldset = document.querySelector('#signup-form fieldset')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')
const cancelSignupBtn = document.querySelector('#cancel-signup-btn')

// open/close login modal
export function openLoginModal() {
  loginModal.showModal()
}

function closeLoginModal() {
  clearLoginError()
  loginForm.reset()
  loginModal.close()
}
loginModal.addEventListener('click', e => {
  if (!e.target.closest('#login-form')) {
    closeLoginModal()
  }
})

// open/login signup modal
export function openSignupModal() {
  signupModal.showModal()
}

function closeSignupModal() {
  clearSignupError()
  signupForm.reset()
  signupModal.close()
}
signupModal.addEventListener('click', e => {
  if (!e.target.closest('#signup-form')) {
    closeSignupModal()
  }
})

// login functionality
function clearLoginError() {
  try {
    loginForm.querySelector('.auth-error-message').remove()
  } catch {
    return
  }
}

function showLoginError(error) {
  loginFieldset.insertAdjacentHTML(
    'afterend',
    `<p class="auth-error-message">${error.code}</p>`
  )
}

async function loginEmailPassword(e) {
  e.preventDefault()
  clearLoginError()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .catch(showLoginError) // showLoginError
}
loginBtn.addEventListener('click', loginEmailPassword)

// signup functionality
function clearSignupError() {
  try {
    signupForm.querySelector('.auth-error-message').remove()
  } catch {
    return
  }
}

function showSignupError(error) {
  signupFieldset.insertAdjacentHTML(
    'afterend',
    `<p class="auth-error-message">${error.code}</p>`
  )
}

function writeUserData(userCredential) {
  const userId = userCredential.user.uid
  const userEmail = userCredential.user.email

  set(ref(db, 'users/' + userId), {
    email: userEmail
  })
}
async function signupEmailPassword(e) {
  e.preventDefault()
  clearSignupError()

  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then(writeUserData)
    .catch(showSignupError)
}
signupBtn.addEventListener('click', signupEmailPassword)

// logout functionality
export async function logOut(e) {
  e.preventDefault()

  signOut(auth)
}

cancelLoginBtn.addEventListener('click', closeLoginModal)
cancelSignupBtn.addEventListener('click', closeSignupModal)

async function monitorAuthState() {
  onAuthStateChanged(auth, () => {
    closeLoginModal()
    closeSignupModal()
  })
}
monitorAuthState()