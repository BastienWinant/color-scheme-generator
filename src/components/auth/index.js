import 'Src/style.css'
import './style.css'

import(/* webpackPreload: true */ 'Src/app.js')

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { ref, set } from "firebase/database"

import { auth, db } from 'Src/app'

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

const loginEmailPassword = async (e) => {
  e.preventDefault()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    console.log(userCredential.user)
  } catch (e) {
    console.log(e.code)
  }
}
loginBtn.addEventListener('click', loginEmailPassword)

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
    const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    userCredential.displayName = signupUsernameInput.value
    writeUserData(userCredential.user)
  } catch (e) {
    console.log(e.code)
  }
}
signupBtn.addEventListener('click', signupEmailPassword)

export const logOut = async (e) => {
  signOut(auth)
}