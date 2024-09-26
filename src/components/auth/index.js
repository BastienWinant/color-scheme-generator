import './style.css'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
import { ref, set } from 'firebase/database'

import { auth, db } from 'Src/app'

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupFieldset = document.querySelector('#signup-fieldset')
const signupUsername = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')
const switchLoginBtn = document.querySelector('#switch-login-btn')

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginFieldset = document.querySelector('#login-fieldset')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')
const switchResetBtn = document.querySelector('#switch-reset-btn')
const switchSignupBtn = document.querySelector('#switch-signup-btn')

const resetModal = document.querySelector('#reset-modal')
const resetForm = document.querySelector('#reset-form')
const resetFieldset = document.querySelector('#reset-fieldset')
const resetEmailInput = document.querySelector('#reset-email')
const resetBtn = document.querySelector('#reset-btn')
const cancelResetBtn = document.querySelector('#cancel-reset-btn')

// SIGNUP FUNCTIONALITY
export const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  clearSignupError()
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
  // erase any existing error message
  clearSignupError()

  // format the error message
  let errorMessage = error.code || error.message
  errorMessage = errorMessage.replace('/', ': ').replace('-', ' ')

  // display the error message
  signupFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class='auth-error-msg'>${errorMessage}</p>`
  )
}

// saves the user's email and username in the db
function writeUserData(user) {
  set(ref(db, 'users/' + user.uid), {
    username: user.displayName,
    email: user.email,
  })
}

const signupEmailPassword = async (e) => {
  e.preventDefault()

  // retrieve input credentials
  const username = signupUsername.value
  const email = signupEmailInput.value
  const password = signupPasswordInput.value

  try {
    // throw an error if no username is provided
    if (!username) throw new Error('invalid username')
    
    // retrieve new user credentials
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    userCredential.user.displayName = username

    // save username and email in the db and close modal
    writeUserData(userCredential.user)
    closeSignupModal()
  } catch (error) {
    showSignupError(error)
  }
}

signupBtn.addEventListener('click', signupEmailPassword)

// LOGIN FUNCTIONALITY
export const openLoginModal = () => {
  loginModal.showModal()
}

const closeLoginModal = () => {
  clearLoginError()
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
  errorMessage = errorMessage.replace('/', ': ').replace('-', ' ')

  loginFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class='auth-error-msg'>${errorMessage}</p>`
  )
}

const loginEmailPassword = async (e) => {
  e.preventDefault()

  // retrieve input credentials
  const email = loginEmailInput.value
  const password = loginPasswordInput.value

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    closeLoginModal()
  } catch (error) {
    showLoginError(error)
  }
}

loginBtn.addEventListener('click', loginEmailPassword)

// PASSWORD RESET
const openResetModal = () => {
  resetModal.showModal()
}

switchResetBtn.addEventListener('click', () => {
  closeLoginModal()
  openResetModal()
})

const closeResetModal = () => {
  clearResetError()
  resetForm.reset()
  resetModal.close()
}
resetModal.addEventListener('click', e => {
  if (!e.target.closest('.auth-form')) {
    closeResetModal()
  }
})

const clearResetError = () => {
  try {
    resetFieldset.querySelector('.auth-error-msg').remove()
  } catch {}
}

const showResetError = (error) => {
  clearResetError()

  let errorMessage = error.code || error.message
  errorMessage = errorMessage.replace('/', ': ').replace('-', ' ')

  resetFieldset.insertAdjacentHTML(
    'beforeend',
    `<p class='auth-error-msg'>${errorMessage}</p>`
  )
}

resetBtn.addEventListener('click', async e => {
  e.preventDefault()

  const email = resetEmailInput.value  
  
  sendPasswordResetEmail(auth, email)
  .then(() => {
    clearResetError()
    // TODO: show confirmation msg
  })
  .catch(error => {
    showResetError(error)
  })
})

cancelResetBtn.addEventListener('click', () => {
  closeResetModal()
  openLoginModal()
})

// LOGOUT
export const logOut = async () => {
  signOut(auth)
}

switchLoginBtn.addEventListener('click', () => {
  closeSignupModal()
  openLoginModal()
})

switchSignupBtn.addEventListener('click', () => {
  closeLoginModal()
  openSignupModal()
})