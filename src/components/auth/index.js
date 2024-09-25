import './style.css'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"

import { auth } from "Src/app"

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupFieldset = document.querySelector('#signup-fieldset')
const signupUsername = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginFieldset = document.querySelector('#login-fieldset')
const loginUsername = document.querySelector('#login-username')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')

export const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  signupModal.close()
}

const signupEmailPassword = async (e) => {
  e.preventDefault()

  const username = signupUsername.value
  const email = signupEmailInput.value
  const password = signupPasswordInput.value

  if (!username) throw new Error('invalid username')

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)
  } catch (error) {
    console.log(error.message)
  }
}

signupBtn.addEventListener('click', signupEmailPassword)

export const openLoginModal = () => {
  loginModal.showModal()
}

const closeLoginModal = () => {
  loginModal.close()
}

const loginEmailPassword = async (e) => {
  e.preventDefault()

  const email = loginEmailInput.value
  const password = loginPasswordInput.value

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)
  } catch (error) {
    console.log(error.message)
  }
}

loginBtn.addEventListener('click', loginEmailPassword)

export const logOut = async () => {
  signOut(auth)
}