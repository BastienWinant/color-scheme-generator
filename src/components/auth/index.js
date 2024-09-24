import './style.css'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

import { auth, db } from 'Src/app'

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginFieldset = document.querySelector('#login-fieldset')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupFieldset = document.querySelector('#signup-fieldset')
const signupUsernameInput = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')

export const openLoginModal = () => {
  loginModal.showModal()
}

const closeLoginModal = () => {
  loginModal.close()
}

export const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  signupModal.close()
}

// AUTHENTICATION
const loginEmailPassword = async (e) => {
  e.preventDefault()

  try {
    const loginEmail = loginEmailInput.value
    const loginPassword = loginPasswordInput.value

    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    console.log(userCredential)
  } catch (error) {
    console.log(error.message)
  }
}
loginBtn.addEventListener('click', loginEmailPassword)

const signupEmailPassword = async (e) => {
  e.preventDefault()

  try {
    const signupUsername = signupUsernameInput.value

    if (!signupUsername) throw new Error("invalid username")

    const signupEmail = signupEmailInput.value
    const signupPassword = signupPasswordInput.value

    console.log(signupEmail)
    console.log(signupPassword)

    const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    userCredential.user.displayName = signupUsername

    console.log(userCredential)

    // TODO: write the user data to the database
  } catch (error) {
    console.log(error.code)
  }
}
signupBtn.addEventListener('click', signupEmailPassword)

console.log('This is the auth module')