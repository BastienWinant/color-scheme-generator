import 'Src/style.css'
import './style.css'

import { auth, db } from 'Src/app'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  ref,
  set
} from "firebase/database"

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginFieldset = document.querySelector('#login-fieldset')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')
const switchSignupBtn = document.querySelector('#switch-signup-btn')

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupFieldset = document.querySelector('#signup-fieldset')
const signupUsernameInput = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')
const switchLoginBtn = document.querySelector('#switch-login-btn')

// OPEN/CLOSE LOGIN MODAL
const openLoginModal = () => {
  loginModal.showModal()
}

const closeLoginModal = () => {
  clearLoginError() // remove error message
  loginForm.reset() // clear form inputs
  loginModal.close() // close modal
}
loginModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) {
    closeLoginModal()
  }
})

// OPEN/CLOSE SIGNUP MODAL
const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  clearSignupError() // remove error message
  signupForm.reset() // clear form inputs
  signupModal.close() // close modal
}
signupModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) {
    closeSignupModal()
  }
})

switchLoginBtn.addEventListener('click', () => {
  closeSignupModal()
  openLoginModal()
})

switchSignupBtn.addEventListener('click', () => {
  closeLoginModal()
  openSignupModal()
})

// LOGIN ERROR HANDLING
const clearLoginError = () => {
  try {
    loginFieldset.querySelector('.auth-error-msg').remove()
  } catch {
    return
  }
}

const showLoginError = (e) => {
  clearLoginError()

  const errorMessage = e.code.replace("auth/", "error: ").replace("-", " ")
  loginFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-error-msg">${errorMessage}</p>`
  )
}

// SIGNUP ERROR HANDLING
const clearSignupError = () => {
  try {
    signupFieldset.querySelector('.auth-error-msg').remove()
  } catch {
    return
  }
}

const showSignupError = (e) => {
  clearSignupError()

  const errorMessage = e.code.replace("auth/", "error: ").replace("-", " ")

  signupFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-error-msg">${errorMessage}</p>`
  )
}

// LOGIN FUNCTIONALITY
const loginEmailPassword = (e) => {
  e.preventDefault()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value
  
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(closeLoginModal)
    .catch(showLoginError)
}
loginBtn.addEventListener('click', loginEmailPassword)

// SIGNUP FUNCTIONALITY
function writeUserData(userCredential) {
  const userId = userCredential.user.uid
  const userName = userCredential.user.displayName
  const userEmail = userCredential.user.email

  set(ref(db, 'users/' + userId), {
    username: userName,
    email: userEmail
  })
}

const signupEmailPassword = (e) => {
  e.preventDefault()

  const signupUsername = signupUsernameInput.value
  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then(userCredential => {
      userCredential.user.displayName = signupUsername
      
      closeSignupModal()
      writeUserData(userCredential)
    })
    .catch(showSignupError)
}
signupBtn.addEventListener('click', signupEmailPassword)