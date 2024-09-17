import { auth } from 'Src/app'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

const loginModal = document.querySelector('#login-modal')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')

const signupModal = document.querySelector('#signup-modal')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')

const loginEmailPassword = async (e) => {
  e.preventDefault()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    console.log(userCredential)
  } catch (e) {
    console.log(e)
    // TODO: showLoginError => use AuthErrorCodes
  }
}
loginBtn.addEventListener('click', loginEmailPassword)

const signupEmailPassword = async (e) => {
  e.preventDefault()

  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    console.log(userCredential.user)
  } catch(e) {
    console.log(e)
    // TODO: showSignupError => use AuthErrorCodes
  }
}
signupBtn.addEventListener('click', signupEmailPassword)