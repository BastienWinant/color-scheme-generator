import './style.css'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { ref, set } from "firebase/database"

import { auth, db } from 'Src/app'

// AUTH MODALS
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

export const openLoginModal = () => {
  loginModal.showModal()
}

const closeLoginModal = () => {
  clearLoginError()
  clearLoginForm()
  loginModal.close()
}

export const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  clearSignupError()
  clearSignupForm()
  signupModal.close()
}

loginModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) closeLoginModal()
})

signupModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) closeSignupModal()
})

switchSignupBtn.addEventListener('click', () => {
  closeLoginModal()
  openSignupModal()
})
switchLoginBtn.addEventListener('click', () => {
  openLoginModal()
  closeSignupModal()
})

const clearLoginForm = () => {
  loginForm.reset()
}

const clearSignupForm = () => {
  signupForm.reset()
}

const clearLoginError = () => {
  try {
    loginFieldset.querySelector('.auth-error-message').remove()
  } catch (err) {}
}
const showLoginError = (err) => {
  clearLoginError()

  const errorMessage = err.code.replaceAll("/", ": ").replaceAll("-", " ")

  loginFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-error-message">${errorMessage}</p>`
  )
}

const loginEmailPassword = async (e) => {
  e.preventDefault()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  } catch (error) {
    showLoginError(error)
  }
}
loginBtn.addEventListener('click', loginEmailPassword)

const clearSignupError = () => {
  try {
    signupFieldset.querySelector('.auth-error-message').remove()
  } catch (err) {}
}

const showSignupError = (err) => {
  clearSignupError()

  let errorMessage = err.code || err.message

  errorMessage = errorMessage.replaceAll("/", ": ").replaceAll("-", " ")

  signupFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-error-message">${errorMessage}</p>`
  )
}

function writeUserData(user) {
  set(ref(db, 'users/' + user.uid), {
    username: user.displayName,
    email: user.email
  })
}
const signupEmailPassword = async (e) => {
  e.preventDefault()

  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  try {
    const userName = signupUsernameInput.value

    if (!userName) throw new Error("missing username")

    const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    userCredential.user.displayName = userName
    writeUserData(userCredential.user)
  } catch (err) {
    showSignupError(err)
  }
}
signupBtn.addEventListener('click', signupEmailPassword)