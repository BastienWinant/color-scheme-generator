import './style.css'

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginFieldset = document.querySelector('#login-fieldset')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupFieldset = document.querySelector('#signup-modal')
const signupUsernameInput = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')

const resetModal = document.querySelector('#password-reset-modal')
const resetEmailInput = document.querySelector('#password-reset-email')
const resetBtn = document.querySelector('#password-reset-btn')

// LOGIN FUNCTIONALITY
export const openLoginModal = () => {
  loginModal.showModal()
}

const closeLoginModal = () => {
  loginForm.reset()
  loginModal.close()
}
loginModal.addEventListener('click', e => {
  if (!e.target.closest('#login-form')) {
    closeLoginModal()
  }
})

// SIGNUP FUNCTIONALITY
export const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  signupForm.reset()
  signupModal.close()
}
signupModal.addEventListener('click', e => {
  if (!e.target.closest('#signup-form')) {
    closeSignupModal()
  }
})

// PASSWORD RESET FUNCTIONALITY
const openResetPassword = () => {
  resetModal.showModal()
}

const closeResetModal = () => {
  resetModal.close()
}