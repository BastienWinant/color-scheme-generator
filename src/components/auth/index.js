import 'Src/style.css'
import './style.css'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { ref, set } from 'firebase/database'

import { auth, db } from 'Src/app'

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

const clearLoginForm = () => {
  loginForm.reset()
}

const clearSignupForm = () => {
  signupForm.reset()
}

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
  if (!(e.target.closest('.auth-form'))) {
    closeLoginModal()
  }
})

signupModal.addEventListener('click', e => {
  if (!(e.target.closest('.auth-form'))) {
    closeSignupModal()
  }
})

const clearLoginError = () => {
  try {
    loginFieldset.querySelector('.error-message').remove()
  } catch (error) {}
}

const showLoginError = (error) => {
  clearLoginError()

  let errorMessage = error.code || error.message
  errorMessage = errorMessage.replace("/", ": ").replace("-", " ")

  loginFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="error-message">${errorMessage}</p>`
  )
}

const loginEmailPassword = async (e) => {
  e.preventDefault()
  
  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    closeLoginModal()
  } catch (error) {
    showLoginError(error)
  }
}
loginBtn.addEventListener('click', loginEmailPassword)

const clearSignupError = () => {
  try {
    signupFieldset.querySelector('.error-message').remove()
  } catch (error) {}
}

const showSignupError = (error) => {
  clearSignupError()

  let errorMessage = error.code || error.message
  errorMessage = errorMessage.replace("/", ": ").replace("-", " ")

  signupFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="error-message">${errorMessage}</p>`
  )
}

const writeUserData = (user) => {
  set(ref(db, 'users/' + user.uid), {
    username: user.displayName,
    email: user.email,
  });
}

const signupEmailPassword = async (e) => {
  e.preventDefault()

  const signupUsername = signupUsernameInput.value
  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  try {
    if (!signupUsername) {
      throw new Error("auth/invalid-username")
    }

    const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    userCredential.user.displayName = signupUsername
    writeUserData(userCredential.user)
    closeSignupModal()
  } catch (error) {
    showSignupError(error)
  }
}
signupBtn.addEventListener('click', signupEmailPassword)

switchLoginBtn.addEventListener('click', () => {
  closeSignupModal()
  openLoginModal()
})

switchSignupBtn.addEventListener('click', () => {
  closeLoginModal()
  openSignupModal()
})