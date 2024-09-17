import 'Src/style.css'
import './style.css'

import { auth } from 'Src/app'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

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

const closeLoginModal = () => {
  loginForm.reset()
  loginModal.close()
}
loginModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) {
    closeLoginModal()
  }
})

const closeSignupModal = () => {
  signupForm.reset()
  signupModal.close()
}
signupModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) {
    closeSignupModal()
  }
})

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
loginBtn.addEventListener('click', (e) => {
  const user = loginEmailPassword(e)

  if (user) closeLoginModal()
})

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
signupBtn.addEventListener('click', (e) => {
  const user = signupEmailPassword(e)

  if (user) closeSignupModal()
})