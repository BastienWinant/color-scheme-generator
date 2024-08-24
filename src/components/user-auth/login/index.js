import './style.css'

import { signInWithEmailAndPassword, signOut } from "firebase/auth"

import { firebaseAuth } from "../../../app"

const loginModal = document.querySelector('#login-modal')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#form-login-btn')
const cancelLoginBtn = document.querySelector('#cancel-login-btn')

export function openLoginModal() {
  loginModal.showModal()
}

function closeLoginModal() {
  loginModal.close()
}
cancelLoginBtn.addEventListener('click', closeLoginModal)

// login functionality
function loginEmailPassword() {
  const email = loginEmailInput.value
  const password = loginPasswordInput.value

  signInWithEmailAndPassword(firebaseAuth, email, password)
    .then(closeLoginModal)
    .catch(error => {
      console.log(error.message)
    })
}
loginBtn.addEventListener('click', e => {
  e.preventDefault()
  loginEmailPassword()
})

export function logOut() {
  signOut(firebaseAuth)
}