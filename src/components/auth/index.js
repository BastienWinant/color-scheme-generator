import './index.css'
import { auth } from "Src/app"
import { writeUserData } from 'Src/db_utils'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth"

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const closeLoginModalBtn = document.querySelector('#close-login-modal-btn')
const loginFieldset = document.querySelector('#login-fieldset')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')
const toSignupBtn = document.querySelector('#to-signup-btn')
const newPasswordBtn = document.querySelector('#new-password-btn')

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const closeSignupModalBtn = document.querySelector('#close-signup-modal-btn')
const signupFieldset = document.querySelector('#signup-fieldset')
const signupUsernameInput = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')
const toLoginBtn = document.querySelector('#to-login-btn')

const resetModal = document.querySelector('#reset-modal')
const resetForm = document.querySelector('#reset-form')
const closeResetModalBtn = document.querySelector('#close-reset-modal-btn')
const resetFieldset = document.querySelector('#reset-fieldset')
const resetEmailInput = document.querySelector('#reset-email')
const resetBtn = document.querySelector('#reset-btn')
const cancelResetBtn = document.querySelector('#cancel-reset-btn')

// LOGIN FUNCTIONALITY
export const openLoginModal = () => {
  loginModal.showModal()
}

const clearLoginError = () => {
  try {
    loginFieldset.querySelector('.form-error-msg').remove()
  } catch {}
}

const showLoginError = (error) => {
  clearLoginError()

  let errorMsg = error.code
  errorMsg = errorMsg.replace('/', ': ').replace('-', " ")
  
  loginFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="form-error-msg">${errorMsg}</p>`
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

closeLoginModalBtn.addEventListener('click', closeLoginModal)

// SIGNUP FUNCTIONALITY
export const openSignupModal = () => {
  signupModal.showModal()
}

const clearSignupError = () => {
  try {
    signupFieldset.querySelector('.form-error-msg').remove()
  } catch {}
}

const showSignupError = (error) => {
  clearSignupError()

  let errorMsg = error.code || 'Missing username'
  errorMsg = errorMsg.replace('/', ': ').replace('-', " ")

  signupFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="form-error-msg">${errorMsg}</p>`
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

closeSignupModalBtn.addEventListener('click', closeSignupModal)

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
    const errorMsg = resetForm.querySelector('.form-error-msg')
    errorMsg.remove()
  } catch {}
}

const showResetError = (error) => {
  clearResetError()
  clearResetSuccess()

  let errorMsg = error.code || error.message
  errorMsg = errorMsg.replace('/', ': ').replace('-', " ")
  
  resetFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="form-error-msg">${errorMsg}</p>`
  )
}

const clearResetSuccess = () => {
  resetForm.reset()

  try {
    const successMsg = resetForm.querySelector('.form-success-msg')
    successMsg.remove()
  } catch {}
}

const showResetSuccess = () => {
  clearResetError()
  clearResetSuccess()

  resetFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class="form-success-msg">Reset link sent!</p>`
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

closeResetModalBtn.addEventListener('click', closeResetModal)

window.addEventListener('click', e => {
  if (e.target.classList.contains('auth-modal')) {
    closeLoginModal()
    closeSignupModal()
    closeResetModal()
  }
})