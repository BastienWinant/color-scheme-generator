import '../style.css'

import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref, set } from "firebase/database"

import { firebaseAuth, firebaseDB } from "../../../app"

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
function writeUserData(userId, email) {
  set(ref(firebaseDB, 'users/' + userId), {
    email: email
  });
}

function signupEmailPassword() {
  const email = signupEmailInput.value
  const password = signupPasswordInput.value

  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then(userCredential => {
      const userId = userCredential.user.uid
      const userEmail = userCredential.user.email
      writeUserData(userId, userEmail)
      closeSignupModal()
    })
    .catch(error => {
      console.log(error.message)
    })
}
signupBtn.addEventListener('click', e => {
  e.preventDefault()
  signupEmailPassword()
})