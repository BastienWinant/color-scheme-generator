import './style.css'

const loginModal = document.querySelector('#login-modal')
const loginForm = document.querySelector('#login-form')
const loginBtn = document.querySelector('#login-btn')

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupBtn = document.querySelector('#signup-btn')

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