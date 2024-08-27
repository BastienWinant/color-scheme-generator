import '../style.css'

import { createUserWithEmailAndPassword } from "firebase/auth"

import { firebaseAuth } from "../../../app"

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#form-signup-btn')
const cancelSignupBtn = document.querySelector('#cancel-signup-btn')

export function openSignupModal() {
  signupModal.showModal()
}

function closeSignupModal() {
  signupForm.reset()
  signupModal.close()
}
cancelSignupBtn.addEventListener('click', closeSignupModal)

// signup functionality
function signupEmailPassword() {
  const email = signupEmailInput.value
  const password = signupPasswordInput.value

  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then(closeSignupModal)
    .catch(error => {
      console.log(error.message)
    })
}
signupBtn.addEventListener('click', e => {
  e.preventDefault()
  signupEmailPassword()
})