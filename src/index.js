import './style.css'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import { auth } from './app';

import { loginEmailInput, loginPasswordInput, loginBtn, openLoginModal, closeLoginModal } from './components/auth-forms/login'
import { signupEmailInput, signupPasswordInput, signupBtn, openSignupModal, closeSignupModal } from './components/auth-forms/signup'

import {
  header,
  expandNav, collapseNav,
  expandNavAuth, collapseNavAuth,
  navLoginBtn, navSignupBtn, navLogoutBtn,
  showLoginState
 } from './components/header';

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

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})

// LOGIN FUNCTIONALITY
async function loginEmailPassword(e) {
  e.preventDefault()

  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    // .then(userCredential => console.log(userCredential.user))
    .catch(error => console.log(error.message))
}
loginBtn.addEventListener('click', loginEmailPassword)

// LOGOUT FUNCTIONALITY
async function logOut() {
  signOut(auth)
}

// SIGNUP FUNCTIONALITY
async function signupEmailPassword(e) {
  e.preventDefault()

  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then(userCredential => console.log(userCredential.user))
    .catch(error => console.log(error))
}
signupBtn.addEventListener('click', signupEmailPassword)

// AUTH STATUS MONITORING
async function monitorAuthStatus() {
  onAuthStateChanged(auth, user => {
    closeLoginModal()
    closeSignupModal()

    showLoginState(user)
  })
}
monitorAuthStatus()