import './style.css'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

import { auth } from "Src/app"

const signupModal = document.querySelector('#signup-modal')
const signupForm = document.querySelector('#signup-form')
const signupFieldset = document.querySelector('#signup-fieldset')
const signupUsername = document.querySelector('#signup-username')
const signupEmailInput = document.querySelector('#signup-email')
const signupPasswordInput = document.querySelector('#signup-password')
const signupBtn = document.querySelector('#signup-btn')

export const openSignupModal = () => {
  signupModal.showModal()
}

const closeSignupModal = () => {
  signupModal.close()
}

const signupEmailPassword = async (e) => {
  e.preventDefault()

  const username = signupUsername.value
  const email = signupEmailInput.value
  const password = signupPasswordInput.value

  if (!username) throw new Error('invalid username')

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)
  } catch (error) {
    console.log(error.message)
  }
}

signupBtn.addEventListener('click', signupEmailPassword)