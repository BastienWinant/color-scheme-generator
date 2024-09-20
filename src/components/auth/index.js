import './style.css'

import(/* webpackPreload: true */ 'Src/app.js')

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

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

console.log('this is the auth')