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

export function openLoginModal() {
  loginModal.showModal()
}

export function closeLoginModal() {
  clearLoginForm()
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
  clearSignupForm()
  signupModal.close()
}
signupModal.addEventListener('click', e => {
  if (!e.target.closest('#signup-form')) {
    closeSignupModal()
  }
})

// login functionality
function clearLoginForm() {
  loginForm.reset()
}

function showLoginError(error) {
  loginFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-form-error">Error: ${error.code}</p>`
  )
}

function clearLoginError() {
  try {
    loginFieldset.querySelector('.auth-form-error').remove()
  } catch {
    return
  }
}

function loginEmailPassword(e) {
  e.preventDefault()
  clearLoginError()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => console.log(userCredential))
    .catch(showLoginError)

  
  clearLoginForm()
}
loginBtn.addEventListener('click', loginEmailPassword)

// signup functionality
function clearSignupForm() {
  signupForm.reset()
}

function showSignupError(error) {
  signupFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-form-error">Error: ${error.code}</p>`
  )
}

function clearSignupError() {
  try {
    signupFieldset.querySelector('.auth-form-error').remove()
  } catch {
    return
  }
}

function signupEmailPassword(e) {
  e.preventDefault()
  clearSignupError()

  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then(userCredential => console.log(userCredential))
    .catch(showSignupError)
  
  
  clearSignupForm()
}
signupBtn.addEventListener('click', signupEmailPassword)

cancelLoginBtn.addEventListener('click', closeLoginModal)
cancelSignupBtn.addEventListener('click', closeSignupModal)

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