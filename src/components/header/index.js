import 'Src/style.css'
import './style.css'

import {
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth/index')

import { auth, db } from 'Src/app'

const nav = document.querySelector('#nav')

const loginModal = document.querySelector('#login-modal')
const signupModal = document.querySelector('#signup-modal')

const openLoginModal = () => {
  loginModal.showModal()
}

const openSignupModal = () => {
  signupModal.showModal()
}

const logOut = async () => {
  await signOut(auth)
}

nav.addEventListener('click', e => {
  if (e.target.id === 'nav-login-btn') {
    openLoginModal()
  } else if (e.target.id === 'nav-signup-btn') {
    openSignupModal()
  } else if (e.target.id == 'nav-logout-btn') {
    logOut()
  }
})

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    let navHTML
    if (user) {
      navHTML = `
        <button type="button" id="nav-logout-btn" class="nav-btn">log out</button>`
    } else {
      navHTML = `
        <button type="button" id="nav-login-btn" class="nav-btn">log in</button>
        <button type="button" id="nav-signup-btn" class="nav-btn">sign up</button>`
    }

    nav.innerHTML = navHTML
  })
}
monitorAuthState()