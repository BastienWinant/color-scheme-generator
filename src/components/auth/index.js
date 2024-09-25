import './style.css'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { ref, set } from 'firebase/database'

import { auth, db } from "Src/app"

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
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')

export const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  signupForm.reset()
  signupModal.close()
}
signupModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) {
    closeSignupModal()
  }
})

const clearSignupError = () => {
  try {
    signupFieldset.querySelector('.auth-error-msg').remove()
  } catch {}
}

const showSignupError = (error) => {
  clearSignupError()

  let errorMessage = error.code || error.message
  errorMessage = errorMessage.replace("/", ": ").replace("-", " ")

  signupFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-error-msg">${errorMessage}</p>`
  )
}

function writeUserData(user) {
  set(ref(db, 'users/' + user.uid), {
    username: user.displayName,
    email: user.email,
  });
}

const signupEmailPassword = async (e) => {
  e.preventDefault()

  const username = signupUsername.value
  const email = signupEmailInput.value
  const password = signupPasswordInput.value

  if (!username) throw new Error('invalid username')

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    userCredential.user.displayName = username
    console.log(userCredential.user)
    writeUserData(userCredential.user)
  } catch (error) {
    showSignupError(error)
  }
}

signupBtn.addEventListener('click', signupEmailPassword)

export const openLoginModal = () => {
  loginModal.showModal()
}

const closeLoginModal = () => {
  loginForm.reset()
  loginModal.close()
}
loginModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) {
    closeLoginModal()
  }
})

const clearLoginError = () => {
  try {
    loginFieldset.querySelector('.auth-error-msg').remove()
  } catch {}
}

const showLoginError = (error) => {
  clearLoginError()

  let errorMessage = error.code || error.message
  errorMessage = errorMessage.replace("/", ": ").replace("-", " ")

  loginFieldset.insertAdjacentHTML(
    'beforeend',
    `<p clas="auth-error-msg">${errorMessage}</p>`
  )
}

const loginEmailPassword = async (e) => {
  e.preventDefault()

  const email = loginEmailInput.value
  const password = loginPasswordInput.value

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredential)
  } catch (error) {
    showLoginError(error)
  }
}

loginBtn.addEventListener('click', loginEmailPassword)

export const logOut = async () => {
  signOut(auth)
}