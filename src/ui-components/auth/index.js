import './style.css'

import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../app'

const loginModal = document.querySelector('#login-modal')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')

const signupModal = document.querySelector('#signup-modal')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')

// open/close login modal
export function openLoginModal() {
  loginModal.showModal()
}

function closeLoginModal() {
  loginModal.close()
}
loginModal.addEventListener('click', e => {
  if (!e.target.closest('#login-form')) {
    closeLoginModal()
  }
})

// open/login signup modal
export function openSignupModal() {
  signupModal.showModal()
}

function closeSignupModal() {
  signupModal.close()
}
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
    .then(userCredential => console.log(userCredential.user))
    .catch(error => console.log(error.message))
}
loginBtn.addEventListener('click', loginEmailPassword)

// signup functionality
async function signupEmailPassword(e) {
  e.preventDefault()

  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then(userCredential => console.log(userCredential.user))
    .catch(error => console.log(error.message))
}
signupBtn.addEventListener('click', signupEmailPassword)

