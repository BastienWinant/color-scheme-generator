import './index.css'
import { auth } from "Src/app"
import { writeUserData } from 'Src/utils'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth"

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginFieldset = document.querySelector('#login-fieldset')
const closeLoginBtn = document.querySelector('#login-modal-close-btn')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')
const newPasswordBtn = document.querySelector('#new-password-btn')
const toSignupBtn = document.querySelector('#to-signup-btn')

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupFieldset = document.querySelector('#signup-fieldset')
const closeSignupBtn = document.querySelector('#signup-modal-close-btn')
const signupUsernameInput = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')
const toLoginBtn = document.querySelector('#to-login-btn')

const resetModal = document.querySelector('#reset-modal')
const resetForm = document.querySelector('#reset-form')
const resetFieldset = document.querySelector('#reset-fieldset')
const closeResetBtn = document.querySelector('#reset-modal-close-btn')
const resetEmailInput = document.querySelector('#reset-email')
const resetBtn = document.querySelector('#reset-btn')
const cancelResetBtn = document.querySelector('#cancel-reset-btn')

// LOGIN FUNCTIONALITY
export const openLoginModal = () => {
  loginModal.showModal()
}

const clearLoginError = () => {
  try {
    const errorMsg = loginForm.querySelector('.auth-error-msg')
    errorMsg.remove()
  } catch {}
}

const showLoginError = (error) => {
  clearLoginError()

  let errorMsg = error.code
  errorMsg = errorMsg.replace('/', ': ').replace('-', " ")
  
  loginFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-error-msg">${errorMsg}</p>`
  )
}

const closeLoginModal = () => {
  clearLoginError()
  loginForm.reset()
  loginModal.close()
}

const loginEmailPassword = async (e) => {
  e.preventDefault()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(closeLoginModal)
    .catch(showLoginError)
}
loginBtn.addEventListener('click', loginEmailPassword)

newPasswordBtn.addEventListener('click', () => {
  closeLoginModal()
  openResetModal()
})

toSignupBtn.addEventListener('click', () => {
  closeLoginModal()
  openSignupModal()
})

closeLoginBtn.addEventListener('click', closeLoginModal())

// SIGNUP FUNCTIONALITY
export const openSignupModal = () => {
  signupModal.showModal()
}

const clearSignupError = () => {
  try {
    const errorMsg = signupForm.querySelector('.auth-error-msg')
    errorMsg.remove()
  } catch {}
}

const showSignupError = (error) => {
  clearSignupError()

  let errorMsg = error.code || 'Missing username'
  errorMsg = errorMsg.replace('/', ': ').replace('-', " ")

  signupFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-error-msg">${errorMsg}</p>`
  )
}

const closeSignupModal = () => {
  clearSignupError()
  signupForm.reset()
  signupModal.close()
}

const signupEmailPassword = async () => {
  const signupUsername = signupUsernameInput.value
  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value
  
  try {

    if (!signupUsername) throw new Error('Parameter is not a number!')

    const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    userCredential.user.displayName = signupUsername
    return userCredential
  } catch (error) {
    showSignupError(error)
  }
}
signupBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  const userCredential = await signupEmailPassword()
  
  if (userCredential) {
    writeUserData(userCredential.user)
    closeSignupModal()
  }
})

toLoginBtn.addEventListener('click', () => {
  closeSignupModal()
  openLoginModal()
})

closeSignupBtn.addEventListener('click', closeLoginModal)

// LOGOUT FUNCTIONALITY
export const logOut = async() => {
  signOut(auth)
}

// PASSWORD RESET FUNCTIONALITY
export const openResetModal = () => {
  resetModal.showModal()
}

const clearResetError = () => {
  try {
    const errorMsg = resetForm.querySelector('.auth-error-msg')
    errorMsg.remove()
  } catch {}
}

const showResetError = (error) => {
  clearResetError()
  clearResetSuccess()
  
  resetFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="auth-error-msg">${error.code}</p>`
  )
}

const clearResetSuccess = () => {
  resetForm.reset()

  try {
    const successMsg = resetForm.querySelector('.auth-success-msg')
    successMsg.remove()
  } catch {}
}

const showResetSuccess = () => {
  clearResetError()
  clearResetSuccess()

  resetFieldset.insertAdjacentElement(
    'beforeend'
    `<p class="auth-success-message">Reset link sent!</p>`
  )
}

const closeResetModal = () => {
  clearResetError()
  clearResetSuccess()

  resetForm.reset()
  resetModal.close()
}

resetBtn.addEventListener('click', async e => {
  e.preventDefault()
  const resetEmail = resetEmailInput.value

  sendPasswordResetEmail(auth, resetEmail)
    .then(showResetSuccess)
    .catch(showResetError)
})

cancelResetBtn.addEventListener('click', () => {
  closeResetModal()
  openLoginModal()
})

closeResetBtn.addEventListener('click', closeResetModal)

window.addEventListener('click', e => {
  if (e.target.classList.contains('auth-modal')) {
    closeLoginModal()
    closeSignupModal()
    closeResetModal()
  }
})