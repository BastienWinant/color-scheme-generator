import './style.css'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

import { auth } from './app'
import { loginModal, loginEmailInput, loginPasswordInput, loginBtn, openLoginModal, closeLoginModal } from './components/auth-forms/login'
import { signupModal, signupEmailInput, signupPasswordInput, signupBtn, openSignupModal, closeSignupModal } from './components/auth-forms/signup'
import { header, expandNav, collapseNav, expandNavAuth, collapseNavAuth, showLoginState } from './components/header'

// handle click events on the header area
header.addEventListener('click', e => {
  if (e.target.closest('#nav-expand-btn')) {
    expandNav()
  } else if (e.target.closest('#nav-auth-expand-btn')) {
    expandNavAuth()
  } else if (e.target.id === 'nav-login-btn') {
    collapseNav()
    collapseNavAuth()
    openLoginModal()
  } else if (e.target.id === 'nav-signup-btn') {
    collapseNav()
    collapseNavAuth()
    openSignupModal()
  } else if (e.target.id === 'nav-logout-btn') {
    collapseNav()
    collapseNavAuth()
    logOut()
  } else if (!e.target.closest('.nav')) {
    collapseNav()
  } else if (!e.target.closest('.nav-auth-btns')) {
    collapseNavAuth()
  }
})

// collapse nav on window resize
window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})

loginModal.addEventListener('click', e => {
  if (!e.target.closest('#login-form')) {
    closeLoginModal()
  }
})

signupModal.addEventListener('click', e => {
  if (!e.target.closest('#signup-form')) {
    closeSignupModal()
  }
})

// login functionality
async function loginEmailPassword(e) {
  e.preventDefault()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    // .then(userCredential => console.log(userCredential.user))
    .catch(error => console.log(error.message))
}
loginBtn.addEventListener('click', loginEmailPassword)

// logout functionality
async function logOut() {
  signOut(auth)
}

// signup functionality
async function signupEmailPassword(e) {
  e.preventDefault()

  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then(userCredential => console.log(userCredential.user))
    .catch(error => console.log(error))
}
signupBtn.addEventListener('click', signupEmailPassword)

// auth status monitoring
async function monitorAuthStatus() {
  onAuthStateChanged(auth, user => {
    closeLoginModal()
    closeSignupModal()

    showLoginState(user)
  })
}
monitorAuthStatus()